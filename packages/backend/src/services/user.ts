import { User, UserWithId } from "../models/user";

export async function findAllUsers(): Promise<UserWithId[]> {
    console.log("[User Service] Finding all users");
    const users = await User.find().lean();
    console.log("[User Service] Found users:", users);
    return users as UserWithId[];
}

export async function findUserByName(username: string): Promise<UserWithId | null> {
    console.log("[User Service] Searching for user:", username);
    const user = await User.findOne({ username }).lean();
    console.log("[User Service] Found user:", user ? "User exists" : "User not found");
    return user as UserWithId | null;
}

export async function createUser(username: string, password: string): Promise<UserWithId> {
    console.log("[User Service] Creating new user:", username);
    const user = new User({ username, password });
    const savedUser = await user.save();
    console.log("[User Service] User created successfully:", username);
    return savedUser.toObject() as UserWithId;
}