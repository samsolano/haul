import mongoose, { type ObjectId } from "mongoose";

const storeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },

    websiteUrl: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    address: { type: String, required: false },

    createdAt: { type: Date, default: Date.now },
});

export type Store = {
    name: string;

    description?: string;
    websiteUrl?: string;

    phoneNumber?: string;
    address?: string;

    createdAt: Date;
};

export type StoreWithId = Store & { _id: ObjectId };

export const Store = mongoose.model("Store", storeSchema, "Stores");