import { generateJWT, hashPassword, isPasswordValid, verifyJWT } from "@backend/src/auth";
import mongoose from "mongoose";
describe("auth", () => {
    it("should generate a valid JWT", () => {
        const fakeUser = {
            _id: new mongoose.Types.ObjectId(),
            createdAt: new Date(),
            username: "foo",
            password: "imagineThisIsHashed"
        };
        const jwt = generateJWT(fakeUser);
        expect(typeof jwt).toBe("string");
        const decoded = verifyJWT(jwt);
        expect(decoded).toBeDefined();
        expect(decoded?._id.toString()).toBe(fakeUser._id.toString());
    });
    it("should not error on an invalid JWT", () => {
        expect(verifyJWT("invalidJWT")).toBe(null);
    });
    it("should equate a valid password", async () => {
        const thePassword = "hello there";
        const passwordHash = await hashPassword(thePassword);
        const mockUser = {
            username: "whatever",
            password: passwordHash,
            createdAt: new Date()
        };
        const isValid = await isPasswordValid(mockUser, thePassword);
        expect(isValid).toBe(true);
    });
    it("if process.env.JWT_SECRET is not set, module should throw an error", () => {
        const originalJwtSecret = process.env.JWT_SECRET;
        jest.isolateModules(() => {
            delete process.env.JWT_SECRET;
            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                require("@backend/src/auth");
            }).toThrow("JWT_SECRET is not set");
        });
        // Restore
        process.env.JWT_SECRET = originalJwtSecret;
    });
});
