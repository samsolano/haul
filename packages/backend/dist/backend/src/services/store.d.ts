import { Store, type StoreWithId } from "../models/store";
export declare function findAllStores(): Promise<StoreWithId[]>;
export declare function findStoreById(id: string): Promise<StoreWithId | null>;
export declare function findStoreByName(name: string): Promise<StoreWithId | null>;
export declare function createStore(info: Store): Promise<StoreWithId>;
