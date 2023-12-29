import express from "express";
import { deleteUser, signout, test, updateUser } from "../controllers/user.controller.js";
import {Arrange, IndividualDetail, allUsers, deleteUserDetail,  searchUser,  updateUserDetail, userController } from "../controllers/userController.js";
import { verifyToken } from "../utils/VerifyUser.js";

const router = express.Router();

router.get("/",test);
router.post("/update/:id",verifyToken,updateUser)
router.delete("/delete/:id",verifyToken,deleteUser)
router.get('/signout',signout);

//Elemnt after Admin
router.get("/individual_detail/:id",IndividualDetail);
router.post('/adduser',userController);
router.get('/allusers',allUsers);
router.put("/updateUser/:id",updateUserDetail)

router.delete("/deleteuser/:id",deleteUserDetail)

router.get("/usersort",Arrange)
router.get("/searchuser",searchUser)

export default router;
 