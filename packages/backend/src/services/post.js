"use strict";
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
exports.findAllPosts = findAllPosts;
exports.findPostById = findPostById;
exports.findPostsByAuthor = findPostsByAuthor;
exports.createPost = createPost;
exports.deletePost = deletePost;
exports.addCommentToPost = addCommentToPost;
var post_1 = require("../models/post");
function findAllPosts() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // @ts-expect-error: .populate doesn't properly manipulate the type.
            return [2 /*return*/, post_1.Post.find().populate("author").populate("comments.author")];
        });
    });
}
function findPostById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            // @ts-expect-error: .populate doesn't properly manipulate the type.
            return [2 /*return*/, (_b = (_a = post_1.Post.findById(id)) === null || _a === void 0 ? void 0 : _a.populate("author")) === null || _b === void 0 ? void 0 : _b.populate("comments.author")];
        });
    });
}
function findPostsByAuthor(author) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // @ts-expect-error: .populate doesn't properly manipulate the type.
            return [2 /*return*/, post_1.Post.find({ author: author }).populate("author").populate("comments.author")];
        });
    });
}
function createPost(info) {
    return __awaiter(this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new post_1.Post(info);
                    return [4 /*yield*/, post.save()];
                case 1: 
                // @ts-expect-error: .save() doesn't add _id to the type.
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function deletePost(id, authorId) {
    return __awaiter(this, void 0, void 0, function () {
        var post, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, post_1.Post.findById(id)];
                case 1:
                    post = _a.sent();
                    if (!post) {
                        return [2 /*return*/, false]; // Post doesn't exist
                    }
                    // Check if the user is the author of the post
                    if (post.author.toString() !== authorId.toString()) {
                        throw new Error("Unauthorized: You can only delete your own posts");
                    }
                    return [4 /*yield*/, post_1.Post.findByIdAndDelete(id)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result !== null];
            }
        });
    });
}
function addCommentToPost(postId, comment) {
    return __awaiter(this, void 0, void 0, function () {
        var post, updatedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, post_1.Post.findById(postId)];
                case 1:
                    post = _a.sent();
                    if (!post) {
                        return [2 /*return*/, null]; // Post doesn't exist
                    }
                    // Add the comment to the post
                    post.comments.push({
                        author: comment.author,
                        content: comment.content,
                        createdAt: new Date()
                    });
                    return [4 /*yield*/, post.save()];
                case 2:
                    updatedPost = _a.sent();
                    // Return the post with populated fields
                    // @ts-expect-error: .populate doesn't properly manipulate the type.
                    return [2 /*return*/, post_1.Post.findById(updatedPost._id).populate("author").populate("comments.author")];
            }
        });
    });
}
