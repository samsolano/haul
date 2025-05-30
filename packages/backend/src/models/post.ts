import mongoose, { type ObjectId } from "mongoose";
import { User } from "./user";

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

//TYPESCRIPT SCHEMA
export type CommentUnresolved = {
    author: ObjectId;
    content: string;
    createdAt: Date;
}

export type Comment = {
    author: User;
    content: string;
    createdAt: Date;
}

export type PostUnresolved = {
    author: ObjectId;
    mainImageUrl: string;
    description: string;
    comments: Comment[] | CommentUnresolved[];
    createdAt: Date;
}

export type Post = {
    author: User;
    mainImageUrl: string;
    description: string;
    comments: Comment[];
    createdAt: Date;
};

export type PostWithId = Post & { _id: ObjectId };

export const Post = mongoose.model<PostWithId>("Post", postSchema, "Posts");

