import Hotel from "../models/Hotel.js";
import mongoose from "mongoose";
import { createError } from "../utils/createError.js"; // Import createError

export const createHotel = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.city || !req.body.type) {
      return next(createError(400, "Missing required fields"));
    }
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (e) {
    next(createError(500, "Error creating hotel"));
  }
};

export const getHotel = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createError(400, "Invalid ID format"));
  }

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return next(createError(404, "Hotel not found"));
    }
    res.status(200).json(hotel);
  } catch (e) {
    next(createError(500, "Error fetching hotel"));
  }
};

export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    if (!hotels || hotels.length === 0) {
      return next(createError(404, "No hotels found"));
    }
    res.status(200).json(hotels);
  } catch (e) {
    next(createError(500, "Error fetching hotels"));
  }
};

export const updateHotel = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createError(400, "Invalid ID format"));
  }

  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    if (!updatedHotel) {
      return next(createError(404, "Hotel not found"));
    }
    res.status(200).json(updatedHotel);
  } catch (e) {
    next(createError(500, "Error updating hotel"));
  }
};

export const deleteHotel = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createError(400, "Invalid ID format"));
  }

  try {
    // THIS EXAMPLE IS ALREADY RUNNING A SIMPLE PROMISE AS IT IS ONE REQUEST
    // IF THERE WERE MULTIPLE REQUESTS LIKE THE ONE BELOW, USE PROMISE.ALL.
    const deletedHotel = await Hotel.findByIdAndDelete(id);
    if (!deletedHotel) {
      return next(createError(404, "Hotel not found"));
    }
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (e) {
    next(createError(500, "Error deleting hotel"));
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    // PROMISE ALLOWS TO SEARCH THE DATABASE FOR EACH CITY
    // AND THEN WAITS FOR THE RESULTS ALTOGETHER. THIS WAY,
    // ALL CITIES ARE CHECKED FOR RESULT AND THEN RETURNED RESULT TOGETHER.
    const list = await Promise.all(cities.map(city => {
      return Hotel.countDocuments({ city: city });
    }));

    // // Check if any city returned a result (count > 0)
    // if (list.every(count => count === 0)) {
    //   return next(createError(404, "No hotels found"));
    // }
    
    res.status(200).json(list);
  } catch (e) {
    next(createError(500, "Error fetching hotels"));
  }
};


export const countByType = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    if (!hotels || hotels.length === 0) {
      return next(createError(404, "No hotels found"));
    }
    res.status(200).json(hotels);
  } catch (e) {
    next(createError(500, "Error fetching hotels"));
  }
};