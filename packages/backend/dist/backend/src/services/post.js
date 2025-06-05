"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPosts = findAllPosts;
exports.findPostById = findPostById;
exports.findPostsByAuthor = findPostsByAuthor;
exports.createPost = createPost;
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
