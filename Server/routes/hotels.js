import express from "express";
import { createHotel,getHotel,getAllHotels,updateHotel,deleteHotel,} from "../controllers/hotel.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

router.use((req, res, next) => {
  console.log(`[HOTEL ROUTE] Request received: ${req.method} ${req.url}`);
  next();
});

// GET
router.get("/:id", getHotel);
// GET ALL
router.get("/", getAllHotels);
// CREATE
router.post("/add", verifyAdmin, createHotel);
// UPDATE
router.put("/:id", verifyAdmin, updateHotel);
// DELETE
router.delete("/:id",verifyAdmin, deleteHotel);

export default router;