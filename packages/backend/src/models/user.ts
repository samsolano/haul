import mongoose, { type ObjectId } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
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

export type User = {
    email: string;
    password: string;
    username: string;
    createdAt: Date;
};

export type UserWithId = User & { _id: ObjectId };

export const User = mongoose.model("User", userSchema, "Users");