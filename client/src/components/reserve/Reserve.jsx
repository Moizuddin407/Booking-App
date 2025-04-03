import React from 'react';
import './reserve.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'; // Don't forget to import the icon
import useFetch from "../../hooks/usefetch";
import { useNavigate, useContext, useState } from 'react';
import { SearchContext } from "../../context/SearchContext.js";
import axios from 'axios';

const Reserve = ({ setOpen, hotelId }) => {
  const { data, loading, error } = useFetch(`http://localhost:8081/hotel/rooms/${hotelId}`);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { dates } = useContext(SearchContext); // Destructure dates from SearchContext

  // Get all dates in range.
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const data = new Date(start.getTime());
    let list = [];
    while (data <= end) {
      list.push(new Date(data).getTime()); // Push the timestamp for each day in the range
      data.setDate(data.getDate() + 1);
    }
    return list;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  // IMP
  // Check if the room is available by comparing its unavailable dates with selected dates
  const isAvailable = (roomNumber) => {
    const unavailableDatesTimestamps = roomNumber.unavailableDates.map(item => {
      // If the item is an array, take the first element (the date string)
      const dateString = Array.isArray(item) ? item[0] : item;
      const newDate = new Date(dateString);  // Try converting the string to Date object
      if (isNaN(newDate.getTime())) {
        return null;  // Return null for invalid dates
      }
      // Normalize to midnight to ignore time zone differences
      newDate.setHours(0, 0, 0, 0); // Set time to midnight
      return newDate.getTime();
    }).filter(date => date !== null);  // Filter out invalid dates

    // Compare selected dates with unavailable dates
    const isFound = allDates.some(date => unavailableDatesTimestamps.includes(date));
    return !isFound; // If a date is found in the unavailable list, return false
  };

  // Handle room selection
  const handleSelect = (e) => {
    const selected = e.target.checked;
    const roomId = e.target.value;
    setSelectedRooms((prev) => {
      if (selected) {
        return [...prev, roomId];  
      } else {
        return prev.filter((id) => id !== roomId); 
      }
    });
  };
  const navigate = useNavigate();
  // Handle reservation on click
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map(async (roomId) => {
          const res = await axios.put(
            `http://localhost:8081/room/availability/${roomId}`,
            { dates: allDates }
          );
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.log("Error updating availability:", err);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon 
          icon={faCircleXmark} 
          className="rClose" 
          onClick={() => setOpen(false)}
        />
        <span>Select Your Rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className='rPrice'>{item.price}</div>
            </div>

            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => {
                return (
                  <div className="room" key={roomNumber.number}>
                    <label>{roomNumber.number}</label>
                    <input 
                      type='checkbox' 
                      value={roomNumber._id} 
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)} // Disable if the room is unavailable
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">Reserve Now!</button>
      </div>
    </div>
  );
};

export default Reserve;
