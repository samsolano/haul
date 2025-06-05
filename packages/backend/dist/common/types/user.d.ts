import mongoose from "mongoose";
export type User = {
    username: string;
    password: string;
    createdAt: Date;
};
export type UserWithId = User & {
    _id: mongoose.Types.ObjectId;
};
