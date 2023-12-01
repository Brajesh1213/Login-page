import User from "../models/users.model.js";
import bcryptjs from "bcryptjs";
import { errorhandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "user added successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorhandler(404, "User not Found"));
    const validpassword = bcryptjs.compareSync(password, validUser.password);
    if (!validpassword) return next(errorhandler(401, "wrong credential"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate= new Date(Date.now()+360000)//1 hrs
    res
    .cookie("acces_token", token, { httpOnly: true, expires:expiryDate})  

    .status(200)
    .json(rest);
  } catch (error) {
    next(error);
  }
};
