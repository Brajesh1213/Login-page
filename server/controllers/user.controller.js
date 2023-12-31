import User from "../models/users.model.js";
import { errorhandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
  res.json({
    message: "API is working",
  });
};

// update user
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorhandler(401, 'You can update only your account!'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
          phone:req.body.phone,
          gender:req.body.gender,
          howDidYouHear:req.body.howDidYouHear,
          city:req.body.city,
          state:req.body.state,

        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
//delete user
 export const deleteUser = async (req,res,next)=>{

  if(req.user.id!=req.params.id){
    return next(errorhandler(401,"You can only delete your account "));
     }
  try{

    await User.findByIdAndDelete(req.params.id);
     res.status(200).json('user has been deleted...');



  }
  catch(error){
  next(error)
  }

 }

 export const signout = async (req, res) => {
  res.clearCookie('access_token').status(200).json({ message: 'Signout Success' });
};
