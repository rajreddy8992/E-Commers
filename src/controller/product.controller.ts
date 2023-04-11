import { Request, Response } from "express";
import {productmodel} from '../models/product.model';


exports.productDetails = async (req:Request, res:Response) => {
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
