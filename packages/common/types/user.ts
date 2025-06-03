import { ObjectId } from "mongoose";

//TYPESCRIPT SCHEMA
export type User = {
    username: string;
    password: string;
    createdAt: Date;
};

export type UserWithId = User & { _id: ObjectId };
