"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllUsers = findAllUsers;
exports.findUserByName = findUserByName;
exports.createUser = createUser;
const user_1 = require("../models/user");
async function findAllUsers() {
    const users = await user_1.User.find().lean();
    return users.map(u => ({
        ...u,
        _id: u._id.toString(),
    }));
}
async function findUserByName(username) {
    const user = await user_1.User.findOne({ username }).lean();
    return user
        ? { ...user, _id: user._id.toString() }
        : null;
}
async function createUser(username, password) {
    const user = new user_1.User({ username, password });
    const savedUser = await user.save();
    return { ...savedUser.toObject(), _id: savedUser._id.toString() };
}
