import { UserWithId } from "../../../common/types/user";
export declare function findAllUsers(): Promise<UserWithId[]>;
export declare function findUserByName(username: string): Promise<UserWithId | null>;
export declare function createUser(username: string, password: string): Promise<UserWithId>;
