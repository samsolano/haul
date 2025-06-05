import type { User, UserWithId } from "../../common/types/user";
export declare function hashPassword(password: string): Promise<string>;
export declare function isPasswordValid(user: User, password: string): Promise<boolean>;
type JWTData = {
    _id: UserWithId["_id"];
};
export declare function generateJWT(user: UserWithId): string;
export declare function verifyJWT(token: string): JWTData | null;
declare global {
    namespace Express {
        interface Request {
            _id?: JWTData["_id"];
        }
    }
}
export {};
