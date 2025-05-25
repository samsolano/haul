import { ObjectId } from "mongoose";
import { Post, PostUnresolved, PostWithId } from "../models/post";

export async function findAllPosts(): Promise<PostWithId[]> {
    // @ts-ignore: .populate doesn't properly manipulate the type.
    return Post.find().populate("author").populate("comments.author") as PostWithId[];
}

export async function findPostById(id: string): Promise<PostWithId | null> {
    // @ts-ignore: .populate doesn't properly manipulate the type.
    return Post.findById(id)?.populate("author")?.populate("comments.author") as PostWithId | null;
}

export async function findPostsByAuthor(author: ObjectId): Promise<PostWithId | null> {
    // @ts-ignore: .populate doesn't properly manipulate the type.
    return Post.find({ author }).populate("author").populate("comments.author") as PostWithId | null;
}

export async function createPost(info: PostUnresolved): Promise<PostWithId> {
    const post = new Post(info);

    // @ts-ignore: .save() doesn't add _id to the type.
    return await post.save();
}