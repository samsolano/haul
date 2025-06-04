import { MongoMemoryServer } from "mongodb-memory-server";

export default async function setup() {
    // Force use a newer version of 'mongodb' which uses a newer OpenSSL
    // Critical for distros like Ubuntu 22.04 Or Fedora 40+
    process.env.MONGOMS_DOWNLOAD_URL = "https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu2204-8.0.4.tgz"
    process.env.MONGOMS_VERSION = "8.0.4"

    process.env.JWT_SECRET = 'test-jwt-secret';

    // Setup a shared mongodb test server
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    // Store this for teardown
    global.__MONGOD__ = mongod;

    process.env.MONGO_TEST_URI = uri;
}

declare global {
    // eslint-disable-next-line no-var
    var __MONGOD__: MongoMemoryServer;
}