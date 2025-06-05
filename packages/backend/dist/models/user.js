import mongoose from "mongoose";
import { hashPassword } from "../auth";
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
    this.password = await hashPassword(this.password);
    next();
});
export const User = mongoose.model("User", userSchema, "Users");
