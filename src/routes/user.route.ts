const express = require("express");
const router = express.Router();
const userController = require("../Controller/user.controller");

//Admin Login Route
//router.post("/AdminlogIn",adminController.adminAccess);
//User Register Route
router.post("/signUp",userController.saveUserData);
//User Login Route
router.post("/logIn",userController.userLogin);
//Products Insert Route
router.post("/product", userController.productDetails);

module.exports =router;