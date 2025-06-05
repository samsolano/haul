import { User } from "@backend/src/models/user";
export async function findAllUsers() {
    const users = await User.find().lean();
    // Convert _id to string for each user
    return users.map(u => ({
        ...u,
        _id: u._id.toString(),
    }));
}
export async function findUserByName(username) {
    const user = await User.findOne({ username }).lean();
    return user
        ? { ...user, _id: user._id.toString() }
        : null;
}
export async function createUser(username, password) {
    const user = new User({ username, password });
    const savedUser = await user.save();
    return { ...savedUser.toObject(), _id: savedUser._id.toString() };
}
