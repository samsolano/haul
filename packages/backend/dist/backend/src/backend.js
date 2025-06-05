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
const user_1 = require("./services/user");
const auth_1 = require("./auth");
mongoose_1.default.set("debug", true);
mongoose_1.default
    .connect(process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/haul')
    .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
});
const app = (0, express_1.default)();
const port = 8000;
// todo: restrict to whatever frontend domain we use
const allowedOrigins = process.env.NODE_ENV === "production"
    ? [process.env.CORS_ORIGIN].filter((v) => Boolean(v))
    : [/^http:\/\/localhost:\d+$/]; // allows any localhost:* port
console.log("allowedOrigins: ", allowedOrigins);
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express_1.default.json());
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
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });
app.listen(process.env.PORT || port, () => {
    console.log("REST API is listening.");
});
