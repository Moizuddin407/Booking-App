import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      return next(createError(400, "Missing required fields"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User created successfully");
  } catch (e) {
    next(createError(500, "Error creating user"));
  }
};

export const login = async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      return next(createError(400, "Username and password are required"));
    }

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong password or username!"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Remove password and isAdmin from info that
    // will be sent to front-end.
    const { password, isAdmin, ...otherDetails } = user._doc;

    // httpOnly prevents javascript from accessing token
    // to protect from xss attacks.
    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json({ ...otherDetails });
  } catch (err) {
    next(createError(500, "Error logging in"));
  }
};
