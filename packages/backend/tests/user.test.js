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
var user_1 = require("../src/models/user");
var auth_1 = require("../src/auth");
var userServices = require("../src/services/user");
var mongoose_1 = require("mongoose");
// Mock the hashPassword function
jest.mock('@backend/src/auth', function () { return ({
    hashPassword: jest.fn()
}); });
var mockedHashPassword = auth_1.hashPassword;
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoose_1.default.connect(process.env.MONGO_TEST_URI)];
            case 1:
                _a.sent();
                // Ensure indexes are created
                return [4 /*yield*/, user_1.User.createIndexes()];
            case 2:
                // Ensure indexes are created
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    var collections, _a, _b, _c, _i, key;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                collections = mongoose_1.default.connection.collections;
                _a = collections;
                _b = [];
                for (_c in _a)
                    _b.push(_c);
                _i = 0;
                _d.label = 1;
            case 1:
                if (!(_i < _b.length)) return [3 /*break*/, 4];
                _c = _b[_i];
                if (!(_c in _a)) return [3 /*break*/, 3];
                key = _c;
                return [4 /*yield*/, collections[key].deleteMany({})];
            case 2:
                _d.sent();
                _d.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoose_1.default.connection.close()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('User Schema Tests', function () {
    describe('Schema Validation', function () {
        test('should create user with valid data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userData, user, savedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userData = {
                            username: 'testuser',
                            password: 'plainpassword'
                        };
                        mockedHashPassword.mockResolvedValue('hashedpassword123');
                        user = new user_1.User(userData);
                        return [4 /*yield*/, user.save()];
                    case 1:
                        savedUser = _a.sent();
                        expect(savedUser.username).toBe('testuser');
                        expect(savedUser.password).toBe('hashedpassword123');
                        expect(savedUser.createdAt).toBeInstanceOf(Date);
                        expect(savedUser._id).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should require username field', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userData, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userData = {
                            password: 'plainpassword'
                            // missing username
                        };
                        user = new user_1.User(userData);
                        return [4 /*yield*/, expect(user.save()).rejects.toThrow()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should require password field', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userData, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userData = {
                            username: 'testuser'
                            // missing password
                        };
                        user = new user_1.User(userData);
                        return [4 /*yield*/, expect(user.save()).rejects.toThrow()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should enforce unique username constraint', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userData, user1, user2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userData = {
                            username: 'testuser',
                            password: 'password123'
                        };
                        mockedHashPassword.mockResolvedValue('hashedpassword');
                        user1 = new user_1.User(userData);
                        return [4 /*yield*/, user1.save()];
                    case 1:
                        _a.sent();
                        user2 = new user_1.User(userData);
                        // The duplicate username should cause a MongoDB duplicate key error
                        return [4 /*yield*/, expect(user2.save()).rejects.toThrow(/duplicate key|E11000/)];
                    case 2:
                        // The duplicate username should cause a MongoDB duplicate key error
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should set createdAt to current date by default', function () { return __awaiter(void 0, void 0, void 0, function () {
            var beforeCreate, user, savedUser, afterCreate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        beforeCreate = new Date();
                        mockedHashPassword.mockResolvedValue('hashedpassword');
                        user = new user_1.User({
                            username: 'testuser',
                            password: 'password123'
                        });
                        return [4 /*yield*/, user.save()];
                    case 1:
                        savedUser = _a.sent();
                        afterCreate = new Date();
                        expect(savedUser.createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
                        expect(savedUser.createdAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Password Hashing Pre-save Hook', function () {
        test('should hash password before saving new user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var plainPassword, hashedPassword, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Clear all existing users first
                    return [4 /*yield*/, user_1.User.deleteMany({})];
                    case 1:
                        // Clear all existing users first
                        _a.sent();
                        // Clear mock call history from any previous operations
                        mockedHashPassword.mockClear();
                        plainPassword = 'myplainpassword';
                        hashedPassword = 'hashed_myplainpassword';
                        mockedHashPassword.mockResolvedValue(hashedPassword);
                        user = new user_1.User({
                            username: 'testuser',
                            password: plainPassword
                        });
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        expect(mockedHashPassword).toHaveBeenCalledWith(plainPassword);
                        expect(mockedHashPassword).toHaveBeenCalledTimes(1);
                        expect(user.password).toBe(hashedPassword);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should hash password when password is modified', function () { return __awaiter(void 0, void 0, void 0, function () {
            var originalPassword, newPassword, hashedOriginal, hashedNew, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        originalPassword = 'originalpassword';
                        newPassword = 'newpassword';
                        hashedOriginal = 'hashed_original';
                        hashedNew = 'hashed_new';
                        // Mock for initial save
                        mockedHashPassword.mockResolvedValueOnce(hashedOriginal);
                        user = new user_1.User({
                            username: 'testuser',
                            password: originalPassword
                        });
                        return [4 /*yield*/, user.save()];
                    case 1:
                        _a.sent();
                        // Reset mock for update
                        mockedHashPassword.mockClear();
                        mockedHashPassword.mockResolvedValueOnce(hashedNew);
                        // Modify password
                        user.password = newPassword;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        expect(mockedHashPassword).toHaveBeenCalledWith(newPassword);
                        expect(user.password).toBe(hashedNew);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should NOT hash password when password is not modified', function () { return __awaiter(void 0, void 0, void 0, function () {
            var plainPassword, hashedPassword, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        plainPassword = 'myplainpassword';
                        hashedPassword = 'hashed_myplainpassword';
                        mockedHashPassword.mockResolvedValue(hashedPassword);
                        user = new user_1.User({
                            username: 'testuser',
                            password: plainPassword
                        });
                        return [4 /*yield*/, user.save()];
                    case 1:
                        _a.sent();
                        // Clear mock calls from initial save
                        mockedHashPassword.mockClear();
                        // Modify non-password field
                        user.username = 'newusername';
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        // hashPassword should NOT be called again
                        expect(mockedHashPassword).not.toHaveBeenCalled();
                        expect(user.password).toBe(hashedPassword); // Should still be the original hashed password
                        return [2 /*return*/];
                }
            });
        }); });
        test('should handle hashing errors gracefully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var plainPassword, hashError, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        plainPassword = 'myplainpassword';
                        hashError = new Error('Hashing failed');
                        mockedHashPassword.mockRejectedValue(hashError);
                        user = new user_1.User({
                            username: 'testuser',
                            password: plainPassword
                        });
                        return [4 /*yield*/, expect(user.save()).rejects.toThrow('Hashing failed')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Model Methods', function () {
        test('should create user instance with correct schema', function () {
            var userData = {
                username: 'testuser',
                password: 'password123'
            };
            var user = new user_1.User(userData);
            expect(user).toBeInstanceOf(user_1.User);
            expect(user.username).toBe('testuser');
            expect(user.password).toBe('password123');
            expect(user.createdAt).toBeInstanceOf(Date);
        });
    });
});
describe("User Services Tests", function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var testUser, secondUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Reset mocks
                    jest.clearAllMocks();
                    mockedHashPassword.mockResolvedValue('hashedpassword123');
                    testUser = new user_1.User({
                        username: 'testuser',
                        password: 'password123'
                    });
                    return [4 /*yield*/, testUser.save()];
                case 1:
                    _a.sent();
                    secondUser = new user_1.User({
                        username: 'seconduser',
                        password: 'password456'
                    });
                    return [4 /*yield*/, secondUser.save()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('findAllUsers', function () {
        test('should return empty array when no users exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Clear all users
                    return [4 /*yield*/, user_1.User.deleteMany({})];
                    case 1:
                        // Clear all users
                        _a.sent();
                        return [4 /*yield*/, userServices.findAllUsers()];
                    case 2:
                        users = _a.sent();
                        expect(users).toEqual([]);
                        expect(Array.isArray(users)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return all users with string _id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var users, usernames;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userServices.findAllUsers()];
                    case 1:
                        users = _a.sent();
                        expect(users).toHaveLength(2);
                        expect(users[0]).toHaveProperty('username');
                        expect(users[0]).toHaveProperty('password');
                        expect(users[0]).toHaveProperty('createdAt');
                        expect(users[0]).toHaveProperty('_id');
                        expect(typeof users[0]._id).toBe('string');
                        expect(typeof users[1]._id).toBe('string');
                        usernames = users.map(function (u) { return u.username; });
                        expect(usernames).toContain('testuser');
                        expect(usernames).toContain('seconduser');
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return users with hashed passwords', function () { return __awaiter(void 0, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userServices.findAllUsers()];
                    case 1:
                        users = _a.sent();
                        expect(users[0].password).toBe('hashedpassword123');
                        expect(users[1].password).toBe('hashedpassword123');
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return users ordered by creation', function () { return __awaiter(void 0, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userServices.findAllUsers()];
                    case 1:
                        users = _a.sent();
                        expect(users[0].createdAt).toBeInstanceOf(Date);
                        expect(users[1].createdAt).toBeInstanceOf(Date);
                        // First user should be created before or at the same time as second user
                        expect(users[0].createdAt.getTime()).toBeLessThanOrEqual(users[1].createdAt.getTime());
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('findUserByName', function () {
        test('should return null for non-existent username', function () { return __awaiter(void 0, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userServices.findUserByName('nonexistentuser')];
                    case 1:
                        user = _a.sent();
                        expect(user).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return user with string _id for valid username', function () { return __awaiter(void 0, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userServices.findUserByName('testuser')];
                    case 1:
                        user = _a.sent();
                        expect(user).not.toBeNull();
                        expect(user.username).toBe('testuser');
                        expect(user.password).toBe('hashedpassword123');
                        expect(user.createdAt).toBeInstanceOf(Date);
                        expect(user._id).toBeDefined();
                        expect(typeof user._id).toBe('string');
                        return [2 /*return*/];
                }
            });
        }); });
        test('should be case sensitive for username search', function () { return __awaiter(void 0, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userServices.findUserByName('TestUser')];
                    case 1:
                        user = _a.sent();
                        expect(user).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return correct user when multiple users exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var firstUser, secondUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userServices.findUserByName('testuser')];
                    case 1:
                        firstUser = _a.sent();
                        return [4 /*yield*/, userServices.findUserByName('seconduser')];
                    case 2:
                        secondUser = _a.sent();
                        expect(firstUser).not.toBeNull();
                        expect(secondUser).not.toBeNull();
                        expect(firstUser.username).toBe('testuser');
                        expect(secondUser.username).toBe('seconduser');
                        expect(firstUser._id).not.toBe(secondUser._id);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should handle special characters in username', function () { return __awaiter(void 0, void 0, void 0, function () {
            var specialUser, foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        specialUser = new user_1.User({
                            username: 'user_with-special.chars',
                            password: 'password'
                        });
                        return [4 /*yield*/, specialUser.save()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, userServices.findUserByName('user_with-special.chars')];
                    case 2:
                        foundUser = _a.sent();
                        expect(foundUser).not.toBeNull();
                        expect(foundUser.username).toBe('user_with-special.chars');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('createUser', function () {
        test('should create user with valid data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var username, password, createdUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Clear existing users to avoid conflicts
                    return [4 /*yield*/, user_1.User.deleteMany({})];
                    case 1:
                        // Clear existing users to avoid conflicts
                        _a.sent();
                        username = 'newuser';
                        password = 'newpassword';
                        return [4 /*yield*/, userServices.createUser(username, password)];
                    case 2:
                        createdUser = _a.sent();
                        expect(createdUser.username).toBe(username);
                        expect(createdUser.password).toBe('hashedpassword123'); // Mocked hash
                        expect(createdUser.createdAt).toBeInstanceOf(Date);
                        expect(createdUser._id).toBeDefined();
                        expect(typeof createdUser._id).toBe('string');
                        return [2 /*return*/];
                }
            });
        }); });
        test('should hash password before saving', function () { return __awaiter(void 0, void 0, void 0, function () {
            var username, password, createdUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_1.User.deleteMany({})];
                    case 1:
                        _a.sent();
                        mockedHashPassword.mockClear();
                        mockedHashPassword.mockResolvedValue('newhashedpassword');
                        username = 'newuser';
                        password = 'plainpassword';
                        return [4 /*yield*/, userServices.createUser(username, password)];
                    case 2:
                        createdUser = _a.sent();
                        expect(mockedHashPassword).toHaveBeenCalledWith(password);
                        expect(mockedHashPassword).toHaveBeenCalledTimes(1);
                        expect(createdUser.password).toBe('newhashedpassword');
                        return [2 /*return*/];
                }
            });
        }); });
        test('should fail to create user with duplicate username', function () { return __awaiter(void 0, void 0, void 0, function () {
            var username, password;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = 'testuser';
                        password = 'anotherpassword';
                        // The duplicate username should cause a MongoDB duplicate key error
                        return [4 /*yield*/, expect(userServices.createUser(username, password)).rejects.toThrow(/duplicate key|E11000/)];
                    case 1:
                        // The duplicate username should cause a MongoDB duplicate key error
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should persist user to database', function () { return __awaiter(void 0, void 0, void 0, function () {
            var username, password, createdUser, foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_1.User.deleteMany({})];
                    case 1:
                        _a.sent();
                        username = 'persisteduser';
                        password = 'password';
                        return [4 /*yield*/, userServices.createUser(username, password)];
                    case 2:
                        createdUser = _a.sent();
                        return [4 /*yield*/, user_1.User.findById(createdUser._id)];
                    case 3:
                        foundUser = _a.sent();
                        expect(foundUser).not.toBeNull();
                        expect(foundUser.username).toBe(username);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should set createdAt to current time', function () { return __awaiter(void 0, void 0, void 0, function () {
            var beforeCreate, createdUser, afterCreate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_1.User.deleteMany({})];
                    case 1:
                        _a.sent();
                        beforeCreate = new Date();
                        return [4 /*yield*/, userServices.createUser('timeuser', 'password')];
                    case 2:
                        createdUser = _a.sent();
                        afterCreate = new Date();
                        expect(createdUser.createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
                        expect(createdUser.createdAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
                        return [2 /*return*/];
                }
            });
        }); });
        test('should fail with empty username', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(userServices.createUser('', 'password')).rejects.toThrow()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should fail with empty password', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_1.User.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expect(userServices.createUser('validuser', '')).rejects.toThrow()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should handle hashing errors gracefully', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_1.User.deleteMany({})];
                    case 1:
                        _a.sent();
                        mockedHashPassword.mockRejectedValue(new Error('Hash error'));
                        return [4 /*yield*/, expect(userServices.createUser('erroruser', 'password')).rejects.toThrow('Hash error')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
