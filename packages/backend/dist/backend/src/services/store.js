"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllStores = findAllStores;
exports.findStoreById = findStoreById;
exports.findStoreByName = findStoreByName;
exports.createStore = createStore;
const store_1 = require("../models/store");
async function findAllStores() {
    return store_1.Store.find();
}
async function findStoreById(id) {
    return store_1.Store.findById(id);
}
async function findStoreByName(name) {
    return store_1.Store.findOne({ name });
}
async function createStore(info) {
    const store = new store_1.Store(info);
    return await store.save();
}
