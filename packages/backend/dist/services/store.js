import { Store } from "@backend/src/models/store";
export async function findAllStores() {
    return Store.find();
}
export async function findStoreById(id) {
    return Store.findById(id);
}
export async function findStoreByName(name) {
    return Store.findOne({ name });
}
export async function createStore(info) {
    const store = new Store(info);
    // @ts-expect-error: .save() doesn't add _id to the type.
    return await store.save();
}
