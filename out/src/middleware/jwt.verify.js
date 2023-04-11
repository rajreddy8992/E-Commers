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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
        if (token == null) {
            res.status(401).json({ message: "Invalid Token" });
        }
        else {
            jsonwebtoken_1.default.verify(token, jwtSecretKey, (error, user) => {
                if (error) {
                    res.status(408).json({ message: "session expired" });
                }
                else {
                    req.user = user;
                    next();
                }
            });
        }
    }
    catch (error) {
        console.log("jwt Verify middleware error:", error);
        res.status(500).json({ message: "500 internal server error" });
    }
});
exports.authenticateToken = authenticateToken;
