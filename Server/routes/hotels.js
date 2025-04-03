import express from "express";
import { createHotel,getHotel,getAllHotels,updateHotel,deleteHotel, countByCity, countByType,getHotelRooms} from "../controllers/hotel.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

router.use((req, res, next) => {
  console.log(`[HOTEL ROUTE] Request received: ${req.method} ${req.url}`);
  next();
});

// GET
router.get("/getHotel/:id", getHotel);
// GET ALL
router.get("/", getAllHotels);
// GET ALL BY CITY
router.get("/countByCity", countByCity);
// GET ALL BY TYPE
router.get("/countByType", countByType);

// CREATE
router.post("/add", verifyAdmin, createHotel);
// UPDATE
router.put("/updateHotel/:id", verifyAdmin, updateHotel);
// DELETE
router.delete("/deleteHotel/:id",verifyAdmin, deleteHotel);

// Fetch Rooms
router.get("/rooms/:id", getHotelRooms);

export default router;