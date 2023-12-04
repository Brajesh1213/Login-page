import  express  from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/User.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';

import mongoose from 'mongoose';
// import { configDotenv } from 'dotenv';


mongoose.connect(process.env.MONGO).then(()=>{
    console.log("database connected");
})
.catch((err)=>{
    console.log(err);
})
const app=express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000,()=>{
    console.log("serever listen 3000");
})

app.use("/api/user",userRoutes);
app.use('/api/auth',authRouter);

app.use((err,req,res,next)=>{
const statusCode=err.statusCode || 500;
const message = err.message||'Internal Server Error';
return res.status(statusCode).json({
    success:false,
    message,
    statusCode,

});

})