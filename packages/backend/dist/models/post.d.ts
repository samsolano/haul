import mongoose from "mongoose";
export declare const Post: mongoose.Model<{
    author: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    mainImageUrl: string;
    description: string;
    comments: mongoose.Types.DocumentArray<{
        author: mongoose.Types.ObjectId;
        content: string;
        createdAt: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        author: mongoose.Types.ObjectId;
        content: string;
        createdAt: NativeDate;
    }> & {
        author: mongoose.Types.ObjectId;
        content: string;
        createdAt: NativeDate;
    }>;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    author: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    mainImageUrl: string;
    description: string;
    comments: mongoose.Types.DocumentArray<{
        author: mongoose.Types.ObjectId;
        content: string;
        createdAt: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        author: mongoose.Types.ObjectId;
        content: string;
        createdAt: NativeDate;
    }> & {
        author: mongoose.Types.ObjectId;
        content: string;
        createdAt: NativeDate;
    }>;
}, {}> & {
    author: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    mainImageUrl: string;
    description: string;
    comments: mongoose.Types.DocumentArray<{
        author: mongoose.Types.ObjectId;
        content: string;
        createdAt: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        author: mongoose.Types.ObjectId;
        content: string;
        createdAt: NativeDate;
    }> & {
        author: mongoose.Types.ObjectId;
        content: string;
        createdAt: NativeDate;
    }>;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    author: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    mainImageUrl: string;
    description: string;
    comments: mongoose.Types.DocumentArray<{
        author: mongoose.Types.ObjectId;
        content: string;
        createdAt: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        author: mongoose.Types.ObjectId;
        content: string;
        createdAt: NativeDate;
    }> & {
        author: mongoose.Types.ObjectId;
        content: string;
        createdAt: NativeDate;
    }>;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    author: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    mainImageUrl: string;
    description: string;
    comments: mongoose.Types.DocumentArray<{
        author: mongoose.Types.ObjectId;
        content: string;
        createdAt: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        author: mongoose.Types.ObjectId;
        content: string;
        createdAt: NativeDate;
    }> & {
        author: mongoose.Types.ObjectId;
        content: string;
        createdAt: NativeDate;
    }>;
}>, {}> & mongoose.FlatRecord<{
    author: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    mainImageUrl: string;
    description: string;
    comments: mongoose.Types.DocumentArray<{
        author: mongoose.Types.ObjectId;
        content: string;
        createdAt: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        author: mongoose.Types.ObjectId;
        content: string;
        createdAt: NativeDate;
    }> & {
        author: mongoose.Types.ObjectId;
        content: string;
        createdAt: NativeDate;
    }>;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
