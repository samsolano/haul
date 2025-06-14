import dotenv from "dotenv";
dotenv.config();

import express, {
  NextFunction,
  Request,
  Response
} from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import { createUser, findUserByName } from "./services/user";
import {
  generateJWT,
  isPasswordValid,
  verifyJWT
} from "./auth";
// import { uploadBlob, downloadBlob } from "./azure";
import { createPost, findAllPosts, deletePost, addCommentToPost } from "./services/post";
// import { Readable } from "stream";

mongoose.set("debug", true);
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/haul')
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

const app = express();
const port = 8000;

// todo: restrict to whatever frontend domain we use
const allowedOrigins = process.env.NODE_ENV === "production"
  ? [process.env.CORS_ORIGIN].filter((v): v is string => Boolean(v))
  : [/^http:\/\/localhost:\d+$/]; // allows any localhost:* port

console.log ("allowedOrigins: ", allowedOrigins);
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Increase body size limits for handling large images in JSON payloads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth/register", async (req, res) => {
  console.log("Register attempt with body:", req.body);
  const username = req.body?.username;
  const password = req.body?.password;

  const errors: string[] = [];
  if (typeof password !== "string") {
    errors.push("Password must be a string");
  }
  if (typeof username !== "string") {
    errors.push("Username must be a string");
  }

  if (errors.length > 0) {
    console.log("Registration validation errors:", errors);
    res.status(400).send(errors.join(", "));
    return;
  }

  const existingUser = await findUserByName(username);
  if (existingUser) {
    console.log("User already exists:", username);
    res.status(400).send("User already exists");
    return;
  }

  try {
    const user = await createUser(username, password);
    const token = generateJWT(user);
    res.status(201).json({ token, user });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("Failed to create user");
  }
});

app.post("/auth/login", async (req, res) => {
  console.log("Login attempt with body:", req.body);
  const username = req.body?.username;
  const password = req.body?.password;

  const errors: string[] = [];
  if (typeof username !== "string") {
    errors.push("Username must be a string");
  }
  if (typeof password !== "string") {
    errors.push("Password must be a string");
  }

  if (errors.length > 0) {
    console.log("Login validation errors:", errors);
    res.status(400).send(errors.join(", "));
    return;
  }

  const user = await findUserByName(username);
  if (!user) {
    console.log("User not found:", username);
    res.status(400).send("User not found");
    return;

  }

  const isValid = await isPasswordValid(user, password);
  if (!isValid) {
    console.log("[Server] Invalid password for user:", username);
    res.status(400).send("[Server]Invalid credentials");
    return;
  }

  const token = generateJWT({ ...user, _id: new mongoose.Types.ObjectId(user._id) });
  res.status(200).json({ token, user });
});

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }

  const userData = verifyJWT(token);
  if (!userData) {
    res.status(401).send("Unauthorized");
    return;
  }

  req._id = userData._id;

  next();
};

app.get("/testNeedsAuth", authMiddleware, async (req, res) => {
  res.send(`You are authenticated as ${req._id}`);
});

// Upload endpoint
app.post("/upload", upload.single('image'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filename = req.file.originalname || "upload";
    const blobname = `${Date.now()}-${filename}`;
    
    // For now, return a mock URL until Azure is properly configured
    // Convert buffer to base64 data URL
    const mimeType = req.file.mimetype || 'image/jpeg';
    const base64Data = req.file.buffer.toString('base64');
    const mockUrl = `data:${mimeType};base64,${base64Data}`;
    
    console.log(`File uploaded: ${filename}, size: ${req.file.size} bytes`);
    res.status(201).json({ url: mockUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to process upload" });
  }
});

// Get all posts endpoint
app.get("/posts", async (req: Request, res: Response) => {
  try {
    const posts = await findAllPosts();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Create new post endpoint
app.post("/posts", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { mainImageUrl, description } = req.body;
    
    if (!mainImageUrl || !description) {
      res.status(400).json({ error: "mainImageUrl and description are required" });
      return;
    }

    const authorId = new mongoose.Types.ObjectId(req._id);
    const postData = {
      mainImageUrl,
      description,
      author: authorId
    };

    const post = await createPost(postData);
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Delete post endpoint
app.delete("/posts/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    
    if (!postId) {
      res.status(400).json({ error: "Post ID is required" });
      return;
    }

    const authorId = new mongoose.Types.ObjectId(req._id);
    const deleted = await deletePost(postId, authorId);
    
    if (!deleted) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    if (error instanceof Error && error.message.includes("Unauthorized")) {
      res.status(403).json({ error: error.message });
    } else {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Failed to delete post" });
    }
  }
});

// Add comment to post endpoint
app.post("/posts/:id/comments", authMiddleware, async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;
    
    if (!postId) {
      res.status(400).json({ error: "Post ID is required" });
      return;
    }
    
    if (!content || typeof content !== 'string') {
      res.status(400).json({ error: "Comment content is required" });
      return;
    }

    const authorId = new mongoose.Types.ObjectId(req._id);
    const comment = {
      author: authorId,
      content: content.trim()
    };

    const updatedPost = await addCommentToPost(postId, comment);
    
    if (!updatedPost) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.status(201).json(updatedPost);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
});

// Download image endpoint (placeholder)
app.get("/images/:blob", (req: Request, res: Response) => {
  try {
    // For now, return a placeholder response
    // In a real scenario, you would download from Azure blob storage
    res.status(200).send("Image download endpoint - Azure not configured");
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Failed to download image" });
  }
});

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});