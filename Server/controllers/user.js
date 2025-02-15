import Hotel from "../models/Hotel.js";
import mongoose from "mongoose";

export const createHotel = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.city || !req.body.type) {
      return next({ status: 400, message: "Missing required fields" });
    }
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (e) {
    next({ status: 500, message: "Error creating hotel", error: e.message });
  }
};

export const getHotel = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next({ status: 400, message: "Invalid ID format" });
  }

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return next({ status: 404, message: "Hotel not found" });
    }
    res.status(200).json(hotel);
  } catch (e) {
    next({ status: 500, message: "Error fetching hotel", error: e.message });
  }
};

export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    if (!hotels || hotels.length === 0) {
      return next({ status: 404, message: "No hotels found" });
    }
    res.status(200).json(hotels);
  } catch (e) {
    next({ status: 500, message: "Error fetching hotels", error: e.message });
  }
};

export const updateHotel = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next({ status: 400, message: "Invalid ID format" });
  }

  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedHotel) {
      return next({ status: 404, message: "Hotel not found" });
    }
    res.status(200).json(updatedHotel);
  } catch (e) {
    next({ status: 500, message: "Error updating hotel", error: e.message });
  }
};

export const deleteHotel = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next({ status: 400, message: "Invalid ID format" });
  }

  try {
    const deletedHotel = await Hotel.findByIdAndDelete(id);
    if (!deletedHotel) {
      return next({ status: 404, message: "Hotel not found" });
    }
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (e) {
    next({ status: 500, message: "Error deleting hotel", error: e.message });
  }
};
