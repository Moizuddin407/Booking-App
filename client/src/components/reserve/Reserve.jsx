import React from 'react';
import './reserve.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'; // Don't forget to import the icon
import useFetch from "../../hooks/usefetch";
import { useContext, useState } from 'react';
import { SearchContext } from "../../context/SearchContext.js";

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
      list.push(new Date(data).getTime());
      data.setDate(data.getDate() + 1);
    }
    return list;
  };

  
  const allDates = (getDatesInRange(dates[0].startDate, dates[0].endDate))
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };


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

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          // const res = axios.push("")
        })
      );
    } catch (err) {
      
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
                      disabled={!isAvailable(roomNumber)}
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
