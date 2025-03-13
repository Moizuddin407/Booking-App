import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(createError(400, "Missing required fields"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(400, "Email already registered"));
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hash,
      isAdmin: req.body.isAdmin || false,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });

  } catch (e) {
    next(createError(500, `Error creating user: ${e.message}`));
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(createError(400, "Username and password are required"));
    }

    const user = await User.findOne({ username });
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong password or username!"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // DESTRUCTED THE OBJECT TO IGNORE THE PASSWORD AND ISADMIN CHECK. SENDS REST OF THE DATA.
    const { password: _, isAdmin, ...otherDetails } = user._doc;

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    }).status(200).json({ ...otherDetails });

  } catch (err) {
    next(createError(500, `Error logging in: ${err.message}`));
  }
};
