import mongoose from "mongoose";
import { User } from "./user";

//TYPESCRIPT SCHEMA
export type CommentUnresolved = {
    author: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
}

export type Comment = {
    author: User;
    content: string;
    createdAt: Date;
}

export type PostUnresolved = {
    author: mongoose.Types.ObjectId;

    mainImageUrl: string;
    description: string;
    comments?: CommentUnresolved[];

    createdAt?: Date;
}

export type Post = {
    author: User;

    mainImageUrl: string;
    description: string;
    comments: Comment[];

    createdAt: Date;
};

export type PostWithId = Post & { _id: mongoose.Types.ObjectId };
