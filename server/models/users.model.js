import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    match: /^[a-zA-Z]+$/, // Alphabets only
  },

  email: {
    type: String,
    required: true,
    // match: /^[a-zA-Z0-9]+$/, // Alphanumeric only
  },

  password: {
    type: String,
    required: true,
  },

  profilePicture: {
    type: String,
    default: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
  },

  phone: {
    type: String,
    required: true,
    match: /^[0-9]+$/, // Numbers only
  },

  gender: {
    type: String,
    require:true,
    enum: ["Male", "Female", "Others"],
  },

  howDidYouHear: {
    type: [String],
    require:true,
    enum: ["LinkedIn", "Friends", "Job Portal", "Others"],
  },

  city: {
    type: String,
    require:true,

    
  },

  state: {
    type: String,
    require:true,

    
  },
},
{
  timestamps: true,
});

const userDetailSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  
  phone: {
    type: String,
    required: true,
    match: /^[0-9]+$/, // Numbers only
  },
  
  email: {
    type: String,
    required: true,
    // match: /^[a-zA-Z0-9]+$/, // Alphanumeric only
  },
},
{
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
const UserDetail = mongoose.model('UserDetail', userDetailSchema);
export { UserDetail };
export default User;
