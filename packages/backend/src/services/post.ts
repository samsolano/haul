import { Post, PostUnresolved, PostWithId } from "../models/post";
import type { ObjectId } from "mongoose";

export async function createPost(
    authorId: ObjectId,
    mainImageUrl: string,
    description: string
): Promise<PostWithId> {
    console.log("[Post Service] Creating new post");
    const postData: PostUnresolved = {
        author: authorId,
        mainImageUrl,
        description,
        comments: [],
        createdAt: new Date()
    };
    const post = new Post(postData);
    const savedPost = await post.save();
    console.log("[Post Service] Post created successfully");
    return savedPost.toObject() as PostWithId;
}

export async function findAllPosts(): Promise<PostWithId[]> {
    console.log("[Post Service] Finding all posts");
    const posts = await Post.find()
        .populate('author', 'username')
        .populate('comments.author', 'username')
        .sort({ createdAt: -1 })
        .lean();
    console.log("[Post Service] Found posts:", posts.length);
    return posts as PostWithId[];
}

export async function findPostById(id: string): Promise<PostWithId | null> {
    console.log("[Post Service] Finding post by id:", id);
    const post = await Post.findById(id)
        .populate('author', 'username')
        .populate('comments.author', 'username')
        .lean();
    console.log("[Post Service] Found post:", post ? "Post exists" : "Post not found");
    return post as PostWithId | null;
}

export async function findPostsByAuthor(author: ObjectId): Promise<PostWithId[]> {
    console.log("[Post Service] Finding posts by author:", author);
    const posts = await Post.find({ author })
        .populate('author', 'username')
        .populate('comments.author', 'username')
        .sort({ createdAt: -1 })
        .lean();
    console.log("[Post Service] Found posts:", posts.length);
    return posts as PostWithId[];
}