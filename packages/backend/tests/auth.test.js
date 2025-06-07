"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("../src/auth");
var mongoose_1 = require("mongoose");
describe("auth", function () {
    it("should generate a valid JWT", function () {
        var fakeUser = {
            _id: new mongoose_1.default.Types.ObjectId(),
            createdAt: new Date(),
            username: "foo",
            password: "imagineThisIsHashed"
        };
        var jwt = (0, auth_1.generateJWT)(fakeUser);
        expect(typeof jwt).toBe("string");
        var decoded = (0, auth_1.verifyJWT)(jwt);
        expect(decoded).toBeDefined();
        expect(decoded === null || decoded === void 0 ? void 0 : decoded._id.toString()).toBe(fakeUser._id.toString());
    });
    it("should not error on an invalid JWT", function () {
        expect((0, auth_1.verifyJWT)("invalidJWT")).toBe(null);
    });
    it("should equate a valid password", function () { return __awaiter(void 0, void 0, void 0, function () {
        var thePassword, passwordHash, mockUser, isValid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    thePassword = "hello there";
                    return [4 /*yield*/, (0, auth_1.hashPassword)(thePassword)];
                case 1:
                    passwordHash = _a.sent();
                    mockUser = {
                        username: "whatever",
                        password: passwordHash,
                        createdAt: new Date()
                    };
                    return [4 /*yield*/, (0, auth_1.isPasswordValid)(mockUser, thePassword)];
                case 2:
                    isValid = _a.sent();
                    expect(isValid).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it("if process.env.JWT_SECRET is not set, module should throw an error", function () {
        var originalJwtSecret = process.env.JWT_SECRET;
        jest.isolateModules(function () {
            delete process.env.JWT_SECRET;
            expect(function () {
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                require("@backend/src/auth");
            }).toThrow("JWT_SECRET is not set");
        });
        // Restore
        process.env.JWT_SECRET = originalJwtSecret;
    });
});
