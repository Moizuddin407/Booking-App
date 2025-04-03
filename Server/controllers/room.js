import mongoose from "mongoose";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/createError.js";

// Create Room
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (e) {
      return next(createError(500, "Error updating Hotel with room"));
    }
    res.status(200).json(savedRoom);
  } catch (e) {
    next(createError(500, "Error creating room"));
  }
};

// Get Room by ID
export const getRoom = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createError(400, "Invalid ID format"));
  }

  try {
    const room = await Room.findById(id);
    if (!room) {
      return next(createError(404, "Room not found"));
    }
    res.status(200).json(room);
  } catch (e) {
    next(createError(500, "Error fetching room"));
  }
};

// Get All Rooms
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    if (!rooms || rooms.length === 0) {
      return next(createError(404, "No rooms found"));
    }
    res.status(200).json(rooms);
  } catch (e) {
    next(createError(500, "Error fetching rooms"));
  }
};

// Update Room by ID
export const updateRoom = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createError(400, "Invalid ID format"));
  }

  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    if (!updatedRoom) {
      return next(createError(404, "Room not found"));
    }
    res.status(200).json(updatedRoom);
  } catch (e) {
    next(createError(500, "Error updating room"));
  }
};

// Delete Room by ID
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const roomId = req.params.id;

  try {
    // Delete the room from the Room collection
    const deletedRoom = await Room.findByIdAndDelete(roomId);
    if (!deletedRoom) {
      return next(createError(404, "Room not found"));
    }

    try {
      // Remove the room ID from the hotel's 'rooms' array
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: roomId } // Use roomId here to remove from hotel's rooms array
      });
    } catch (err) {
      return next(createError(500, "Error updating Hotel rooms"));
    }

    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(createError(500, "Error deleting Room"));
  }
};

// UPDATE ROOM AVAILABILITY
// export const updateRoomAvailability = async (req, res, next) => {
//   console.log("JUST UPDATED DATES BRO! ");
//   try {
//     const updatedRoom = await Room.updateOne(
//       { "roomNumbers._id": req.params.id },
//       {
//         $push: {
//           // Updating nested properties in MongoDB.
//           "roomNumbers.$.unavailableDates": req.body.dates,
//         },
//       }
//     );
    
//     // Ensure updatedRoom is returned after update
//     res.status(200).json(updatedRoom); 
//   } catch (err) {
//     next(err);
//   }
// };

export const updateRoomAvailability = async (req, res, next) => {
  console.log("JUST UPDATED DATES BRO! ", req.body.dates); // Log incoming dates to check
  try {
    const updatedRoom = await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          // Updating nested properties in MongoDB.
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );

    console.log("Updated Room: ", updatedRoom); // Log the update status to verify
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
