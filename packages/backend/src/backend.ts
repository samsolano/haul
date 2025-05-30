import express, {
  NextFunction,
  Request,
  Response
} from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createUser, findUserByName } from "./services/user";
import {
  generateJWT,
  isPasswordValid,
  verifyJWT
} from "./auth";

mongoose.set("debug", true);
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/haul')
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

const app = express();
const port = 8000;

// todo: restrict to whatever frontend domain we use
app.use(cors());
app.use(express.json());

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
    console.log("User created successfully:", username);
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

  console.log("Login successful for user:", username);
  const token = generateJWT(user);
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

// Removed /upload endpoint
// app.post("/upload", (req: Request, res: Response) => {
//     if (!containerClient) {
//         res.status(503).json({ error: "Azure Storage not configured" });
//         return;
//     }
//     try {
//         const filename = (req.query.filename as string) || "upload";
//         const blobname = `${Date.now()}-${filename}`;
//         const blockBlobClient = containerClient.getBlockBlobClient(blobname);
//         const stream = Readable.from(req.body);
//         blockBlobClient.uploadStream(stream)
//             .then(() => {
//                 res.status(201).json({ url: `/images/${blobname}` });
//             })
//             .catch((error) => {
//                 res.status(500).json({ 
//                     message: "Failed to upload to blob storage",
//                     error 
//                 });
//             });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to process upload" });
//     }
// });

// Removed /images/:blob endpoint
// app.get("/images/:blob", (req: Request, res: Response) => {
//     if (!containerClient) {
//         res.status(503).json({ error: "Azure Storage not configured" });
//         return;
//     }
//     const { blob } = req.params;
//     const blockBlobClient = containerClient.getBlockBlobClient(blob);
//     blockBlobClient.exists()
//         .then((exists: boolean) => {
//             if (!exists) {
//                 res.status(404).send();
//                 return;
//             }
//             return blockBlobClient.downloadToBuffer();
//         })
//         .then((buffer) => {
//             if (buffer) res.send(buffer);
//         })
//         .catch((error) => {
//             res.status(500).json({ 
//                 message: "Failed to download from blob storage",
//                 error 
//             });
//         });
// });

// Removed /photos/upload and /photos/download/:blob endpoints
// app.post("/photos/upload", uploadBlob);
// app.get("/photos/download/:blob", downloadBlob);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
