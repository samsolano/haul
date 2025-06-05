import mongoose, { type ObjectId } from "mongoose";
export declare const Store: mongoose.Model<{
    name: string;
    createdAt: NativeDate;
    description?: string | null | undefined;
    websiteUrl?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    address?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    createdAt: NativeDate;
    description?: string | null | undefined;
    websiteUrl?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    address?: string | null | undefined;
}, {}> & {
    name: string;
    createdAt: NativeDate;
    description?: string | null | undefined;
    websiteUrl?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    address?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    createdAt: NativeDate;
    description?: string | null | undefined;
    websiteUrl?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    address?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    createdAt: NativeDate;
    description?: string | null | undefined;
    websiteUrl?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    address?: string | null | undefined;
}>, {}> & mongoose.FlatRecord<{
    name: string;
    createdAt: NativeDate;
    description?: string | null | undefined;
    websiteUrl?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    address?: string | null | undefined;
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
