import mongoose from "mongoose";

//schema
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    
    email:{
        type:String,
        require:true,
        unique:true,

    },
    password:{
        type:String,
        require:true,
        
    },
    profilePicture:{
        type:String,
        default:"https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"

    },

},
{timestamps:true}
);

const User=mongoose.model('User',userSchema);
export default User;