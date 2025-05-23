import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

export type User = {
    email: string;
    passwordHash: string;
    username: string;
    createdAt: Date;
};

export const User = mongoose.model("User", userSchema);