import jwt from "jsonwebtoken";
import express from "express";
//JWT Authentication
let authenticateToken = async (req: any, res: express.Response, next: any) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const jwtSecretKey: any = process.env.ACCESS_TOKEN_SECRET;
    if (token == null) {
      res.status(401).json({ message: "Invalid Token" });
    } else {
      jwt.verify(token, jwtSecretKey, (error: any, user: any) => {
        if (error) {
          res.status(408).json({ message: "session expired" });
        } else {
          req.user = user;
          next();
        }
      });
    }
  } catch (error) {
    console.log("jwt Verify middleware error:", error);
    res.status(500).json({ message: "500 internal server error" });
  }
};

export { authenticateToken };

