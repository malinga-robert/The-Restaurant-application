import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./queryfilter.css";

export default function QueryFilter({ searchRestaurant, getRestaurants }) {
  // State information for the filter by restaurantId or RFID or both
  const [restaurantId, setRestaurantId] = useState("");
  const [rfid, setRfId] = useState("");
  // For page navigation during button click
  const navigate = useNavigate();

  // Clear the input text
  const clearSearch = () => {
    setRestaurantId("");
    setRfId("");
    getRestaurants();
  };

  // Display the filter jsx
  return (
    <div className="filter">
      <div className="filterFields">
        <label htmlFor="studentId" className="filterLabel">
        Restaurant ID
        </label>
        <input
          name="restaurantId"
          className="filterInputs"
          type="text"
          placeholder="Enter Restaurant ID"
          value={restaurantId}
          onChange={(e) => setRestaurantId(e.target.value)}
        />
      </div>
      <div className="filterFields">
        <label htmlFor="rfid" className="filterLabel">
          RFID Number
        </label>
        <input
          name="rfid"
          className="filterInputs"
          type="text"
          placeholder="Enter RFID"
          value={rfid}
          onChange={(e) => setRfId(e.target.value)}
        />
      </div>
      <div className="filterFields">
        <div className="btn-container">
          <button
            type="button"
            className="queryBtn"
            onClick={() => searchRestaurant(restaurantId, rfid)}
          >
            Search Restaurant
          </button>
          <button type="button" className="queryBtn" onClick={clearSearch}>
            Clear Search
          </button>
          <button
            type="button"
            className="queryBtn"
            onClick={() => navigate("/add")}
          >
            Add Restaurant
          </button>
        </div>
      </div>
    </div>
  );
}
