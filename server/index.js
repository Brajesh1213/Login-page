import  express  from 'express';
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("database connected");
})
.catch((err)=>{
    console.log(err);
})
const app=express();

app.listen(3000,()=>{
    console.log("serever listen 3000");
})