"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const notification_model_1 = require("../models/notification.model");
const product_model_1 = require("../models/product.model");
//Register User
let saveUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { firstName, lastName, email, password, phone } = req.body;
        //Below commented code is used to Encrypt Password
        let salt = yield bcrypt.genSalt();
        let bcryptPassword = yield bcrypt.hash(password, salt);
        // console.log("bcryptPassword",bcryptPassword);
        let UserData = {
            userID: Date.now(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: bcryptPassword,
            phone: phone,
        };
        console.log(UserData);
        //Inserts User Data into the User Model
        new user_model_1.userModel(UserData)
            .save()
            .then((data) => {
            res
                .status(200)
                .json({ message: "Successfully Inserted User data", data });
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
//Admin Login Controller
function adminAccess(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { userType, password } = req.body;
            //Below code is used to Encrypt Password
            let salt = yield bcrypt.genSalt();
            let bcryptPassword = yield bcrypt.hash(password, salt);
            // console.log("bcryptPassword",bcryptPassword);
            let adminData = {
                userType: userType,
                bcryptPassword: bcryptPassword,
            };
            console.log(adminAccess);
            //Inserts User Data into the User Model
            new user_model_1.userModel(adminAccess)
                .save()
                .then((adminData) => {
                res.status(200).json({ message: "Successfully Login", adminData });
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
}
//Login Controller
let userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let Email = req.body.Email;
        const password = req.body.password;
        let userEmail = yield user_model_1.userModel.find({ Email: Email });
        let dbPassword = userEmail[0].password;
        if (userEmail[0].email == Email) {
            //comparing both Passwords
            bcrypt.compare(password, password, (err, data) => {
                console.log(password, "User Password");
            });
        }
    }
    catch (Error) {
        console.log(Error);
        res.status(500).json({ message: "internal Server Error" });
    }
});
//Below Controller Used to send Notification To User
let notifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let jwtUserID = req.body.userID;
        console.log("jwtUserID", jwtUserID);
        let notifications = yield [jwtUserID];
        new notification_model_1.notificationmodel(notifications)
            .save()
            .then((data) => {
            res
                .status(200)
                .json({ message: "You Have Following Notifications", data });
        })
            .catch((err) => {
            res.status(400).json({ message: "Access Denied", err });
        });
    }
    catch (error) {
        console.log("error in notifications", error);
        res
            .status(500)
            .json({ message: "500 internal server error", error: error });
    }
});
//Products Insert Controller 
let productDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
module.exports = {
    saveUserData: saveUserData,
    adminAccess: adminAccess,
    userLogin: userLogin,
    notifications: notifications,
    productDetails: productDetails,
};
