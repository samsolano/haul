import mongoose, { type ObjectId } from "mongoose";

//MONGOOSE SCHEMA
const storeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },

    websiteUrl: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    address: { type: String, required: false },

    createdAt: { type: Date, default: Date.now },
});

export const Store = mongoose.model("Store", storeSchema, "Stores");

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
