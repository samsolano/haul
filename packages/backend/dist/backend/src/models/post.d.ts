import mongoose from "mongoose";
export declare const Post: mongoose.Model<{
    createdAt: NativeDate;
    description: string;
    author: mongoose.Types.ObjectId;
    mainImageUrl: string;
    comments: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        author: mongoose.Types.ObjectId;
        content: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        createdAt: NativeDate;
        author: mongoose.Types.ObjectId;
        content: string;
    }> & {
        createdAt: NativeDate;
        author: mongoose.Types.ObjectId;
        content: string;
    }>;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    description: string;
    author: mongoose.Types.ObjectId;
    mainImageUrl: string;
    comments: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        author: mongoose.Types.ObjectId;
        content: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        createdAt: NativeDate;
        author: mongoose.Types.ObjectId;
        content: string;
    }> & {
        createdAt: NativeDate;
        author: mongoose.Types.ObjectId;
        content: string;
    }>;
}, {}> & {
    createdAt: NativeDate;
    description: string;
    author: mongoose.Types.ObjectId;
    mainImageUrl: string;
    comments: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        author: mongoose.Types.ObjectId;
        content: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        createdAt: NativeDate;
        author: mongoose.Types.ObjectId;
        content: string;
    }> & {
        createdAt: NativeDate;
        author: mongoose.Types.ObjectId;
        content: string;
    }>;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    description: string;
    author: mongoose.Types.ObjectId;
    mainImageUrl: string;
    comments: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        author: mongoose.Types.ObjectId;
        content: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        createdAt: NativeDate;
        author: mongoose.Types.ObjectId;
        content: string;
    }> & {
        createdAt: NativeDate;
        author: mongoose.Types.ObjectId;
        content: string;
    }>;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    description: string;
    author: mongoose.Types.ObjectId;
    mainImageUrl: string;
    comments: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        author: mongoose.Types.ObjectId;
        content: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        createdAt: NativeDate;
        author: mongoose.Types.ObjectId;
        content: string;
    }> & {
        createdAt: NativeDate;
        author: mongoose.Types.ObjectId;
        content: string;
    }>;
}>, {}> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    description: string;
    author: mongoose.Types.ObjectId;
    mainImageUrl: string;
    comments: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        author: mongoose.Types.ObjectId;
        content: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        createdAt: NativeDate;
        author: mongoose.Types.ObjectId;
        content: string;
    }> & {
        createdAt: NativeDate;
        author: mongoose.Types.ObjectId;
        content: string;
    }>;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
