import mongoose from "mongoose";
export type User = {
    username: string;
    password: string;
    createdAt: Date;
};
export declare const User: mongoose.Model<{
    createdAt: NativeDate;
    username: string;
    password: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    username: string;
    password: string;
}, {}> & {
    createdAt: NativeDate;
    username: string;
    password: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    username: string;
    password: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    username: string;
    password: string;
}>, {}> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    username: string;
    password: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
