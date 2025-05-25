import { User, UserWithId } from "../models/user";

export async function findAllUsers(): Promise<UserWithId[]> {
    // @ts-ignore: .populate doesn't properly manipulate the type.
    return User.find().populate("posts.author").populate("posts.comments.author") as UserWithId[];
}

export async function findUserByName(username: string): Promise<UserWithId | null> {
    // @ts-ignore: .populate doesn't properly manipulate the type.
    return User.findOne({ username }).populate("posts.author").populate("posts.comments.author") as UserWithId | null;
}

export async function createUser(username: string, password: string): Promise<UserWithId> {
    const user = new User({ username, password });

    // @ts-ignore: .save() doesn't add _id to the type.
    return await user.save();
}