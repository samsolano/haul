import { Store } from "@backend/src/models/store";
import mongoose from 'mongoose';
import { findAllStores, findStoreById, findStoreByName, createStore } from "@backend/src/services/store";
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_TEST_URI);
});
beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});
afterAll(async () => {
    await mongoose.connection.close();
});
describe('Store Schema Tests', () => {
    describe('Schema Validation', () => {
        test('should create store with valid required data only', async () => {
            const storeData = {
                name: 'Test Store'
            };
            const store = new Store(storeData);
            const savedStore = await store.save();
            expect(savedStore.name).toBe('Test Store');
            expect(savedStore.description).toBeUndefined();
            expect(savedStore.websiteUrl).toBeUndefined();
            expect(savedStore.phoneNumber).toBeUndefined();
            expect(savedStore.address).toBeUndefined();
            expect(savedStore.createdAt).toBeInstanceOf(Date);
            expect(savedStore._id).toBeDefined();
        });
        test('should create store with all fields populated', async () => {
            const storeData = {
                name: 'Complete Test Store',
                description: 'This is a comprehensive test store description',
                websiteUrl: 'https://teststore.com',
                phoneNumber: '+1-555-123-4567',
                address: '123 Main Street, Test City, TC 12345'
            };
            const store = new Store(storeData);
            const savedStore = await store.save();
            expect(savedStore.name).toBe('Complete Test Store');
            expect(savedStore.description).toBe('This is a comprehensive test store description');
            expect(savedStore.websiteUrl).toBe('https://teststore.com');
            expect(savedStore.phoneNumber).toBe('+1-555-123-4567');
            expect(savedStore.address).toBe('123 Main Street, Test City, TC 12345');
            expect(savedStore.createdAt).toBeInstanceOf(Date);
            expect(savedStore._id).toBeDefined();
        });
        test('should require name field', async () => {
            const storeData = {
                description: 'Store without name',
                websiteUrl: 'https://example.com'
                // missing name
            };
            const store = new Store(storeData);
            await expect(store.save()).rejects.toThrow();
        });
        test('should enforce unique name constraint', async () => {
            const storeData = {
                name: 'Unique Store Name',
                description: 'First store'
            };
            // Create first store
            const store1 = new Store(storeData);
            await store1.save();
            // Try to create second store with same name
            const store2 = new Store({
                name: 'Unique Store Name',
                description: 'Second store with duplicate name'
            });
            await expect(store2.save()).rejects.toThrow();
        });
        test('should set createdAt to current date by default', async () => {
            const beforeCreate = new Date();
            const store = new Store({
                name: 'Date Test Store'
            });
            const savedStore = await store.save();
            const afterCreate = new Date();
            expect(savedStore.createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
            expect(savedStore.createdAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
        });
        test('should allow empty optional fields', async () => {
            const storeData = {
                name: 'Minimal Store',
                description: '',
                websiteUrl: '',
                phoneNumber: '',
                address: ''
            };
            const store = new Store(storeData);
            const savedStore = await store.save();
            expect(savedStore.name).toBe('Minimal Store');
            expect(savedStore.description).toBe('');
            expect(savedStore.websiteUrl).toBe('');
            expect(savedStore.phoneNumber).toBe('');
            expect(savedStore.address).toBe('');
        });
    });
    describe('Field Validation', () => {
        test('should accept valid website URLs', async () => {
            const validUrls = [
                'https://example.com',
                'http://store.com',
                'https://www.mystore.org',
                'https://subdomain.store.co.uk'
            ];
            for (const url of validUrls) {
                const store = new Store({
                    name: `Store ${url}`,
                    websiteUrl: url
                });
                const savedStore = await store.save();
                expect(savedStore.websiteUrl).toBe(url);
                // Clean up for next iteration
                await Store.deleteMany({});
            }
        });
        test('should accept various phone number formats', async () => {
            const validPhoneNumbers = [
                '+1-555-123-4567',
                '(555) 123-4567',
                '555.123.4567',
                '15551234567',
                '+44 20 7946 0958'
            ];
            for (const phoneNumber of validPhoneNumbers) {
                const store = new Store({
                    name: `Store ${phoneNumber}`,
                    phoneNumber: phoneNumber
                });
                const savedStore = await store.save();
                expect(savedStore.phoneNumber).toBe(phoneNumber);
                // Clean up for next iteration
                await Store.deleteMany({});
            }
        });
        test('should accept various address formats', async () => {
            const validAddresses = [
                '123 Main St, City, State 12345',
                'Suite 100, 456 Corporate Blvd, Business Park, CA 90210',
                '789 International Ave, Unit B, London, UK',
                'PO Box 123, Small Town, MT 59718'
            ];
            for (const address of validAddresses) {
                const store = new Store({
                    name: `Store ${address.substring(0, 10)}`,
                    address: address
                });
                const savedStore = await store.save();
                expect(savedStore.address).toBe(address);
                // Clean up for next iteration
                await Store.deleteMany({});
            }
        });
    });
    describe('Model Methods', () => {
        test('should create store instance with correct schema', () => {
            const storeData = {
                name: 'Instance Test Store',
                description: 'Test description',
                websiteUrl: 'https://test.com',
                phoneNumber: '555-0123',
                address: '123 Test St'
            };
            const store = new Store(storeData);
            expect(store).toBeInstanceOf(Store);
            expect(store.name).toBe('Instance Test Store');
            expect(store.description).toBe('Test description');
            expect(store.websiteUrl).toBe('https://test.com');
            expect(store.phoneNumber).toBe('555-0123');
            expect(store.address).toBe('123 Test St');
            expect(store.createdAt).toBeInstanceOf(Date);
        });
        test('should handle undefined optional fields correctly', () => {
            const storeData = {
                name: 'Minimal Store'
                // all optional fields omitted
            };
            const store = new Store(storeData);
            expect(store.name).toBe('Minimal Store');
            expect(store.description).toBeUndefined();
            expect(store.websiteUrl).toBeUndefined();
            expect(store.phoneNumber).toBeUndefined();
            expect(store.address).toBeUndefined();
            expect(store.createdAt).toBeInstanceOf(Date);
        });
    });
    describe('Database Operations', () => {
        test('should update store successfully', async () => {
            const storeData = {
                name: 'Original Store',
                description: 'Original description'
            };
            const store = new Store(storeData);
            const savedStore = await store.save();
            savedStore.name = 'Updated Store';
            savedStore.description = 'Updated description';
            savedStore.websiteUrl = 'https://updated.com';
            savedStore.phoneNumber = '555-9999';
            savedStore.address = '999 Updated St';
            const updatedStore = await savedStore.save();
            expect(updatedStore.name).toBe('Updated Store');
            expect(updatedStore.description).toBe('Updated description');
            expect(updatedStore.websiteUrl).toBe('https://updated.com');
            expect(updatedStore.phoneNumber).toBe('555-9999');
            expect(updatedStore.address).toBe('999 Updated St');
            expect(updatedStore._id).toEqual(savedStore._id);
        });
        test('should delete store successfully', async () => {
            const storeData = {
                name: 'Store to Delete',
                description: 'This store will be deleted'
            };
            const store = new Store(storeData);
            const savedStore = await store.save();
            const storeId = savedStore._id;
            await Store.findByIdAndDelete(storeId);
            const deletedStore = await Store.findById(storeId);
            expect(deletedStore).toBeNull();
        });
        test('should find store by name', async () => {
            const storesData = [
                {
                    name: 'First Store',
                    description: 'First store description'
                },
                {
                    name: 'Second Store',
                    description: 'Second store description'
                }
            ];
            await Store.insertMany(storesData);
            const foundStore = await Store.findOne({ name: 'First Store' });
            expect(foundStore).not.toBeNull();
            expect(foundStore?.name).toBe('First Store');
            expect(foundStore?.description).toBe('First store description');
        });
        test('should find all stores', async () => {
            const storesData = [
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
            await Store.insertMany(storesData);
            const allStores = await Store.find();
            expect(allStores).toHaveLength(3);
            expect(allStores.map(s => s.name)).toContain('Store One');
            expect(allStores.map(s => s.name)).toContain('Store Two');
            expect(allStores.map(s => s.name)).toContain('Store Three');
        });
        test('should update only specific fields', async () => {
            const storeData = {
                name: 'Partial Update Store',
                description: 'Original description',
                websiteUrl: 'https://original.com',
                phoneNumber: '555-0000',
                address: 'Original Address'
            };
            const store = new Store(storeData);
            const savedStore = await store.save();
            // Update only some fields
            await Store.findByIdAndUpdate(savedStore._id, {
                description: 'Updated description',
                phoneNumber: '555-1111'
            });
            const updatedStore = await Store.findById(savedStore._id);
            expect(updatedStore?.name).toBe('Partial Update Store'); // unchanged
            expect(updatedStore?.description).toBe('Updated description'); // changed
            expect(updatedStore?.websiteUrl).toBe('https://original.com'); // unchanged
            expect(updatedStore?.phoneNumber).toBe('555-1111'); // changed
            expect(updatedStore?.address).toBe('Original Address'); // unchanged
        });
    });
    describe('Edge Cases', () => {
        test('should handle very long strings in fields', async () => {
            const longString = 'A'.repeat(1000);
            const storeData = {
                name: 'Long Content Store',
                description: longString,
                websiteUrl: 'https://example.com',
                phoneNumber: '555-0123',
                address: longString
            };
            const store = new Store(storeData);
            const savedStore = await store.save();
            expect(savedStore.description).toBe(longString);
            expect(savedStore.address).toBe(longString);
            expect(savedStore.description?.length).toBe(1000);
            expect(savedStore.address?.length).toBe(1000);
        });
        test('should handle special characters in fields', async () => {
            const storeData = {
                name: 'Special Store™ & Co. (2024)',
                description: 'Description with émojis 🏪 and symbols: @#$%^&*()',
                websiteUrl: 'https://special-store.com',
                phoneNumber: '+1-(555)-123-4567 ext. 890',
                address: '123 Main St., Apt. #4B, Somewhere, ST 12345-6789'
            };
            const store = new Store(storeData);
            const savedStore = await store.save();
            expect(savedStore.name).toBe('Special Store™ & Co. (2024)');
            expect(savedStore.description).toBe('Description with émojis 🏪 and symbols: @#$%^&*()');
            expect(savedStore.phoneNumber).toBe('+1-(555)-123-4567 ext. 890');
            expect(savedStore.address).toBe('123 Main St., Apt. #4B, Somewhere, ST 12345-6789');
        });
        test('should handle case sensitivity in names', async () => {
            const store1 = new Store({ name: 'Test Store' });
            const store2 = new Store({ name: 'test store' });
            const store3 = new Store({ name: 'TEST STORE' });
            await store1.save();
            await store2.save();
            await store3.save();
            const allStores = await Store.find();
            expect(allStores).toHaveLength(3);
            const names = allStores.map(s => s.name);
            expect(names).toContain('Test Store');
            expect(names).toContain('test store');
            expect(names).toContain('TEST STORE');
        });
    });
});
describe("Store Services Tests", () => {
    describe('findAllStores', () => {
        test('should return empty array when no stores exist', async () => {
            const stores = await findAllStores();
            expect(stores).toEqual([]);
            expect(Array.isArray(stores)).toBe(true);
            expect(stores).toHaveLength(0);
        });
        test('should return all stores when stores exist', async () => {
            const storesData = [
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
            await Store.insertMany(storesData);
            const stores = await findAllStores();
            expect(stores).toHaveLength(3);
            expect(stores.map(s => s.name)).toContain('Store One');
            expect(stores.map(s => s.name)).toContain('Store Two');
            expect(stores.map(s => s.name)).toContain('Store Three');
            // Check that all stores have required fields
            stores.forEach(store => {
                expect(store._id).toBeDefined();
                expect(store.name).toBeDefined();
                expect(store.createdAt).toBeInstanceOf(Date);
            });
        });
        test('should return stores with all field types correctly', async () => {
            const storeData = {
                name: 'Complete Store',
                description: 'A store with all fields',
                websiteUrl: 'https://completestore.com',
                phoneNumber: '+1-555-123-4567',
                address: '789 Complete St, Complete City, CC 12347'
            };
            await Store.create(storeData);
            const stores = await findAllStores();
            expect(stores).toHaveLength(1);
            const store = stores[0];
            expect(store.name).toBe('Complete Store');
            expect(store.description).toBe('A store with all fields');
            expect(store.websiteUrl).toBe('https://completestore.com');
            expect(store.phoneNumber).toBe('+1-555-123-4567');
            expect(store.address).toBe('789 Complete St, Complete City, CC 12347');
            expect(store._id).toBeDefined();
            expect(store.createdAt).toBeInstanceOf(Date);
        });
    });
    describe('findStoreById', () => {
        test('should return null for non-existent store ID', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const store = await findStoreById(fakeId.toString());
            expect(store).toBeNull();
        });
        test('should return store for valid ID', async () => {
            const storeData = {
                name: 'Test Store for ID',
                description: 'Store to test ID lookup',
                websiteUrl: 'https://teststore.com',
                phoneNumber: '555-TEST',
                address: 'Test Address'
            };
            const createdStore = await Store.create(storeData);
            const foundStore = await findStoreById(createdStore._id.toString());
            expect(foundStore).not.toBeNull();
            expect(foundStore._id).toEqual(createdStore._id);
            expect(foundStore.name).toBe('Test Store for ID');
            expect(foundStore.description).toBe('Store to test ID lookup');
            expect(foundStore.websiteUrl).toBe('https://teststore.com');
            expect(foundStore.phoneNumber).toBe('555-TEST');
            expect(foundStore.address).toBe('Test Address');
            expect(foundStore.createdAt).toBeInstanceOf(Date);
        });
        test('should handle invalid ObjectId format', async () => {
            const invalidId = 'invalid-object-id';
            await expect(findStoreById(invalidId)).rejects.toThrow();
        });
        test('should return store with minimal data', async () => {
            const minimalStoreData = {
                name: 'Minimal Store'
            };
            const createdStore = await Store.create(minimalStoreData);
            const foundStore = await findStoreById(createdStore._id.toString());
            expect(foundStore).not.toBeNull();
            expect(foundStore.name).toBe('Minimal Store');
            expect(foundStore.description).toBeUndefined();
            expect(foundStore.websiteUrl).toBeUndefined();
            expect(foundStore.phoneNumber).toBeUndefined();
            expect(foundStore.address).toBeUndefined();
            expect(foundStore._id).toEqual(createdStore._id);
            expect(foundStore.createdAt).toBeInstanceOf(Date);
        });
    });
    describe('findStoreByName', () => {
        test('should return null for non-existent store name', async () => {
            const store = await findStoreByName('Non-existent Store');
            expect(store).toBeNull();
        });
        test('should return store for exact name match', async () => {
            const storeData = {
                name: 'Exact Match Store',
                description: 'Store to test exact name matching',
                websiteUrl: 'https://exactmatch.com'
            };
            await Store.create(storeData);
            const foundStore = await findStoreByName('Exact Match Store');
            expect(foundStore).not.toBeNull();
            expect(foundStore.name).toBe('Exact Match Store');
            expect(foundStore.description).toBe('Store to test exact name matching');
            expect(foundStore.websiteUrl).toBe('https://exactmatch.com');
            expect(foundStore._id).toBeDefined();
            expect(foundStore.createdAt).toBeInstanceOf(Date);
        });
        test('should be case sensitive for name matching', async () => {
            const storeData = {
                name: 'Case Sensitive Store'
            };
            await Store.create(storeData);
            const exactMatch = await findStoreByName('Case Sensitive Store');
            const lowerCaseMatch = await findStoreByName('case sensitive store');
            const upperCaseMatch = await findStoreByName('CASE SENSITIVE STORE');
            expect(exactMatch).not.toBeNull();
            expect(lowerCaseMatch).toBeNull();
            expect(upperCaseMatch).toBeNull();
        });
        test('should return first match if multiple stores exist', async () => {
            const storesData = [
                { name: 'First Store' },
                { name: 'Second Store' },
                { name: 'Third Store' }
            ];
            await Store.insertMany(storesData);
            const foundStore = await findStoreByName('Second Store');
            expect(foundStore).not.toBeNull();
            expect(foundStore.name).toBe('Second Store');
        });
        test('should not match partial names', async () => {
            const storeData = {
                name: 'Complete Store Name'
            };
            await Store.create(storeData);
            const partialMatch = await findStoreByName('Complete');
            const anotherPartialMatch = await findStoreByName('Store');
            expect(partialMatch).toBeNull();
            expect(anotherPartialMatch).toBeNull();
        });
    });
    describe('createStore', () => {
        test('should create store with valid minimal data', async () => {
            const storeData = {
                name: 'New Minimal Store',
                createdAt: new Date()
            };
            const createdStore = await createStore(storeData);
            expect(createdStore).toBeDefined();
            expect(createdStore._id).toBeDefined();
            expect(createdStore.name).toBe('New Minimal Store');
            expect(createdStore.description).toBeUndefined();
            expect(createdStore.websiteUrl).toBeUndefined();
            expect(createdStore.phoneNumber).toBeUndefined();
            expect(createdStore.address).toBeUndefined();
            expect(createdStore.createdAt).toBeInstanceOf(Date);
        });
        test('should create store with all fields', async () => {
            const storeData = {
                name: 'Complete New Store',
                description: 'A comprehensive store with all fields',
                websiteUrl: 'https://completenewstore.com',
                phoneNumber: '+1-555-999-8888',
                address: '999 New Store Blvd, New City, NC 99999',
                createdAt: new Date()
            };
            const createdStore = await createStore(storeData);
            expect(createdStore).toBeDefined();
            expect(createdStore._id).toBeDefined();
            expect(createdStore.name).toBe('Complete New Store');
            expect(createdStore.description).toBe('A comprehensive store with all fields');
            expect(createdStore.websiteUrl).toBe('https://completenewstore.com');
            expect(createdStore.phoneNumber).toBe('+1-555-999-8888');
            expect(createdStore.address).toBe('999 New Store Blvd, New City, NC 99999');
            expect(createdStore.createdAt).toBeInstanceOf(Date);
        });
        test('should fail to create store with missing required fields', async () => {
            const invalidStoreData = {
                description: 'Store without name',
                websiteUrl: 'https://noname.com'
            };
            await expect(createStore(invalidStoreData)).rejects.toThrow();
        });
        test('should fail to create store with duplicate name', async () => {
            const storeData = {
                name: 'Unique Store Name',
                description: 'First store',
                createdAt: new Date()
            };
            // Create first store
            await createStore(storeData);
            // Try to create second store with same name
            const duplicateStoreData = {
                name: 'Unique Store Name',
                description: 'Second store with duplicate name',
                createdAt: new Date()
            };
            await expect(createStore(duplicateStoreData)).rejects.toThrow();
        });
        test('should set default values correctly', async () => {
            const storeData = {
                name: 'Default Values Store',
                createdAt: new Date()
            };
            const createdStore = await createStore(storeData);
            expect(createdStore.name).toBe('Default Values Store');
            expect(createdStore.description).toBeUndefined();
            expect(createdStore.websiteUrl).toBeUndefined();
            expect(createdStore.phoneNumber).toBeUndefined();
            expect(createdStore.address).toBeUndefined();
            expect(createdStore.createdAt).toBeInstanceOf(Date);
        });
        test('should persist store to database', async () => {
            const storeData = {
                name: 'Persistence Test Store',
                description: 'Store to test database persistence',
                createdAt: new Date()
            };
            const createdStore = await createStore(storeData);
            // Verify the store was actually saved to the database
            const foundStore = await Store.findById(createdStore._id);
            expect(foundStore).not.toBeNull();
            expect(foundStore.name).toBe('Persistence Test Store');
            expect(foundStore.description).toBe('Store to test database persistence');
            expect(foundStore._id).toEqual(createdStore._id);
        });
        test('should handle special characters in store data', async () => {
            const storeData = {
                name: 'Special Characters Store™ & Co. (2024)',
                description: 'Store with émojis 🏪 and symbols: @#$%^&*()',
                websiteUrl: 'https://special-store.com',
                phoneNumber: '+1-(555)-123-4567 ext. 890',
                address: '123 Main St., Apt. #4B, Somewhere, ST 12345-6789',
                createdAt: new Date()
            };
            const createdStore = await createStore(storeData);
            expect(createdStore.name).toBe('Special Characters Store™ & Co. (2024)');
            expect(createdStore.description).toBe('Store with émojis 🏪 and symbols: @#$%^&*()');
            expect(createdStore.phoneNumber).toBe('+1-(555)-123-4567 ext. 890');
            expect(createdStore.address).toBe('123 Main St., Apt. #4B, Somewhere, ST 12345-6789');
        });
        test('should handle empty optional fields', async () => {
            const storeData = {
                name: 'Empty Fields Store',
                description: '',
                websiteUrl: '',
                phoneNumber: '',
                address: '',
                createdAt: new Date()
            };
            const createdStore = await createStore(storeData);
            expect(createdStore.name).toBe('Empty Fields Store');
            expect(createdStore.description).toBe('');
            expect(createdStore.websiteUrl).toBe('');
            expect(createdStore.phoneNumber).toBe('');
            expect(createdStore.address).toBe('');
        });
    });
});
