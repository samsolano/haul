import { User } from "./user";
import type { ObjectId } from "mongoose";

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
    comments: CommentUnresolved[];

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
