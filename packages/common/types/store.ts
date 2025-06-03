import { ObjectId } from "mongoose";

//TYPESCRIPT SCHEMA
export type Store = {
    name: string;

    description?: string;
    websiteUrl?: string;

    phoneNumber?: string;
    address?: string;

    createdAt: Date;
};

export type StoreWithId = Store & { _id: ObjectId };
