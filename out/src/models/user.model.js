"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let user = new mongoose_1.default.Schema({
    userID: {
        type: Number
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: String
    },
    address: {
        type: Array
    },
    userType: {
        type: String,
    },
});
const userModel = mongoose_1.default.model("userData", user);
exports.userModel = userModel;
