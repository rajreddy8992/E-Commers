"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const mongo_url = "mongodb://127.0.0.1/Ecommers";
mongoose_1.default.connect(mongo_url).then(() => {
    console.log("MongoDB Connected");
}).catch((error) => {
    console.log((error));
});
