import mongoose, { type ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import { Post, PostUnresolved } from "./post";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post", default: [] }],

    createdAt: { type: Date, default: Date.now },
});

// Before storing 'password', hash it.
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export type UserUnresolved = {
    username: string;
    password: string;

    posts: PostUnresolved[];

    createdAt: Date;
};

export type User = {
    username: string;
    password: string;

    posts: Post[];

    createdAt: Date;
};

export type UserWithId = User & { _id: ObjectId };

export const User = mongoose.model("User", userSchema, "Users");