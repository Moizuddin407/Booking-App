import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelRoute from "./routes/hotels.js";
import roomRoute from "./routes/rooms.js";
import userRoute from "./routes/users.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo Connected");
  } catch (e) {
    console.error("MongoDB connection error:", e.message);
  }
};

// Global Middleware
app.use((req, res, next) => {
  console.log(`[MIDDLEWARE] Request received: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(cookieParser());
// Apply routes
app.use("/auth", authRoute);
app.use("/hotel", hotelRoute);
app.use("/room", roomRoute);
app.use("/user", userRoute);

// Middleware
app.use((err, req, res, next) => {
  console.log("[ERROR MIDDLEWARE] Handling error:", err.message);
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

mongoose.connection.on("connected", () => console.log("MongoDB connected!"));
mongoose.connection.on("disconnected", () => console.log("MongoDB disconnected!"));

app.listen(8081, () => {
  console.log("Backend connected");
  connect();
});
