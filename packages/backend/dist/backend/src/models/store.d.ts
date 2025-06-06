import mongoose, { type ObjectId } from "mongoose";
export declare const Store: mongoose.Model<{
    createdAt: NativeDate;
    name: string;
    description: string;
    websiteUrl: string;
    phoneNumber: string;
    address: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    name: string;
    description: string;
    websiteUrl: string;
    phoneNumber: string;
    address: string;
}, {}> & {
    createdAt: NativeDate;
    name: string;
    description: string;
    websiteUrl: string;
    phoneNumber: string;
    address: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    name: string;
    description: string;
    websiteUrl: string;
    phoneNumber: string;
    address: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    name: string;
    description: string;
    websiteUrl: string;
    phoneNumber: string;
    address: string;
}>, {}> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    name: string;
    description: string;
    websiteUrl: string;
    phoneNumber: string;
    address: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export type Store = {
    name: string;
    description?: string;
    websiteUrl?: string;
    phoneNumber?: string;
    address?: string;
    createdAt: Date;
};
export type StoreWithId = Store & {
    _id: ObjectId;
};
