"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productmodel = void 0;
const mongoose = require("mongoose");
let product = new mongoose.Schema({
    productID: {
        type: Number
    },
    productName: {
        type: String,
        require: true
    },
    price: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        require: false
    }
});
const productmodel = mongoose.model("productData", product);
exports.productmodel = productmodel;
