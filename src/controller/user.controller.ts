import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { userModel } from "../models/user.model";
import { notificationmodel } from "../models/notification.model";
import { productmodel } from '../models/product.model';
import { Admin } from "mongodb";

//Register User
let saveUserData = async (req: Request, res: Response) => {
  try {
    let { firstName, lastName, email, password, phone,userType } = req.body;
    //Below commented code is used to Encrypt Password
    let salt = await bcrypt.genSalt();
    let bcryptPassword = await bcrypt.hash(password, salt);
    // console.log("bcryptPassword",bcryptPassword);
    let UserData: object = {
      userID: Date.now(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: bcryptPassword,
      phone: phone,
      userType:userType,
    };
    console.log(UserData);
    //Inserts User Data into the User Model
    new userModel(UserData)
      .save()
      .then((data: object) => {
        res
          .status(200)
          .json({ message: "Successfully Inserted User data", data });
      })
      .catch((err: any) => {
        res.status(401).json({ message: "Access Denied", err });
      });
  } catch (Error: any) {
    console.log(Error);
    res.status(500).json({ message: "internal Server Error" });
  }
};

// //Admin Login Controller
// async function adminAccess(req: Request, res: Response) {
//   try {
//     let { userType, password } = req.body;
//     //Below code is used to Encrypt Password
//     let salt = await bcrypt.genSalt();
//     let bcryptPassword = await bcrypt.hash(password, salt);
//     // console.log("bcryptPassword",bcryptPassword);
//     let adminData: object = {
//       userType: userType,
//       bcryptPassword: bcryptPassword,
//     };
//     console.log(adminData);
//     //Inserts User Data into the User Model
//     new userModel(adminData)
//       .save()
//       .then((adminData: object) => {
//         res.status(200).json({ message: "Successfully Login", adminData });
//       })
//       .catch((err: any) => {
//         res.status(401).json({ message: "Access Denied", err });
//       });
//   } catch (Error: any) {
//     console.log(Error);
//     res.status(500).json({ message: "internal Server Error" });
//   }
// }

//Login Controller
let userLogin = async (req: Request, res: Response) => {
  try {
    let Email = req.body.Email;
    const password = req.body.password;
    let userType = req.body.userType;
    userModel.findOne({ Email: Email }).then(async (result:any) =>{
      //console.log(result)
      let isMatched = await bcrypt.compare(password, result.password);
      if(isMatched){
        if(userType === result.userType){
          res.status(200).json({ Message:`${userType} Login Successfully`,result});
        }else{
          res.status(403).json({ message: `Please login in ${userType} portal`,result });
        }
      }else{
      res.status(403).json({ message: "Password is incorrect" });
      } 
    }).catch((error:any) => {
      console.log(error);
    });
  } catch (Error: any) {
    console.log(Error);
    res.status(500).json({ message: "internal Server Error" });
  }
};
//Below Controller Used to send Notification To User
let notifications = async (req: Request, res: Response) => {
  try {
    let jwtUserID = req.body.userID;
    console.log("jwtUserID", jwtUserID);

    let notifications = await [jwtUserID];
    new notificationmodel(notifications)
      .save()
      .then((data: any) => {
        res
          .status(200)
          .json({ message: "You Have Following Notifications", data });
      })
      .catch((err: any) => {
        res.status(400).json({ message: "Access Denied", err });
      });
  } catch (error) {
    console.log("error in notifications", error);
    res
      .status(500)
      .json({ message: "500 internal server error", error: error });
  }
};

//Products Insert Controller 
let productDetails = async (req:Request, res:Response) => {
  try {
    let { productName, price, discount } = req.body;
    let productData = {
      productID: Date.now(),
      productName: productName,
      price: price,
      discount: discount,
    };
    new productmodel(productData)
      .save()
      .then((data:object) => {
        res
          .status(200)
          .json({ message: "Successfully Inserted Product data", data });
      })
      .catch((err:any) => {
        res.status(401).json({ message: "Access Denied", err });
      });
  } catch (Error) {
    console.log(Error);
    res.status(500).json({ message: "internal Server Error" });
  }
};

module.exports = {
  saveUserData: saveUserData,
  userLogin: userLogin,
  notifications: notifications,
  productDetails:productDetails,
};
