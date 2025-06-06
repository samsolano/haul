"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPosts = findAllPosts;
exports.findPostById = findPostById;
exports.findPostsByAuthor = findPostsByAuthor;
exports.createPost = createPost;
exports.deletePost = deletePost;
const post_1 = require("../models/post");
async function findAllPosts() {
    // @ts-expect-error: .populate doesn't properly manipulate the type.
    return post_1.Post.find().populate("author").populate("comments.author");
}
async function findPostById(id) {
    // @ts-expect-error: .populate doesn't properly manipulate the type.
    return post_1.Post.findById(id)?.populate("author")?.populate("comments.author");
}
async function findPostsByAuthor(author) {
    // @ts-expect-error: .populate doesn't properly manipulate the type.
    return post_1.Post.find({ author }).populate("author").populate("comments.author");
}
async function createPost(info) {
    const post = new post_1.Post(info);
    // @ts-expect-error: .save() doesn't add _id to the type.
    return await post.save();
}
async function deletePost(id, authorId) {
    // First, find the post to check if it exists and verify ownership
    const post = await post_1.Post.findById(id);
    if (!post) {
        return false; // Post doesn't exist
    }
    // Check if the user is the author of the post
    if (post.author.toString() !== authorId.toString()) {
        throw new Error("Unauthorized: You can only delete your own posts");
    }
    // Delete the post
    const result = await post_1.Post.findByIdAndDelete(id);
    return result !== null;
}
