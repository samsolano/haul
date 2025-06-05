import { MongoMemoryServer } from "mongodb-memory-server";
export default function setup(): Promise<void>;
declare global {
    var __MONGOD__: MongoMemoryServer;
}
