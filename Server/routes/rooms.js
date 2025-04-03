import express from "express";
import { createRoom,getRoom,getAllRooms,updateRoom,deleteRoom} from "../controllers/Room.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();


router.use((req, res, next) => {
  console.log(`[Room ROUTE] Request received: ${req.method} ${req.url}`);
  next();
});

// GET
router.get("/:id", getRoom);
// GET ALL
router.get("/", getAllRooms);
// CREATE
router.post("/:hotelid", verifyAdmin, createRoom);
// UPDATE
router.put("/:id", verifyAdmin, updateRoom);
// UPDATE ROOM AVAILABILITY
router.put("/availability/:id", updateRoom);
// DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);


export default router;
