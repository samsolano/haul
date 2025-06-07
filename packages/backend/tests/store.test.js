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
var store_1 = require("../src/models/store");
var mongoose_1 = require("mongoose");
var store_2 = require("../src/services/store");
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
describe('Store Schema Tests', function () {
    describe('Schema Validation', function () {
        test('should create store with valid required data only', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, store, savedStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'Test Store'
                        };
                        store = new store_1.Store(storeData);
                        return [4 /*yield*/, store.save()];
                    case 1:
                        savedStore = _a.sent();
                        expect(savedStore.name).toBe('Test Store');
                        expect(savedStore.description).toBeUndefined();
                        expect(savedStore.websiteUrl).toBeUndefined();
                        expect(savedStore.phoneNumber).toBeUndefined();
                        expect(savedStore.address).toBeUndefined();
                        expect(savedStore.createdAt).toBeInstanceOf(Date);
                        expect(savedStore._id).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should create store with all fields populated', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, store, savedStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'Complete Test Store',
                            description: 'This is a comprehensive test store description',
                            websiteUrl: 'https://teststore.com',
                            phoneNumber: '+1-555-123-4567',
                            address: '123 Main Street, Test City, TC 12345'
                        };
                        store = new store_1.Store(storeData);
                        return [4 /*yield*/, store.save()];
                    case 1:
                        savedStore = _a.sent();
                        expect(savedStore.name).toBe('Complete Test Store');
                        expect(savedStore.description).toBe('This is a comprehensive test store description');
                        expect(savedStore.websiteUrl).toBe('https://teststore.com');
                        expect(savedStore.phoneNumber).toBe('+1-555-123-4567');
                        expect(savedStore.address).toBe('123 Main Street, Test City, TC 12345');
                        expect(savedStore.createdAt).toBeInstanceOf(Date);
                        expect(savedStore._id).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should require name field', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, store;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            description: 'Store without name',
                            websiteUrl: 'https://example.com'
                            // missing name
                        };
                        store = new store_1.Store(storeData);
                        return [4 /*yield*/, expect(store.save()).rejects.toThrow()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should enforce unique name constraint', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, store1, store2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'Unique Store Name',
                            description: 'First store'
                        };
                        store1 = new store_1.Store(storeData);
                        return [4 /*yield*/, store1.save()];
                    case 1:
                        _a.sent();
                        store2 = new store_1.Store({
                            name: 'Unique Store Name',
                            description: 'Second store with duplicate name'
                        });
                        return [4 /*yield*/, expect(store2.save()).rejects.toThrow()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should set createdAt to current date by default', function () { return __awaiter(void 0, void 0, void 0, function () {
            var beforeCreate, store, savedStore, afterCreate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        beforeCreate = new Date();
                        store = new store_1.Store({
                            name: 'Date Test Store'
                        });
                        return [4 /*yield*/, store.save()];
                    case 1:
                        savedStore = _a.sent();
                        afterCreate = new Date();
                        expect(savedStore.createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
                        expect(savedStore.createdAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
                        return [2 /*return*/];
                }
            });
        }); });
        test('should allow empty optional fields', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, store, savedStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'Minimal Store',
                            description: '',
                            websiteUrl: '',
                            phoneNumber: '',
                            address: ''
                        };
                        store = new store_1.Store(storeData);
                        return [4 /*yield*/, store.save()];
                    case 1:
                        savedStore = _a.sent();
                        expect(savedStore.name).toBe('Minimal Store');
                        expect(savedStore.description).toBe('');
                        expect(savedStore.websiteUrl).toBe('');
                        expect(savedStore.phoneNumber).toBe('');
                        expect(savedStore.address).toBe('');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Field Validation', function () {
        test('should accept valid website URLs', function () { return __awaiter(void 0, void 0, void 0, function () {
            var validUrls, _i, validUrls_1, url, store, savedStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validUrls = [
                            'https://example.com',
                            'http://store.com',
                            'https://www.mystore.org',
                            'https://subdomain.store.co.uk'
                        ];
                        _i = 0, validUrls_1 = validUrls;
                        _a.label = 1;
                    case 1:
                        if (!(_i < validUrls_1.length)) return [3 /*break*/, 5];
                        url = validUrls_1[_i];
                        store = new store_1.Store({
                            name: "Store ".concat(url),
                            websiteUrl: url
                        });
                        return [4 /*yield*/, store.save()];
                    case 2:
                        savedStore = _a.sent();
                        expect(savedStore.websiteUrl).toBe(url);
                        // Clean up for next iteration
                        return [4 /*yield*/, store_1.Store.deleteMany({})];
                    case 3:
                        // Clean up for next iteration
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        test('should accept various phone number formats', function () { return __awaiter(void 0, void 0, void 0, function () {
            var validPhoneNumbers, _i, validPhoneNumbers_1, phoneNumber, store, savedStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validPhoneNumbers = [
                            '+1-555-123-4567',
                            '(555) 123-4567',
                            '555.123.4567',
                            '15551234567',
                            '+44 20 7946 0958'
                        ];
                        _i = 0, validPhoneNumbers_1 = validPhoneNumbers;
                        _a.label = 1;
                    case 1:
                        if (!(_i < validPhoneNumbers_1.length)) return [3 /*break*/, 5];
                        phoneNumber = validPhoneNumbers_1[_i];
                        store = new store_1.Store({
                            name: "Store ".concat(phoneNumber),
                            phoneNumber: phoneNumber
                        });
                        return [4 /*yield*/, store.save()];
                    case 2:
                        savedStore = _a.sent();
                        expect(savedStore.phoneNumber).toBe(phoneNumber);
                        // Clean up for next iteration
                        return [4 /*yield*/, store_1.Store.deleteMany({})];
                    case 3:
                        // Clean up for next iteration
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        test('should accept various address formats', function () { return __awaiter(void 0, void 0, void 0, function () {
            var validAddresses, _i, validAddresses_1, address, store, savedStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validAddresses = [
                            '123 Main St, City, State 12345',
                            'Suite 100, 456 Corporate Blvd, Business Park, CA 90210',
                            '789 International Ave, Unit B, London, UK',
                            'PO Box 123, Small Town, MT 59718'
                        ];
                        _i = 0, validAddresses_1 = validAddresses;
                        _a.label = 1;
                    case 1:
                        if (!(_i < validAddresses_1.length)) return [3 /*break*/, 5];
                        address = validAddresses_1[_i];
                        store = new store_1.Store({
                            name: "Store ".concat(address.substring(0, 10)),
                            address: address
                        });
                        return [4 /*yield*/, store.save()];
                    case 2:
                        savedStore = _a.sent();
                        expect(savedStore.address).toBe(address);
                        // Clean up for next iteration
                        return [4 /*yield*/, store_1.Store.deleteMany({})];
                    case 3:
                        // Clean up for next iteration
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Model Methods', function () {
        test('should create store instance with correct schema', function () {
            var storeData = {
                name: 'Instance Test Store',
                description: 'Test description',
                websiteUrl: 'https://test.com',
                phoneNumber: '555-0123',
                address: '123 Test St'
            };
            var store = new store_1.Store(storeData);
            expect(store).toBeInstanceOf(store_1.Store);
            expect(store.name).toBe('Instance Test Store');
            expect(store.description).toBe('Test description');
            expect(store.websiteUrl).toBe('https://test.com');
            expect(store.phoneNumber).toBe('555-0123');
            expect(store.address).toBe('123 Test St');
            expect(store.createdAt).toBeInstanceOf(Date);
        });
        test('should handle undefined optional fields correctly', function () {
            var storeData = {
                name: 'Minimal Store'
                // all optional fields omitted
            };
            var store = new store_1.Store(storeData);
            expect(store.name).toBe('Minimal Store');
            expect(store.description).toBeUndefined();
            expect(store.websiteUrl).toBeUndefined();
            expect(store.phoneNumber).toBeUndefined();
            expect(store.address).toBeUndefined();
            expect(store.createdAt).toBeInstanceOf(Date);
        });
    });
    describe('Database Operations', function () {
        test('should update store successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, store, savedStore, updatedStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'Original Store',
                            description: 'Original description'
                        };
                        store = new store_1.Store(storeData);
                        return [4 /*yield*/, store.save()];
                    case 1:
                        savedStore = _a.sent();
                        savedStore.name = 'Updated Store';
                        savedStore.description = 'Updated description';
                        savedStore.websiteUrl = 'https://updated.com';
                        savedStore.phoneNumber = '555-9999';
                        savedStore.address = '999 Updated St';
                        return [4 /*yield*/, savedStore.save()];
                    case 2:
                        updatedStore = _a.sent();
                        expect(updatedStore.name).toBe('Updated Store');
                        expect(updatedStore.description).toBe('Updated description');
                        expect(updatedStore.websiteUrl).toBe('https://updated.com');
                        expect(updatedStore.phoneNumber).toBe('555-9999');
                        expect(updatedStore.address).toBe('999 Updated St');
                        expect(updatedStore._id).toEqual(savedStore._id);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should delete store successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, store, savedStore, storeId, deletedStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'Store to Delete',
                            description: 'This store will be deleted'
                        };
                        store = new store_1.Store(storeData);
                        return [4 /*yield*/, store.save()];
                    case 1:
                        savedStore = _a.sent();
                        storeId = savedStore._id;
                        return [4 /*yield*/, store_1.Store.findByIdAndDelete(storeId)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, store_1.Store.findById(storeId)];
                    case 3:
                        deletedStore = _a.sent();
                        expect(deletedStore).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should find store by name', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storesData, foundStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storesData = [
                            {
                                name: 'First Store',
                                description: 'First store description'
                            },
                            {
                                name: 'Second Store',
                                description: 'Second store description'
                            }
                        ];
                        return [4 /*yield*/, store_1.Store.insertMany(storesData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, store_1.Store.findOne({ name: 'First Store' })];
                    case 2:
                        foundStore = _a.sent();
                        expect(foundStore).not.toBeNull();
                        expect(foundStore === null || foundStore === void 0 ? void 0 : foundStore.name).toBe('First Store');
                        expect(foundStore === null || foundStore === void 0 ? void 0 : foundStore.description).toBe('First store description');
                        return [2 /*return*/];
                }
            });
        }); });
        test('should find all stores', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storesData, allStores;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storesData = [
                            {
                                name: 'Store One',
                                description: 'First store'
                            },
                            {
                                name: 'Store Two',
                                description: 'Second store'
                            },
                            {
                                name: 'Store Three',
                                description: 'Third store'
                            }
                        ];
                        return [4 /*yield*/, store_1.Store.insertMany(storesData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, store_1.Store.find()];
                    case 2:
                        allStores = _a.sent();
                        expect(allStores).toHaveLength(3);
                        expect(allStores.map(function (s) { return s.name; })).toContain('Store One');
                        expect(allStores.map(function (s) { return s.name; })).toContain('Store Two');
                        expect(allStores.map(function (s) { return s.name; })).toContain('Store Three');
                        return [2 /*return*/];
                }
            });
        }); });
        test('should update only specific fields', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, store, savedStore, updatedStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'Partial Update Store',
                            description: 'Original description',
                            websiteUrl: 'https://original.com',
                            phoneNumber: '555-0000',
                            address: 'Original Address'
                        };
                        store = new store_1.Store(storeData);
                        return [4 /*yield*/, store.save()];
                    case 1:
                        savedStore = _a.sent();
                        // Update only some fields
                        return [4 /*yield*/, store_1.Store.findByIdAndUpdate(savedStore._id, {
                                description: 'Updated description',
                                phoneNumber: '555-1111'
                            })];
                    case 2:
                        // Update only some fields
                        _a.sent();
                        return [4 /*yield*/, store_1.Store.findById(savedStore._id)];
                    case 3:
                        updatedStore = _a.sent();
                        expect(updatedStore === null || updatedStore === void 0 ? void 0 : updatedStore.name).toBe('Partial Update Store'); // unchanged
                        expect(updatedStore === null || updatedStore === void 0 ? void 0 : updatedStore.description).toBe('Updated description'); // changed
                        expect(updatedStore === null || updatedStore === void 0 ? void 0 : updatedStore.websiteUrl).toBe('https://original.com'); // unchanged
                        expect(updatedStore === null || updatedStore === void 0 ? void 0 : updatedStore.phoneNumber).toBe('555-1111'); // changed
                        expect(updatedStore === null || updatedStore === void 0 ? void 0 : updatedStore.address).toBe('Original Address'); // unchanged
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Edge Cases', function () {
        test('should handle very long strings in fields', function () { return __awaiter(void 0, void 0, void 0, function () {
            var longString, storeData, store, savedStore;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        longString = 'A'.repeat(1000);
                        storeData = {
                            name: 'Long Content Store',
                            description: longString,
                            websiteUrl: 'https://example.com',
                            phoneNumber: '555-0123',
                            address: longString
                        };
                        store = new store_1.Store(storeData);
                        return [4 /*yield*/, store.save()];
                    case 1:
                        savedStore = _c.sent();
                        expect(savedStore.description).toBe(longString);
                        expect(savedStore.address).toBe(longString);
                        expect((_a = savedStore.description) === null || _a === void 0 ? void 0 : _a.length).toBe(1000);
                        expect((_b = savedStore.address) === null || _b === void 0 ? void 0 : _b.length).toBe(1000);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should handle special characters in fields', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, store, savedStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'Special Store™ & Co. (2024)',
                            description: 'Description with émojis 🏪 and symbols: @#$%^&*()',
                            websiteUrl: 'https://special-store.com',
                            phoneNumber: '+1-(555)-123-4567 ext. 890',
                            address: '123 Main St., Apt. #4B, Somewhere, ST 12345-6789'
                        };
                        store = new store_1.Store(storeData);
                        return [4 /*yield*/, store.save()];
                    case 1:
                        savedStore = _a.sent();
                        expect(savedStore.name).toBe('Special Store™ & Co. (2024)');
                        expect(savedStore.description).toBe('Description with émojis 🏪 and symbols: @#$%^&*()');
                        expect(savedStore.phoneNumber).toBe('+1-(555)-123-4567 ext. 890');
                        expect(savedStore.address).toBe('123 Main St., Apt. #4B, Somewhere, ST 12345-6789');
                        return [2 /*return*/];
                }
            });
        }); });
        test('should handle case sensitivity in names', function () { return __awaiter(void 0, void 0, void 0, function () {
            var store1, store2, store3, allStores, names;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        store1 = new store_1.Store({ name: 'Test Store' });
                        store2 = new store_1.Store({ name: 'test store' });
                        store3 = new store_1.Store({ name: 'TEST STORE' });
                        return [4 /*yield*/, store1.save()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, store2.save()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, store3.save()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, store_1.Store.find()];
                    case 4:
                        allStores = _a.sent();
                        expect(allStores).toHaveLength(3);
                        names = allStores.map(function (s) { return s.name; });
                        expect(names).toContain('Test Store');
                        expect(names).toContain('test store');
                        expect(names).toContain('TEST STORE');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
describe("Store Services Tests", function () {
    describe('findAllStores', function () {
        test('should return empty array when no stores exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var stores;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, store_2.findAllStores)()];
                    case 1:
                        stores = _a.sent();
                        expect(stores).toEqual([]);
                        expect(Array.isArray(stores)).toBe(true);
                        expect(stores).toHaveLength(0);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return all stores when stores exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storesData, stores;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storesData = [
                            {
                                name: 'Store One',
                                description: 'First store description',
                                websiteUrl: 'https://store1.com',
                                phoneNumber: '555-0001',
                                address: '123 Store St, City, ST 12345'
                            },
                            {
                                name: 'Store Two',
                                description: 'Second store description',
                                websiteUrl: 'https://store2.com',
                                phoneNumber: '555-0002',
                                address: '456 Store Ave, City, ST 12346'
                            },
                            {
                                name: 'Store Three',
                                description: 'Third store description'
                            }
                        ];
                        return [4 /*yield*/, store_1.Store.insertMany(storesData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, store_2.findAllStores)()];
                    case 2:
                        stores = _a.sent();
                        expect(stores).toHaveLength(3);
                        expect(stores.map(function (s) { return s.name; })).toContain('Store One');
                        expect(stores.map(function (s) { return s.name; })).toContain('Store Two');
                        expect(stores.map(function (s) { return s.name; })).toContain('Store Three');
                        // Check that all stores have required fields
                        stores.forEach(function (store) {
                            expect(store._id).toBeDefined();
                            expect(store.name).toBeDefined();
                            expect(store.createdAt).toBeInstanceOf(Date);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return stores with all field types correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, stores, store;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'Complete Store',
                            description: 'A store with all fields',
                            websiteUrl: 'https://completestore.com',
                            phoneNumber: '+1-555-123-4567',
                            address: '789 Complete St, Complete City, CC 12347'
                        };
                        return [4 /*yield*/, store_1.Store.create(storeData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, store_2.findAllStores)()];
                    case 2:
                        stores = _a.sent();
                        expect(stores).toHaveLength(1);
                        store = stores[0];
                        expect(store.name).toBe('Complete Store');
                        expect(store.description).toBe('A store with all fields');
                        expect(store.websiteUrl).toBe('https://completestore.com');
                        expect(store.phoneNumber).toBe('+1-555-123-4567');
                        expect(store.address).toBe('789 Complete St, Complete City, CC 12347');
                        expect(store._id).toBeDefined();
                        expect(store.createdAt).toBeInstanceOf(Date);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('findStoreById', function () {
        test('should return null for non-existent store ID', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakeId, store;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fakeId = new mongoose_1.default.Types.ObjectId();
                        return [4 /*yield*/, (0, store_2.findStoreById)(fakeId.toString())];
                    case 1:
                        store = _a.sent();
                        expect(store).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return store for valid ID', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, createdStore, foundStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'Test Store for ID',
                            description: 'Store to test ID lookup',
                            websiteUrl: 'https://teststore.com',
                            phoneNumber: '555-TEST',
                            address: 'Test Address'
                        };
                        return [4 /*yield*/, store_1.Store.create(storeData)];
                    case 1:
                        createdStore = _a.sent();
                        return [4 /*yield*/, (0, store_2.findStoreById)(createdStore._id.toString())];
                    case 2:
                        foundStore = _a.sent();
                        expect(foundStore).not.toBeNull();
                        expect(foundStore._id).toEqual(createdStore._id);
                        expect(foundStore.name).toBe('Test Store for ID');
                        expect(foundStore.description).toBe('Store to test ID lookup');
                        expect(foundStore.websiteUrl).toBe('https://teststore.com');
                        expect(foundStore.phoneNumber).toBe('555-TEST');
                        expect(foundStore.address).toBe('Test Address');
                        expect(foundStore.createdAt).toBeInstanceOf(Date);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should handle invalid ObjectId format', function () { return __awaiter(void 0, void 0, void 0, function () {
            var invalidId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invalidId = 'invalid-object-id';
                        return [4 /*yield*/, expect((0, store_2.findStoreById)(invalidId)).rejects.toThrow()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return store with minimal data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var minimalStoreData, createdStore, foundStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        minimalStoreData = {
                            name: 'Minimal Store'
                        };
                        return [4 /*yield*/, store_1.Store.create(minimalStoreData)];
                    case 1:
                        createdStore = _a.sent();
                        return [4 /*yield*/, (0, store_2.findStoreById)(createdStore._id.toString())];
                    case 2:
                        foundStore = _a.sent();
                        expect(foundStore).not.toBeNull();
                        expect(foundStore.name).toBe('Minimal Store');
                        expect(foundStore.description).toBeUndefined();
                        expect(foundStore.websiteUrl).toBeUndefined();
                        expect(foundStore.phoneNumber).toBeUndefined();
                        expect(foundStore.address).toBeUndefined();
                        expect(foundStore._id).toEqual(createdStore._id);
                        expect(foundStore.createdAt).toBeInstanceOf(Date);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('findStoreByName', function () {
        test('should return null for non-existent store name', function () { return __awaiter(void 0, void 0, void 0, function () {
            var store;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, store_2.findStoreByName)('Non-existent Store')];
                    case 1:
                        store = _a.sent();
                        expect(store).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return store for exact name match', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, foundStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'Exact Match Store',
                            description: 'Store to test exact name matching',
                            websiteUrl: 'https://exactmatch.com'
                        };
                        return [4 /*yield*/, store_1.Store.create(storeData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, store_2.findStoreByName)('Exact Match Store')];
                    case 2:
                        foundStore = _a.sent();
                        expect(foundStore).not.toBeNull();
                        expect(foundStore.name).toBe('Exact Match Store');
                        expect(foundStore.description).toBe('Store to test exact name matching');
                        expect(foundStore.websiteUrl).toBe('https://exactmatch.com');
                        expect(foundStore._id).toBeDefined();
                        expect(foundStore.createdAt).toBeInstanceOf(Date);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should be case sensitive for name matching', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, exactMatch, lowerCaseMatch, upperCaseMatch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'Case Sensitive Store'
                        };
                        return [4 /*yield*/, store_1.Store.create(storeData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, store_2.findStoreByName)('Case Sensitive Store')];
                    case 2:
                        exactMatch = _a.sent();
                        return [4 /*yield*/, (0, store_2.findStoreByName)('case sensitive store')];
                    case 3:
                        lowerCaseMatch = _a.sent();
                        return [4 /*yield*/, (0, store_2.findStoreByName)('CASE SENSITIVE STORE')];
                    case 4:
                        upperCaseMatch = _a.sent();
                        expect(exactMatch).not.toBeNull();
                        expect(lowerCaseMatch).toBeNull();
                        expect(upperCaseMatch).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return first match if multiple stores exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storesData, foundStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storesData = [
                            { name: 'First Store' },
                            { name: 'Second Store' },
                            { name: 'Third Store' }
                        ];
                        return [4 /*yield*/, store_1.Store.insertMany(storesData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, store_2.findStoreByName)('Second Store')];
                    case 2:
                        foundStore = _a.sent();
                        expect(foundStore).not.toBeNull();
                        expect(foundStore.name).toBe('Second Store');
                        return [2 /*return*/];
                }
            });
        }); });
        test('should not match partial names', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, partialMatch, anotherPartialMatch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'Complete Store Name'
                        };
                        return [4 /*yield*/, store_1.Store.create(storeData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, store_2.findStoreByName)('Complete')];
                    case 2:
                        partialMatch = _a.sent();
                        return [4 /*yield*/, (0, store_2.findStoreByName)('Store')];
                    case 3:
                        anotherPartialMatch = _a.sent();
                        expect(partialMatch).toBeNull();
                        expect(anotherPartialMatch).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('createStore', function () {
        test('should create store with valid minimal data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, createdStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'New Minimal Store',
                            createdAt: new Date()
                        };
                        return [4 /*yield*/, (0, store_2.createStore)(storeData)];
                    case 1:
                        createdStore = _a.sent();
                        expect(createdStore).toBeDefined();
                        expect(createdStore._id).toBeDefined();
                        expect(createdStore.name).toBe('New Minimal Store');
                        expect(createdStore.description).toBeUndefined();
                        expect(createdStore.websiteUrl).toBeUndefined();
                        expect(createdStore.phoneNumber).toBeUndefined();
                        expect(createdStore.address).toBeUndefined();
                        expect(createdStore.createdAt).toBeInstanceOf(Date);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should create store with all fields', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, createdStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'Complete New Store',
                            description: 'A comprehensive store with all fields',
                            websiteUrl: 'https://completenewstore.com',
                            phoneNumber: '+1-555-999-8888',
                            address: '999 New Store Blvd, New City, NC 99999',
                            createdAt: new Date()
                        };
                        return [4 /*yield*/, (0, store_2.createStore)(storeData)];
                    case 1:
                        createdStore = _a.sent();
                        expect(createdStore).toBeDefined();
                        expect(createdStore._id).toBeDefined();
                        expect(createdStore.name).toBe('Complete New Store');
                        expect(createdStore.description).toBe('A comprehensive store with all fields');
                        expect(createdStore.websiteUrl).toBe('https://completenewstore.com');
                        expect(createdStore.phoneNumber).toBe('+1-555-999-8888');
                        expect(createdStore.address).toBe('999 New Store Blvd, New City, NC 99999');
                        expect(createdStore.createdAt).toBeInstanceOf(Date);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should fail to create store with missing required fields', function () { return __awaiter(void 0, void 0, void 0, function () {
            var invalidStoreData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invalidStoreData = {
                            description: 'Store without name',
                            websiteUrl: 'https://noname.com'
                        };
                        return [4 /*yield*/, expect((0, store_2.createStore)(invalidStoreData)).rejects.toThrow()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should fail to create store with duplicate name', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, duplicateStoreData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'Unique Store Name',
                            description: 'First store',
                            createdAt: new Date()
                        };
                        // Create first store
                        return [4 /*yield*/, (0, store_2.createStore)(storeData)];
                    case 1:
                        // Create first store
                        _a.sent();
                        duplicateStoreData = {
                            name: 'Unique Store Name',
                            description: 'Second store with duplicate name',
                            createdAt: new Date()
                        };
                        return [4 /*yield*/, expect((0, store_2.createStore)(duplicateStoreData)).rejects.toThrow()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('should set default values correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, createdStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'Default Values Store',
                            createdAt: new Date()
                        };
                        return [4 /*yield*/, (0, store_2.createStore)(storeData)];
                    case 1:
                        createdStore = _a.sent();
                        expect(createdStore.name).toBe('Default Values Store');
                        expect(createdStore.description).toBeUndefined();
                        expect(createdStore.websiteUrl).toBeUndefined();
                        expect(createdStore.phoneNumber).toBeUndefined();
                        expect(createdStore.address).toBeUndefined();
                        expect(createdStore.createdAt).toBeInstanceOf(Date);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should persist store to database', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, createdStore, foundStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'Persistence Test Store',
                            description: 'Store to test database persistence',
                            createdAt: new Date()
                        };
                        return [4 /*yield*/, (0, store_2.createStore)(storeData)];
                    case 1:
                        createdStore = _a.sent();
                        return [4 /*yield*/, store_1.Store.findById(createdStore._id)];
                    case 2:
                        foundStore = _a.sent();
                        expect(foundStore).not.toBeNull();
                        expect(foundStore.name).toBe('Persistence Test Store');
                        expect(foundStore.description).toBe('Store to test database persistence');
                        expect(foundStore._id).toEqual(createdStore._id);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should handle special characters in store data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, createdStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'Special Characters Store™ & Co. (2024)',
                            description: 'Store with émojis 🏪 and symbols: @#$%^&*()',
                            websiteUrl: 'https://special-store.com',
                            phoneNumber: '+1-(555)-123-4567 ext. 890',
                            address: '123 Main St., Apt. #4B, Somewhere, ST 12345-6789',
                            createdAt: new Date()
                        };
                        return [4 /*yield*/, (0, store_2.createStore)(storeData)];
                    case 1:
                        createdStore = _a.sent();
                        expect(createdStore.name).toBe('Special Characters Store™ & Co. (2024)');
                        expect(createdStore.description).toBe('Store with émojis 🏪 and symbols: @#$%^&*()');
                        expect(createdStore.phoneNumber).toBe('+1-(555)-123-4567 ext. 890');
                        expect(createdStore.address).toBe('123 Main St., Apt. #4B, Somewhere, ST 12345-6789');
                        return [2 /*return*/];
                }
            });
        }); });
        test('should handle empty optional fields', function () { return __awaiter(void 0, void 0, void 0, function () {
            var storeData, createdStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeData = {
                            name: 'Empty Fields Store',
                            description: '',
                            websiteUrl: '',
                            phoneNumber: '',
                            address: '',
                            createdAt: new Date()
                        };
                        return [4 /*yield*/, (0, store_2.createStore)(storeData)];
                    case 1:
                        createdStore = _a.sent();
                        expect(createdStore.name).toBe('Empty Fields Store');
                        expect(createdStore.description).toBe('');
                        expect(createdStore.websiteUrl).toBe('');
                        expect(createdStore.phoneNumber).toBe('');
                        expect(createdStore.address).toBe('');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
