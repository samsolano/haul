// Auth utilities
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { User, UserWithId } from "./models/user";

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
}

export async function isPasswordValid(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
}

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error("JWT_SECRET is not set");
}

const jwtExpiryTime = "30m";

type JWTData = { _id: UserWithId["_id"]; };

export function generateJWT(user: UserWithId): string {
    return jwt.sign({ _id: user._id }, jwtSecret as string, { expiresIn: jwtExpiryTime })
}

export function verifyJWT(token: string): JWTData | null {
    try {
        return jwt.verify(token, jwtSecret as string) as JWTData;
    } catch {
        return null;
    }
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            _id?: JWTData["_id"];
        }
    }
}