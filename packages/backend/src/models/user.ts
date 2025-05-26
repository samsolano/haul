import mongoose, { type ObjectId } from "mongoose";
import bcrypt from "bcrypt";

// MONGOOSE SCHEMA
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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

//TYPESCRIPT SCHEMA
export type User = {
    username: string;
    password: string;
    createdAt: Date;
};

export type UserWithId = User & { _id: ObjectId };

export const User = mongoose.model("User", userSchema, "Users");