import mongoose from "mongoose";
export type Store = {
    name: string;
    description?: string;
    websiteUrl?: string;
    phoneNumber?: string;
    address?: string;
    createdAt: Date;
};
export type StoreWithId = Store & {
    _id: mongoose.Types.ObjectId;
};
