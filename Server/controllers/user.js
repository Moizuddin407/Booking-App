import User from "../models/User.js";
import mongoose from "mongoose";
import { createError } from "../utils/createError.js"; // Import createError


// GET SINGLE USER
export const getUser = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createError(400, "Invalid ID format"));
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    res.status(200).json(user);
  } catch (e) {
    next(createError(500, "Error fetching user"));
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return next(createError(404, "No users found"));
    }
    res.status(200).json(users);
  } catch (e) {
    next(createError(500, "Error fetching users"));
  }
};

// UPDATE USER
export const updateUser = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createError(400, "Invalid ID format"));
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    if (!updatedUser) {
      return next(createError(404, "User not found"));
    }
    res.status(200).json(updatedUser);
  } catch (e) {
    next(createError(500, "Error updating user"));
  }
};

// DELETE USER
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createError(400, "Invalid ID format"));
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return next(createError(404, "User not found"));
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (e) {
    next(createError(500, "Error deleting user"));
  }
};
