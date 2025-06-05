import mongoose from "mongoose";
export type User = {
    username: string;
    password: string;
    createdAt: Date;
};
export declare const User: mongoose.Model<{
    username: string;
    password: string;
    createdAt: NativeDate;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    username: string;
    password: string;
    createdAt: NativeDate;
}, {}> & {
    username: string;
    password: string;
    createdAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    username: string;
    password: string;
    createdAt: NativeDate;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    username: string;
    password: string;
    createdAt: NativeDate;
}>, {}> & mongoose.FlatRecord<{
    username: string;
    password: string;
    createdAt: NativeDate;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
