import { User, UserWithId } from "../models/user";

export async function findAllUsers(): Promise<UserWithId[]> {
    return User.find();
}

export async function findUserByName(username: string): Promise<UserWithId | null> {
    return User.findOne({ username });
}

export async function createUser(username: string, password: string): Promise<UserWithId> {
    const user = new User({ username, password });

    // @ts-ignore: .save() doesn't add _id to the type.
    return await user.save();
}