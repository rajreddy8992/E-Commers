import mongoose from 'mongoose';
import express from 'express';
const app = express();

const mongo_url="mongodb://127.0.0.1/Ecommers"
mongoose.connect(mongo_url).then(()=>{
    console.log("MongoDB Connected")
}).catch((error)=>{
    console.log((error))
})
