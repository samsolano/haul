import { PostUnresolved, PostWithId } from "../../../common/types/post";
import mongoose from "mongoose";
export declare function findAllPosts(): Promise<PostWithId[]>;
export declare function findPostById(id: string): Promise<PostWithId | null>;
export declare function findPostsByAuthor(author: mongoose.Types.ObjectId): Promise<PostWithId[] | null>;
export declare function createPost(info: PostUnresolved): Promise<PostWithId>;
export declare function deletePost(id: string, authorId: mongoose.Types.ObjectId): Promise<boolean>;
