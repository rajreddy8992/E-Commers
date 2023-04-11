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
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("../models/product.model");
exports.productDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { productName, price, discount } = req.body;
        let productData = {
            productID: Date.now(),
            productName: productName,
            price: price,
            discount: discount,
        };
        new product_model_1.productmodel(productData)
            .save()
            .then((data) => {
            res
                .status(200)
                .json({ message: "Successfully Inserted Product data", data });
        })
            .catch((err) => {
            res.status(401).json({ message: "Access Denied", err });
        });
    }
    catch (Error) {
        console.log(Error);
        res.status(500).json({ message: "internal Server Error" });
    }
});
