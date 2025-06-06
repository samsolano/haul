import { Post } from "../models/post";
import { PostUnresolved, PostWithId } from "../../../common/types/post";
import mongoose from "mongoose";

export async function findAllPosts(): Promise<PostWithId[]> {
    // @ts-expect-error: .populate doesn't properly manipulate the type.
    return Post.find().populate("author").populate("comments.author") as PostWithId[];
}

export async function findPostById(id: string): Promise<PostWithId | null> {
    // @ts-expect-error: .populate doesn't properly manipulate the type.
    return Post.findById(id)?.populate("author")?.populate("comments.author") as PostWithId | null;
}

export async function findPostsByAuthor(author: mongoose.Types.ObjectId): Promise<PostWithId[] | null> {
    // @ts-expect-error: .populate doesn't properly manipulate the type.
    return Post.find({ author }).populate("author").populate("comments.author") as PostWithId | null;
}

export async function createPost(info: PostUnresolved): Promise<PostWithId> {
    const post = new Post(info);

    // @ts-expect-error: .save() doesn't add _id to the type.
    return await post.save();
}

export async function deletePost(id: string, authorId: mongoose.Types.ObjectId): Promise<boolean> {
    // First, find the post to check if it exists and verify ownership
    const post = await Post.findById(id);
    if (!post) {
        return false; // Post doesn't exist
    }

    // Check if the user is the author of the post
    if (post.author.toString() !== authorId.toString()) {
        throw new Error("Unauthorized: You can only delete your own posts");
    }

    // Delete the post
    const result = await Post.findByIdAndDelete(id);
    return result !== null;
}

export async function addCommentToPost(postId: string, comment: { author: mongoose.Types.ObjectId; content: string }): Promise<PostWithId | null> {
    const post = await Post.findById(postId);
    if (!post) {
        return null; // Post doesn't exist
    }

    // Add the comment to the post
    post.comments.push({
        author: comment.author,
        content: comment.content,
        createdAt: new Date()
    });

    // Save the updated post
    const updatedPost = await post.save();
    
    // Return the post with populated fields
    // @ts-expect-error: .populate doesn't properly manipulate the type.
    return Post.findById(updatedPost._id).populate("author").populate("comments.author") as PostWithId;
}