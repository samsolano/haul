import {UserWithId } from "@common/types/user";
import {User} from "@backend/src/models/user"

export async function findAllUsers(): Promise<UserWithId[]> {
    console.log("[User Service] Finding all users");
    const users = await User.find().lean();
    console.log("[User Service] Found users:", users);
    // Convert _id to string for each user
    return users.map(u => ({
        ...u,
        _id: u._id.toString(),
    })) as unknown as UserWithId[];
}

export async function findUserByName(username: string): Promise<UserWithId | null> {
    console.log("[User Service] Searching for user:", username);
    const user = await User.findOne({ username }).lean();
    console.log("[User Service] Found user:", user ? "User exists" : "User not found");
    return user
        ? ({ ...user, _id: user._id.toString() } as unknown as UserWithId)
        : null;
}

export async function createUser(username: string, password: string): Promise<UserWithId> {
    console.log("[User Service] Creating new user:", username);
    const user = new User({ username, password });
    const savedUser = await user.save();
 console.log("[User Service] User created successfully:", username);
    // Convert _id to string
    return { ...savedUser.toObject(), _id: savedUser._id.toString() } as unknown as UserWithId;
}