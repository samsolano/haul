"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var cors_1 = require("cors");
var multer_1 = require("multer");
var user_1 = require("./services/user");
var auth_1 = require("./auth");
// import { uploadBlob, downloadBlob } from "./azure";
var post_1 = require("./services/post");
// import { Readable } from "stream";
mongoose_1.default.set("debug", true);
mongoose_1.default
    .connect(process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/haul')
    .catch(function (err) {
    console.error("Failed to connect to MongoDB:", err);
});
var app = (0, express_1.default)();
var port = 8000;
// todo: restrict to whatever frontend domain we use
var allowedOrigins = process.env.NODE_ENV === "production"
    ? [process.env.CORS_ORIGIN].filter(function (v) { return Boolean(v); })
    : [/^http:\/\/localhost:\d+$/]; // allows any localhost:* port
console.log("allowedOrigins: ", allowedOrigins);
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
// Increase body size limits for handling large images in JSON payloads
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
// Configure multer for file uploads
var upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
});
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.post("/auth/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, errors, existingUser, user, token, err_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log("Register attempt with body:", req.body);
                username = (_a = req.body) === null || _a === void 0 ? void 0 : _a.username;
                password = (_b = req.body) === null || _b === void 0 ? void 0 : _b.password;
                errors = [];
                if (typeof password !== "string") {
                    errors.push("Password must be a string");
                }
                if (typeof username !== "string") {
                    errors.push("Username must be a string");
                }
                if (errors.length > 0) {
                    console.log("Registration validation errors:", errors);
                    res.status(400).send(errors.join(", "));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, user_1.findUserByName)(username)];
            case 1:
                existingUser = _c.sent();
                if (existingUser) {
                    console.log("User already exists:", username);
                    res.status(400).send("User already exists");
                    return [2 /*return*/];
                }
                _c.label = 2;
            case 2:
                _c.trys.push([2, 4, , 5]);
                return [4 /*yield*/, (0, user_1.createUser)(username, password)];
            case 3:
                user = _c.sent();
                token = (0, auth_1.generateJWT)(user);
                res.status(201).json({ token: token, user: user });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _c.sent();
                console.error("Error creating user:", err_1);
                res.status(500).send("Failed to create user");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.post("/auth/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, errors, user, isValid, token;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log("Login attempt with body:", req.body);
                username = (_a = req.body) === null || _a === void 0 ? void 0 : _a.username;
                password = (_b = req.body) === null || _b === void 0 ? void 0 : _b.password;
                errors = [];
                if (typeof username !== "string") {
                    errors.push("Username must be a string");
                }
                if (typeof password !== "string") {
                    errors.push("Password must be a string");
                }
                if (errors.length > 0) {
                    console.log("Login validation errors:", errors);
                    res.status(400).send(errors.join(", "));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, user_1.findUserByName)(username)];
            case 1:
                user = _c.sent();
                if (!user) {
                    console.log("User not found:", username);
                    res.status(400).send("User not found");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, auth_1.isPasswordValid)(user, password)];
            case 2:
                isValid = _c.sent();
                if (!isValid) {
                    console.log("[Server] Invalid password for user:", username);
                    res.status(400).send("[Server]Invalid credentials");
                    return [2 /*return*/];
                }
                token = (0, auth_1.generateJWT)(__assign(__assign({}, user), { _id: new mongoose_1.default.Types.ObjectId(user._id) }));
                res.status(200).json({ token: token, user: user });
                return [2 /*return*/];
        }
    });
}); });
var authMiddleware = function (req, res, next) {
    var _a;
    var token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).send("Unauthorized");
        return;
    }
    var userData = (0, auth_1.verifyJWT)(token);
    if (!userData) {
        res.status(401).send("Unauthorized");
        return;
    }
    req._id = userData._id;
    next();
};
app.get("/testNeedsAuth", authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send("You are authenticated as ".concat(req._id));
        return [2 /*return*/];
    });
}); });
// Upload endpoint
app.post("/upload", upload.single('image'), function (req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        var filename = req.file.originalname || "upload";
        var blobname = "".concat(Date.now(), "-").concat(filename);
        // For now, return a mock URL until Azure is properly configured
        // Convert buffer to base64 data URL
        var mimeType = req.file.mimetype || 'image/jpeg';
        var base64Data = req.file.buffer.toString('base64');
        var mockUrl = "data:".concat(mimeType, ";base64,").concat(base64Data);
        console.log("File uploaded: ".concat(filename, ", size: ").concat(req.file.size, " bytes"));
        res.status(201).json({ url: mockUrl });
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Failed to process upload" });
    }
});
// Get all posts endpoint
app.get("/posts", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, post_1.findAllPosts)()];
            case 1:
                posts = _a.sent();
                res.json(posts);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("Error fetching posts:", error_1);
                res.status(500).json({ error: "Failed to fetch posts" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Create new post endpoint
app.post("/posts", authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, mainImageUrl, description, authorId, postData, post, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, mainImageUrl = _a.mainImageUrl, description = _a.description;
                if (!mainImageUrl || !description) {
                    res.status(400).json({ error: "mainImageUrl and description are required" });
                    return [2 /*return*/];
                }
                authorId = new mongoose_1.default.Types.ObjectId(req._id);
                postData = {
                    mainImageUrl: mainImageUrl,
                    description: description,
                    author: authorId
                };
                return [4 /*yield*/, (0, post_1.createPost)(postData)];
            case 1:
                post = _b.sent();
                res.status(201).json(post);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.error("Error creating post:", error_2);
                res.status(500).json({ error: "Failed to create post" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Delete post endpoint
app.delete("/posts/:id", authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, authorId, deleted, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                postId = req.params.id;
                if (!postId) {
                    res.status(400).json({ error: "Post ID is required" });
                    return [2 /*return*/];
                }
                authorId = new mongoose_1.default.Types.ObjectId(req._id);
                return [4 /*yield*/, (0, post_1.deletePost)(postId, authorId)];
            case 1:
                deleted = _a.sent();
                if (!deleted) {
                    res.status(404).json({ error: "Post not found" });
                    return [2 /*return*/];
                }
                res.status(200).json({ message: "Post deleted successfully" });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                if (error_3 instanceof Error && error_3.message.includes("Unauthorized")) {
                    res.status(403).json({ error: error_3.message });
                }
                else {
                    console.error("Error deleting post:", error_3);
                    res.status(500).json({ error: "Failed to delete post" });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Add comment to post endpoint
app.post("/posts/:id/comments", authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, content, authorId, comment, updatedPost, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                postId = req.params.id;
                content = req.body.content;
                if (!postId) {
                    res.status(400).json({ error: "Post ID is required" });
                    return [2 /*return*/];
                }
                if (!content || typeof content !== 'string') {
                    res.status(400).json({ error: "Comment content is required" });
                    return [2 /*return*/];
                }
                authorId = new mongoose_1.default.Types.ObjectId(req._id);
                comment = {
                    author: authorId,
                    content: content.trim()
                };
                return [4 /*yield*/, (0, post_1.addCommentToPost)(postId, comment)];
            case 1:
                updatedPost = _a.sent();
                if (!updatedPost) {
                    res.status(404).json({ error: "Post not found" });
                    return [2 /*return*/];
                }
                res.status(201).json(updatedPost);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error("Error adding comment:", error_4);
                res.status(500).json({ error: "Failed to add comment" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Download image endpoint (placeholder)
app.get("/images/:blob", function (req, res) {
    try {
        // For now, return a placeholder response
        // In a real scenario, you would download from Azure blob storage
        res.status(200).send("Image download endpoint - Azure not configured");
    }
    catch (error) {
        console.error("Download error:", error);
        res.status(500).json({ error: "Failed to download image" });
    }
});
app.listen(process.env.PORT || port, function () {
    console.log("REST API is listening.");
});
