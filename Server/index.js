import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);  // No options needed
    console.log("Mongo Connected");
  } catch (e) {
    console.error("MongoDB connection error:", e.message); // Log the full error message
  }
};

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected!");
});
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
});



app.listen(8081, () => {
  console.log("Backend connected");
  connect();
});
