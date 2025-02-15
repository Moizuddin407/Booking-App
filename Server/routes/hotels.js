import express from "express";
import {
  createHotel,
  getHotel,
  getAllHotels,
  updateHotel,
  deleteHotel,
} from "../controllers/hotel.js";
import mongoose from "mongoose";

const router = express.Router();

router.use((req, res, next) => {
  console.log(`[HOTEL ROUTE] Request received: ${req.method} ${req.url}`);
  next();
});

router.post("/add", createHotel);
router.get("/:id", getHotel);
router.get("/", getAllHotels);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);

export default router;