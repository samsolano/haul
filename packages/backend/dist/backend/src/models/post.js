"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//MONGOOSE SCHEMA
const commentSchema = new mongoose_1.default.Schema({
    author: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
const postSchema = new mongoose_1.default.Schema({
    author: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    mainImageUrl: { type: String, required: true },
    description: { type: String, required: true },
    comments: { type: [commentSchema], default: [] },
    createdAt: { type: Date, default: Date.now },
});
exports.Post = mongoose_1.default.model("Post", postSchema, "Posts");
