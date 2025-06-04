import {UserWithId } from "@common/types/user";
import {User} from "@backend/src/models/user"

export async function findAllUsers(): Promise<UserWithId[]> {
    const users = await User.find().lean();
    // Convert _id to string for each user
    return users.map(u => ({
        ...u,
        _id: u._id.toString(),
    })) as unknown as UserWithId[];
}

export async function findUserByName(username: string): Promise<UserWithId | null> {
    const user = await User.findOne({ username }).lean();
    return user
        ? ({ ...user, _id: user._id.toString() } as unknown as UserWithId)
        : null;
}

export async function createUser(username: string, password: string): Promise<UserWithId> {
    const user = new User({ username, password });
    const savedUser = await user.save();
    return { ...savedUser.toObject(), _id: savedUser._id.toString() } as unknown as UserWithId;
}