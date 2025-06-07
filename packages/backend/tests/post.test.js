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
var post_1 = require("../src/models/post");
var user_1 = require("../src/models/user");
var mongoose_1 = require("mongoose");
var post_2 = require("../src/services/post");
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoose_1.default.connect(process.env.MONGO_TEST_URI)];
            case 1:
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
describe('Post Schema Tests', function () {
    var testUserId;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var testUser, savedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testUser = new user_1.User({
                        username: 'schematest_user',
                        password: 'password123'
                    });
                    return [4 /*yield*/, testUser.save()];
                case 1:
                    savedUser = _a.sent();
                    testUserId = savedUser._id;
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Schema Validation', function () {
        test('should create post with valid data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postData, post, savedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'This is a test post description',
                            comments: []
                        };
                        post = new post_1.Post(postData);
                        return [4 /*yield*/, post.save()];
                    case 1:
                        savedPost = _a.sent();
                        expect(savedPost.author).toEqual(testUserId);
                        expect(savedPost.mainImageUrl).toBe('https://example.com/image.jpg');
                        expect(savedPost.description).toBe('This is a test post description');
                        expect(savedPost.comments).toEqual([]);
                        expect(savedPost.createdAt).toBeInstanceOf(Date);
                        expect(savedPost._id).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should require author field', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postData, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postData = {
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'This is a test post description'
                            // missing author
                        };
                        post = new post_1.Post(postData);
                        return [4 /*yield*/, expect(post.save()).rejects.toThrow()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should require mainImageUrl field', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postData, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postData = {
                            author: testUserId,
                            description: 'This is a test post description'
                            // missing mainImageUrl
                        };
                        post = new post_1.Post(postData);
                        return [4 /*yield*/, expect(post.save()).rejects.toThrow()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should require description field', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postData, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg'
                            // missing description
                        };
                        post = new post_1.Post(postData);
                        return [4 /*yield*/, expect(post.save()).rejects.toThrow()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should set createdAt to current date by default', function () { return __awaiter(void 0, void 0, void 0, function () {
            var beforeCreate, post, savedPost, afterCreate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        beforeCreate = new Date();
                        post = new post_1.Post({
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Test description'
                        });
                        return [4 /*yield*/, post.save()];
                    case 1:
                        savedPost = _a.sent();
                        afterCreate = new Date();
                        expect(savedPost.createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
                        expect(savedPost.createdAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
                        return [2 /*return*/];
                }
            });
        }); });
        test('should set comments to empty array by default', function () { return __awaiter(void 0, void 0, void 0, function () {
            var post, savedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        post = new post_1.Post({
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Test description'
                        });
                        return [4 /*yield*/, post.save()];
                    case 1:
                        savedPost = _a.sent();
                        expect(savedPost.comments).toEqual([]);
                        expect(Array.isArray(savedPost.comments)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Comment Schema Validation', function () {
        test('should create post with valid comments', function () { return __awaiter(void 0, void 0, void 0, function () {
            var commentData, postData, post, savedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        commentData = {
                            author: testUserId,
                            content: 'This is a test comment',
                            createdAt: new Date()
                        };
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Test description',
                            comments: [commentData]
                        };
                        post = new post_1.Post(postData);
                        return [4 /*yield*/, post.save()];
                    case 1:
                        savedPost = _a.sent();
                        expect(savedPost.comments).toHaveLength(1);
                        expect(savedPost.comments[0].author).toEqual(testUserId);
                        expect(savedPost.comments[0].content).toBe('This is a test comment');
                        expect(savedPost.comments[0].createdAt).toBeInstanceOf(Date);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should require comment author field', function () { return __awaiter(void 0, void 0, void 0, function () {
            var invalidCommentData, postData, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invalidCommentData = {
                            content: 'This is a test comment'
                            // missing author
                        };
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Test description',
                            comments: [invalidCommentData]
                        };
                        post = new post_1.Post(postData);
                        return [4 /*yield*/, expect(post.save()).rejects.toThrow()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should require comment content field', function () { return __awaiter(void 0, void 0, void 0, function () {
            var invalidCommentData, postData, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invalidCommentData = {
                            author: testUserId
                            // missing content
                        };
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Test description',
                            comments: [invalidCommentData]
                        };
                        post = new post_1.Post(postData);
                        return [4 /*yield*/, expect(post.save()).rejects.toThrow()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should set comment createdAt to current date by default', function () { return __awaiter(void 0, void 0, void 0, function () {
            var beforeCreate, commentData, postData, post, savedPost, afterCreate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        beforeCreate = new Date();
                        commentData = {
                            author: testUserId,
                            content: 'This is a test comment'
                            // createdAt should default
                        };
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Test description',
                            comments: [commentData]
                        };
                        post = new post_1.Post(postData);
                        return [4 /*yield*/, post.save()];
                    case 1:
                        savedPost = _a.sent();
                        afterCreate = new Date();
                        expect(savedPost.comments[0].createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
                        expect(savedPost.comments[0].createdAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
                        return [2 /*return*/];
                }
            });
        }); });
        test('should allow multiple comments', function () { return __awaiter(void 0, void 0, void 0, function () {
            var secondUser, secondUserId, comments, postData, post, savedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        secondUser = new user_1.User({
                            username: 'seconduser',
                            password: 'password123'
                        });
                        return [4 /*yield*/, secondUser.save()];
                    case 1:
                        secondUserId = (_a.sent())._id;
                        comments = [
                            {
                                author: testUserId,
                                content: 'First comment'
                            },
                            {
                                author: secondUserId,
                                content: 'Second comment'
                            },
                            {
                                author: testUserId,
                                content: 'Third comment'
                            }
                        ];
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Test description',
                            comments: comments
                        };
                        post = new post_1.Post(postData);
                        return [4 /*yield*/, post.save()];
                    case 2:
                        savedPost = _a.sent();
                        expect(savedPost.comments).toHaveLength(3);
                        expect(savedPost.comments[0].content).toBe('First comment');
                        expect(savedPost.comments[1].content).toBe('Second comment');
                        expect(savedPost.comments[2].content).toBe('Third comment');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Model Methods', function () {
        test('should create post instance with correct schema', function () {
            var postData = {
                author: testUserId,
                mainImageUrl: 'https://example.com/image.jpg',
                description: 'Test description'
            };
            var post = new post_1.Post(postData);
            expect(post).toBeInstanceOf(post_1.Post);
            expect(post.author).toEqual(testUserId);
            expect(post.mainImageUrl).toBe('https://example.com/image.jpg');
            expect(post.description).toBe('Test description');
            expect(post.createdAt).toBeInstanceOf(Date);
            expect(Array.isArray(post.comments)).toBe(true);
        });
        test('should handle ObjectId references correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postData, post, savedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Test description'
                        };
                        post = new post_1.Post(postData);
                        return [4 /*yield*/, post.save()];
                    case 1:
                        savedPost = _a.sent();
                        expect(savedPost.author).toBeInstanceOf(mongoose_1.default.Types.ObjectId);
                        expect(savedPost.author.toString()).toBe(testUserId.toString());
                        return [2 /*return*/];
                }
            });
        }); });
        test('should populate author field correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postData, post, savedPost, populatedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Test description'
                        };
                        post = new post_1.Post(postData);
                        return [4 /*yield*/, post.save()];
                    case 1:
                        savedPost = _a.sent();
                        return [4 /*yield*/, post_1.Post.findById(savedPost._id).populate('author')];
                    case 2:
                        populatedPost = _a.sent();
                        expect(populatedPost === null || populatedPost === void 0 ? void 0 : populatedPost.author).toBeDefined();
                        // @ts-expect-error - populated field changes type
                        expect(populatedPost === null || populatedPost === void 0 ? void 0 : populatedPost.author.username).toBe('schematest_user');
                        return [2 /*return*/];
                }
            });
        }); });
        test('should populate comment authors correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var commentData, postData, post, savedPost, populatedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        commentData = {
                            author: testUserId,
                            content: 'Test comment'
                        };
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Test description',
                            comments: [commentData]
                        };
                        post = new post_1.Post(postData);
                        return [4 /*yield*/, post.save()];
                    case 1:
                        savedPost = _a.sent();
                        return [4 /*yield*/, post_1.Post.findById(savedPost._id)
                                .populate('author')
                                .populate('comments.author')];
                    case 2:
                        populatedPost = _a.sent();
                        expect(populatedPost === null || populatedPost === void 0 ? void 0 : populatedPost.comments[0].author).toBeDefined();
                        // @ts-expect-error - populated field changes type
                        expect(populatedPost === null || populatedPost === void 0 ? void 0 : populatedPost.comments[0].author.username).toBe('schematest_user');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Database Operations', function () {
        test('should update post successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postData, post, savedPost, updatedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Original description'
                        };
                        post = new post_1.Post(postData);
                        return [4 /*yield*/, post.save()];
                    case 1:
                        savedPost = _a.sent();
                        savedPost.description = 'Updated description';
                        savedPost.mainImageUrl = 'https://example.com/updated-image.jpg';
                        return [4 /*yield*/, savedPost.save()];
                    case 2:
                        updatedPost = _a.sent();
                        expect(updatedPost.description).toBe('Updated description');
                        expect(updatedPost.mainImageUrl).toBe('https://example.com/updated-image.jpg');
                        expect(updatedPost._id).toEqual(savedPost._id);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should delete post successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postData, post, savedPost, postId, deletedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Test description'
                        };
                        post = new post_1.Post(postData);
                        return [4 /*yield*/, post.save()];
                    case 1:
                        savedPost = _a.sent();
                        postId = savedPost._id;
                        return [4 /*yield*/, post_1.Post.findByIdAndDelete(postId)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, post_1.Post.findById(postId)];
                    case 3:
                        deletedPost = _a.sent();
                        expect(deletedPost).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should find posts by author', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postsData, foundPosts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postsData = [
                            {
                                author: testUserId,
                                mainImageUrl: 'https://example.com/image1.jpg',
                                description: 'First post'
                            },
                            {
                                author: testUserId,
                                mainImageUrl: 'https://example.com/image2.jpg',
                                description: 'Second post'
                            }
                        ];
                        return [4 /*yield*/, post_1.Post.insertMany(postsData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, post_1.Post.find({ author: testUserId })];
                    case 2:
                        foundPosts = _a.sent();
                        expect(foundPosts).toHaveLength(2);
                        expect(foundPosts[0].author).toEqual(testUserId);
                        expect(foundPosts[1].author).toEqual(testUserId);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
describe("Post Services Tests", function () {
    var testUserId;
    var secondUserId;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var testUser, savedUser, secondUser, savedSecondUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testUser = new user_1.User({
                        username: 'servicetest_user',
                        password: 'password123'
                    });
                    return [4 /*yield*/, testUser.save()];
                case 1:
                    savedUser = _a.sent();
                    testUserId = savedUser._id;
                    secondUser = new user_1.User({
                        username: 'servicetest_seconduser',
                        password: 'password456'
                    });
                    return [4 /*yield*/, secondUser.save()];
                case 2:
                    savedSecondUser = _a.sent();
                    secondUserId = savedSecondUser._id;
                    return [2 /*return*/];
            }
        });
    }); });
    describe('findAllPosts', function () {
        test('should return empty array when no posts exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, post_2.findAllPosts)()];
                    case 1:
                        posts = _a.sent();
                        expect(posts).toEqual([]);
                        expect(Array.isArray(posts)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return all posts with populated author and comments', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postsData, posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postsData = [
                            {
                                author: testUserId,
                                mainImageUrl: 'https://example.com/image1.jpg',
                                description: 'First post',
                                comments: [{
                                        author: secondUserId,
                                        content: 'Great post!'
                                    }]
                            },
                            {
                                author: secondUserId,
                                mainImageUrl: 'https://example.com/image2.jpg',
                                description: 'Second post',
                                comments: []
                            }
                        ];
                        return [4 /*yield*/, post_1.Post.insertMany(postsData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, post_2.findAllPosts)()];
                    case 2:
                        posts = _a.sent();
                        expect(posts).toHaveLength(2);
                        // Check that authors are populated
                        expect(posts[0].author).toHaveProperty('username');
                        expect(posts[1].author).toHaveProperty('username');
                        // Check that comment authors are populated
                        expect(posts[0].comments[0].author).toHaveProperty('username');
                        return [2 /*return*/];
                }
            });
        }); });
        test('should handle posts with multiple comments', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postData, posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Post with multiple comments',
                            comments: [
                                {
                                    author: testUserId,
                                    content: 'First comment'
                                },
                                {
                                    author: secondUserId,
                                    content: 'Second comment'
                                }
                            ]
                        };
                        return [4 /*yield*/, post_1.Post.create(postData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, post_2.findAllPosts)()];
                    case 2:
                        posts = _a.sent();
                        expect(posts).toHaveLength(1);
                        expect(posts[0].comments).toHaveLength(2);
                        expect(posts[0].comments[0].author).toHaveProperty('username');
                        expect(posts[0].comments[1].author).toHaveProperty('username');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('findPostById', function () {
        test('should return null for non-existent post ID', function () { return __awaiter(void 0, void 0, void 0, function () {
            var nonExistentId, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nonExistentId = new mongoose_1.default.Types.ObjectId().toString();
                        return [4 /*yield*/, (0, post_2.findPostById)(nonExistentId)];
                    case 1:
                        post = _a.sent();
                        expect(post).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return post with populated author and comments for valid ID', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postData, createdPost, foundPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Test post',
                            comments: [{
                                    author: secondUserId,
                                    content: 'Nice post!'
                                }]
                        };
                        return [4 /*yield*/, post_1.Post.create(postData)];
                    case 1:
                        createdPost = _a.sent();
                        return [4 /*yield*/, (0, post_2.findPostById)(createdPost._id.toString())];
                    case 2:
                        foundPost = _a.sent();
                        expect(foundPost).not.toBeNull();
                        expect(foundPost._id.toString()).toBe(createdPost._id.toString());
                        expect(foundPost.author).toHaveProperty('username');
                        expect(foundPost.comments[0].author).toHaveProperty('username');
                        return [2 /*return*/];
                }
            });
        }); });
        test('should handle invalid ObjectId format', function () { return __awaiter(void 0, void 0, void 0, function () {
            var invalidId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invalidId = 'invalid-id';
                        return [4 /*yield*/, expect((0, post_2.findPostById)(invalidId)).rejects.toThrow()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return post with empty comments array', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postData, createdPost, foundPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Post without comments'
                        };
                        return [4 /*yield*/, post_1.Post.create(postData)];
                    case 1:
                        createdPost = _a.sent();
                        return [4 /*yield*/, (0, post_2.findPostById)(createdPost._id.toString())];
                    case 2:
                        foundPost = _a.sent();
                        expect(foundPost).not.toBeNull();
                        expect(foundPost.comments).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('findPostsByAuthor', function () {
        test('should return empty array for author with no posts', function () { return __awaiter(void 0, void 0, void 0, function () {
            var posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, post_2.findPostsByAuthor)(testUserId)];
                    case 1:
                        posts = _a.sent();
                        expect(posts).toEqual([]);
                        expect(Array.isArray(posts)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return all posts by specific author with populated data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postsData, posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postsData = [
                            {
                                author: testUserId,
                                mainImageUrl: 'https://example.com/image1.jpg',
                                description: 'First post by testuser',
                                comments: [{
                                        author: secondUserId,
                                        content: 'Comment on first post'
                                    }]
                            },
                            {
                                author: testUserId,
                                mainImageUrl: 'https://example.com/image2.jpg',
                                description: 'Second post by testuser'
                            },
                            {
                                author: secondUserId,
                                mainImageUrl: 'https://example.com/image3.jpg',
                                description: 'Post by different user'
                            }
                        ];
                        return [4 /*yield*/, post_1.Post.insertMany(postsData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, post_2.findPostsByAuthor)(testUserId)];
                    case 2:
                        posts = _a.sent();
                        expect(posts).toHaveLength(2);
                        // Verify all posts belong to the correct author
                        posts.forEach(function (post) {
                            var _a;
                            // @ts-expect-error - populated field changes type
                            expect((_a = post.author._id) === null || _a === void 0 ? void 0 : _a.toString()).toBe(testUserId.toString());
                            expect(post.author).toHaveProperty('username');
                        });
                        // Check populated comment authors
                        expect(posts[0].comments[0].author).toHaveProperty('username');
                        return [2 /*return*/];
                }
            });
        }); });
        test('should not return posts from other authors', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postsData, posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postsData = [
                            {
                                author: secondUserId,
                                mainImageUrl: 'https://example.com/image1.jpg',
                                description: 'Post by second user'
                            },
                            {
                                author: secondUserId,
                                mainImageUrl: 'https://example.com/image2.jpg',
                                description: 'Another post by second user'
                            }
                        ];
                        return [4 /*yield*/, post_1.Post.insertMany(postsData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, post_2.findPostsByAuthor)(testUserId)];
                    case 2:
                        posts = _a.sent();
                        expect(posts).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should handle author with posts containing multiple comments', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postData, posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Post with multiple comments',
                            comments: [
                                {
                                    author: testUserId,
                                    content: 'Self comment'
                                },
                                {
                                    author: secondUserId,
                                    content: 'Comment from another user'
                                }
                            ]
                        };
                        return [4 /*yield*/, post_1.Post.create(postData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, post_2.findPostsByAuthor)(testUserId)];
                    case 2:
                        posts = _a.sent();
                        expect(posts).toHaveLength(1);
                        expect(posts[0].comments).toHaveLength(2);
                        expect(posts[0].comments[0].author).toHaveProperty('username');
                        expect(posts[0].comments[1].author).toHaveProperty('username');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('createPost', function () {
        test('should create post with valid data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postData, createdPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Test post description'
                        };
                        return [4 /*yield*/, (0, post_2.createPost)(postData)];
                    case 1:
                        createdPost = _a.sent();
                        expect(createdPost).toBeDefined();
                        expect(createdPost._id).toBeDefined();
                        expect(createdPost.author.toString()).toBe(testUserId.toString());
                        expect(createdPost.mainImageUrl).toBe('https://example.com/image.jpg');
                        expect(createdPost.description).toBe('Test post description');
                        expect(createdPost.createdAt).toBeInstanceOf(Date);
                        expect(createdPost.comments).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should create post with comments', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postData, createdPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Post with initial comments',
                            comments: [
                                {
                                    author: secondUserId,
                                    content: 'First comment',
                                    createdAt: new Date()
                                },
                                {
                                    author: testUserId,
                                    content: 'Second comment',
                                    createdAt: new Date()
                                }
                            ]
                        };
                        return [4 /*yield*/, (0, post_2.createPost)(postData)];
                    case 1:
                        createdPost = _a.sent();
                        expect(createdPost).toBeDefined();
                        expect(createdPost._id).toBeDefined();
                        expect(createdPost.comments).toHaveLength(2);
                        expect(createdPost.comments[0].content).toBe('First comment');
                        expect(createdPost.comments[1].content).toBe('Second comment');
                        expect(createdPost.comments[0].author.toString()).toBe(secondUserId.toString());
                        expect(createdPost.comments[1].author.toString()).toBe(testUserId.toString());
                        return [2 /*return*/];
                }
            });
        }); });
        test('should fail to create post with missing required fields', function () { return __awaiter(void 0, void 0, void 0, function () {
            var invalidPostData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invalidPostData = {
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Missing author field'
                            // missing author
                        };
                        // @ts-expect-error - the data is intentionally invalid
                        return [4 /*yield*/, expect((0, post_2.createPost)(invalidPostData)).rejects.toThrow()];
                    case 1:
                        // @ts-expect-error - the data is intentionally invalid
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should fail to create post with invalid author ObjectId', function () { return __awaiter(void 0, void 0, void 0, function () {
            var invalidPostData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invalidPostData = {
                            author: 'invalid-object-id',
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Invalid author ID'
                        };
                        // @ts-expect-error - the data is intentionally invalid
                        return [4 /*yield*/, expect((0, post_2.createPost)(invalidPostData)).rejects.toThrow()];
                    case 1:
                        // @ts-expect-error - the data is intentionally invalid
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should set default values correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postData, createdPost, now, timeDiff;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Test description',
                        };
                        return [4 /*yield*/, (0, post_2.createPost)(postData)];
                    case 1:
                        createdPost = _a.sent();
                        expect(createdPost.comments).toEqual([]);
                        expect(createdPost.createdAt).toBeInstanceOf(Date);
                        now = new Date();
                        timeDiff = now.getTime() - createdPost.createdAt.getTime();
                        expect(timeDiff).toBeLessThan(5000);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should persist post to database', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postData, createdPost, foundPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postData = {
                            author: testUserId,
                            mainImageUrl: 'https://example.com/image.jpg',
                            description: 'Persistence test',
                            createdAt: new Date(),
                            comments: []
                        };
                        return [4 /*yield*/, (0, post_2.createPost)(postData)];
                    case 1:
                        createdPost = _a.sent();
                        return [4 /*yield*/, post_1.Post.findById(createdPost._id)];
                    case 2:
                        foundPost = _a.sent();
                        expect(foundPost).not.toBeNull();
                        expect(foundPost.description).toBe('Persistence test');
                        expect(foundPost.author.toString()).toBe(testUserId.toString());
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
