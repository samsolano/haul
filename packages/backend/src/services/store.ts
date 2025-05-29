import { Store, type StoreWithId } from "../models/store";

export async function findAllStores(): Promise<StoreWithId[]> {
    return Store.find();
}

export async function findStoreById(id: string): Promise<StoreWithId | null> {
    return Store.findById(id);
}

export async function findStoreByName(name: string): Promise<StoreWithId | null> {
    return Store.findOne({ name });
}

export async function createStore(info: Store): Promise<StoreWithId> {
    const store = new Store(info);

    // @ts-expect-error: .save() doesn't add _id to the type.
    return await store.save();
}