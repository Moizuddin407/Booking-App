import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// Add a new hotel
router.post("/add", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel); // Return the saved hotel data
  } catch (e) {
    console.log("Error Creating Hotel!");
    res.status(500).json({ message: "Error creating hotel", error: e.message });
  }
});

// Get a hotel by ID
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(hotel); // Return the hotel data
  } catch (e) {
    console.log("Error fetching hotel!");
    res.status(500).json({ message: "Error fetching hotel", error: e.message });
  }
});

// Get all hotels
router.get("/", async (req, res,next) => {
  console.log("Hi I am hotel route")
  next();
    try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels); // Return all hotel data
  } catch (e) {
    console.log("Error fetching hotels!");
    res.status(500).json({ message: "Error fetching hotels", error: e.message });
  }
});

// Update a hotel by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(updatedHotel); // Return updated hotel data
  } catch (e) {
    console.log("Error updating hotel!");
    res.status(500).json({ message: "Error updating hotel", error: e.message });
  }
});

// Delete a hotel by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json({ message: "Hotel deleted successfully" }); // Confirm deletion
  } catch (e) {
    console.log("Error deleting hotel!");
    res.status(500).json({ message: "Error deleting hotel", error: e.message });
  }
});

export default router;
