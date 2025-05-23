import { User, UserWithId } from "../models/user";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export async function findAllUsers(): Promise<UserWithId[]> {
    return User.find();
}

export async function findUserByName(username: string): Promise<UserWithId | null> {
    return User.findOne({ username });
}

export async function findUserByEmail(email: string): Promise<UserWithId | null> {
    return User.findOne({ email });
}

export async function createUser(email: string, password: string, username: string): Promise<UserWithId> {
    const user = new User({ email, password, username });

    // @ts-ignore: Not sure why their typings don't include _id.
    // But from my tests, it is included.
    return await user.save();
}

// Auth utilities

export async function isPasswordValid(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
}

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error("JWT_SECRET is not set");
}

const jwtExpiryTime = "30m";

type JWTData = { _id: UserWithId["_id"]; };

export function generateJWT(user: UserWithId, duration: string): string {
    return jwt.sign({ _id: user._id }, jwtSecret as string, { expiresIn: jwtExpiryTime })
}

export function verifyJWT(token: string): JWTData | null {
    try {
        return jwt.verify(token, jwtSecret as string) as JWTData;
    } catch (err) {
        return null;
    }
}

declare global {
    namespace Express {
        interface Request {
            _id?: JWTData["_id"];
        }
    }
}