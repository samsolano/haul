"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//MONGOOSE SCHEMA
const storeSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    websiteUrl: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    address: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
});
exports.Store = mongoose_1.default.model("Store", storeSchema, "Stores");
