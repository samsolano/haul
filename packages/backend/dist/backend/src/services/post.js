"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPosts = findAllPosts;
exports.findPostById = findPostById;
exports.findPostsByAuthor = findPostsByAuthor;
exports.createPost = createPost;
exports.deletePost = deletePost;
exports.addCommentToPost = addCommentToPost;
const post_1 = require("../models/post");
async function findAllPosts() {
    return post_1.Post.find().populate("author").populate("comments.author");
}
async function findPostById(id) {
    return post_1.Post.findById(id)?.populate("author")?.populate("comments.author");
}
async function findPostsByAuthor(author) {
    return post_1.Post.find({ author }).populate("author").populate("comments.author");
}
async function createPost(info) {
    const post = new post_1.Post(info);
    return await post.save();
}
async function deletePost(id, authorId) {
    const post = await post_1.Post.findById(id);
    if (!post) {
        return false;
    }
    if (post.author.toString() !== authorId.toString()) {
        throw new Error("Unauthorized: You can only delete your own posts");
    }
    const result = await post_1.Post.findByIdAndDelete(id);
    return result !== null;
}
async function addCommentToPost(postId, comment) {
    const post = await post_1.Post.findById(postId);
    if (!post) {
        return null;
    }
    post.comments.push({
        author: comment.author,
        content: comment.content,
        createdAt: new Date()
    });
    const updatedPost = await post.save();
    return post_1.Post.findById(updatedPost._id).populate("author").populate("comments.author");
}
