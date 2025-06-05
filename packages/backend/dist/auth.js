// Auth utilities
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}
export async function isPasswordValid(user, password) {
    return await bcrypt.compare(password, user.password);
}
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error("JWT_SECRET is not set");
}
const jwtExpiryTime = "30m";
export function generateJWT(user) {
    return jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: jwtExpiryTime });
}
export function verifyJWT(token) {
    try {
        return jwt.verify(token, jwtSecret);
    }
    catch {
        return null;
    }
}
