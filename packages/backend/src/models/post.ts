import mongoose from "mongoose";

//MONGOOSE SCHEMA
const commentSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    mainImageUrl: { type: String, required: true },
    description: { type: String, required: true },
    comments: { type: [commentSchema], default: [] },

    createdAt: { type: Date, default: Date.now },
});

export const Post = mongoose.model("Post", postSchema, "Posts");