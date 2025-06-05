import { Post } from "@backend/src/models/post";
export async function findAllPosts() {
    // @ts-expect-error: .populate doesn't properly manipulate the type.
    return Post.find().populate("author").populate("comments.author");
}
export async function findPostById(id) {
    // @ts-expect-error: .populate doesn't properly manipulate the type.
    return Post.findById(id)?.populate("author")?.populate("comments.author");
}
export async function findPostsByAuthor(author) {
    // @ts-expect-error: .populate doesn't properly manipulate the type.
    return Post.find({ author }).populate("author").populate("comments.author");
}
export async function createPost(info) {
    const post = new Post(info);
    // @ts-expect-error: .save() doesn't add _id to the type.
    return await post.save();
}
