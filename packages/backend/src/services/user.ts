import { User } from "../models/user";

export async function findAllUsers() {
    return User.find();
}