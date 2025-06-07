"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const user_1 = require("./services/user");
const auth_1 = require("./auth");
const post_1 = require("./services/post");
mongoose_1.default.set("debug", true);
mongoose_1.default
    .connect(process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/haul')
    .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
});
const app = (0, express_1.default)();
const port = 8000;
const allowedOrigins = process.env.NODE_ENV === "production"
    ? [process.env.CORS_ORIGIN].filter((v) => Boolean(v))
    : [/^http:\/\/localhost:\d+$/];
console.log("allowedOrigins: ", allowedOrigins);
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/auth/register", async (req, res) => {
    console.log("Register attempt with body:", req.body);
    const username = req.body?.username;
    const password = req.body?.password;
    const errors = [];
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
    const existingUser = await (0, user_1.findUserByName)(username);
    if (existingUser) {
        console.log("User already exists:", username);
        res.status(400).send("User already exists");
        return;
    }
    try {
        const user = await (0, user_1.createUser)(username, password);
        const token = (0, auth_1.generateJWT)(user);
        res.status(201).json({ token, user });
    }
    catch (err) {
        console.error("Error creating user:", err);
        res.status(500).send("Failed to create user");
    }
});
app.post("/auth/login", async (req, res) => {
    console.log("Login attempt with body:", req.body);
    const username = req.body?.username;
    const password = req.body?.password;
    const errors = [];
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
    const user = await (0, user_1.findUserByName)(username);
    if (!user) {
        console.log("User not found:", username);
        res.status(400).send("User not found");
        return;
    }
    const isValid = await (0, auth_1.isPasswordValid)(user, password);
    if (!isValid) {
        console.log("[Server] Invalid password for user:", username);
        res.status(400).send("[Server]Invalid credentials");
        return;
    }
    const token = (0, auth_1.generateJWT)({ ...user, _id: new mongoose_1.default.Types.ObjectId(user._id) });
    res.status(200).json({ token, user });
});
const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        res.status(401).send("Unauthorized");
        return;
    }
    const userData = (0, auth_1.verifyJWT)(token);
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
app.post("/upload", upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const filename = req.file.originalname || "upload";
        const blobname = `${Date.now()}-${filename}`;
        const mimeType = req.file.mimetype || 'image/jpeg';
        const base64Data = req.file.buffer.toString('base64');
        const mockUrl = `data:${mimeType};base64,${base64Data}`;
        console.log(`File uploaded: ${filename}, size: ${req.file.size} bytes`);
        res.status(201).json({ url: mockUrl });
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Failed to process upload" });
    }
});
app.get("/posts", async (req, res) => {
    try {
        const posts = await (0, post_1.findAllPosts)();
        res.json(posts);
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});
app.post("/posts", authMiddleware, async (req, res) => {
    try {
        const { mainImageUrl, description } = req.body;
        if (!mainImageUrl || !description) {
            res.status(400).json({ error: "mainImageUrl and description are required" });
            return;
        }
        const authorId = new mongoose_1.default.Types.ObjectId(req._id);
        const postData = {
            mainImageUrl,
            description,
            author: authorId
        };
        const post = await (0, post_1.createPost)(postData);
        res.status(201).json(post);
    }
    catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Failed to create post" });
    }
});
app.delete("/posts/:id", authMiddleware, async (req, res) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            res.status(400).json({ error: "Post ID is required" });
            return;
        }
        const authorId = new mongoose_1.default.Types.ObjectId(req._id);
        const deleted = await (0, post_1.deletePost)(postId, authorId);
        if (!deleted) {
            res.status(404).json({ error: "Post not found" });
            return;
        }
        res.status(200).json({ message: "Post deleted successfully" });
    }
    catch (error) {
        if (error instanceof Error && error.message.includes("Unauthorized")) {
            res.status(403).json({ error: error.message });
        }
        else {
            console.error("Error deleting post:", error);
            res.status(500).json({ error: "Failed to delete post" });
        }
    }
});
app.post("/posts/:id/comments", authMiddleware, async (req, res) => {
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
        const authorId = new mongoose_1.default.Types.ObjectId(req._id);
        const comment = {
            author: authorId,
            content: content.trim()
        };
        const updatedPost = await (0, post_1.addCommentToPost)(postId, comment);
        if (!updatedPost) {
            res.status(404).json({ error: "Post not found" });
            return;
        }
        res.status(201).json(updatedPost);
    }
    catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Failed to add comment" });
    }
});
app.get("/images/:blob", (req, res) => {
    try {
        res.status(200).send("Image download endpoint - Azure not configured");
    }
    catch (error) {
        console.error("Download error:", error);
        res.status(500).json({ error: "Failed to download image" });
    }
});
app.listen(process.env.PORT || port, () => {
    console.log("REST API is listening.");
});
