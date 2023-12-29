// import express from "express";
// import { addUser } from "../controllers/userController.js";

// const router = express.Router();

// router.post("/adduser", addUser);

// export default router;
import  express  from 'express';
// import { google, signin, signup } from '../controllers/auth.controller.js';
import userController from '../controllers/userController';


const router = express.Router();

router.post("/userdetail",userController)

export default router;