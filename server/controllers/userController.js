import { UserDetail } from "../models/users.model.js";

export const userController = async (req, res, next) => {
  const { username, email, phone } = req.body;

  const detail = new UserDetail({ username, email, phone });

  try {
    await detail.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error in addUser:", error);

    if (error.code === 11000) {
      console.error("Duplicate key error:", error);
      res.status(400).json({ error: "Email or username already in use" });
    } else {
      console.error("Internal server error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const allUsers = async (req, res) => {
  try {
    const allUsers = await UserDetail.find();
    res.json(allUsers);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const IndividualDetail = async (req, res) => {
  try {
    const userId = req.params.id; 
    const user = await UserDetail.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User detail not found" });
    }
  
    res.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUserDetail = async (req, res) => {
  try {
    const deletedUser = await UserDetail.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User detail not found" });
    }

    res.status(200).json({ message: "User detail has been deleted" });
  } catch (error) {
    console.error("Error deleting user detail:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUserDetail = async (req, res) => {
  try {
    const updatedUser = await UserDetail.findByIdAndUpdate(
      req.params.id,
      {
        $set: { 
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User detail not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user detail:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const Arrange = async (req, res) => {
  try {
    let users;

    switch (req.query.sort) {
      case 'ascending':
        users = await UserDetail.find().sort({ username: 1 });
        break;
      case 'descending':
        users = await UserDetail.find().sort({ username: -1 });
        break;
      case 'LastModified':
        users = await UserDetail.find().sort({ updatedAt: -1 });
        break;
      case 'LastInserted':
        users = await UserDetail.find().sort({ createdAt: -1 });
        break;
      default:
        users = await UserDetail.find();
    }

    res.json(users);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const searchUser = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;

    const users = await UserDetail.find({
      $or: [
        { username: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
        { phone: { $regex: searchTerm, $options: 'i' } },
      ],
    });

    res.json(users);
  } catch (error) {
    console.error('Error searching for users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};