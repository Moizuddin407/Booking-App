import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import hotelRoute from "./routes/hotels.js"
import roomRoute from "./routes/rooms.js"
import userRoute from "./routes/users.js"

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

// Middleware
app.use((req,res,next)=>{
  console.log("Hi I am middleware!");
  next();
})

app.use(express.json());
app.use("/auth",authRoute);
app.use("/hotel",hotelRoute);
app.use("/room",roomRoute);
app.use("/user",userRoute);



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
