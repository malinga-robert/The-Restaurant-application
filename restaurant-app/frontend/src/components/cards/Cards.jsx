import React from "react";
import "./cards.css";
import { Link } from "react-router-dom";

export default function Cards({ restaurants }) {
  return (
    <div className="cardsWrapper">
      <div className="cards">
        {restaurants.length === 0 && <p>No restaurant(s) found</p>}
        {restaurants.map((restaurant) => {
          return (
            <div key={restaurant._id} className="card">
              <img
                src={
                  restaurant.imagePic
                    ? "http://localhost:5000/" + restaurants.imagePic
                    : "http://localhost:5000/images/defaultPic.png"
                }
                alt="profile pic"
              />
              <h3>{`${restaurant.firstName} ${restaurant.lastName}`}</h3>
              <div className="text">
                <p>
                  <span className="label">Restaurant ID:</span>
                </p>
                <p>
                  <span className="info">{restaurant.restaurantId}</span>
                </p>
              
                <p>
                  <span className="label">RFID Number:</span>
                </p>
                <p>
                  <span className="info">{restaurant.rfidBadgeNumber}</span>
                </p>
              </div>
              <div className="btnContainer">
                <Link to={`edit/${restaurant._id}`} className="cardBtn m-top">
                  Edit
                </Link>
                <Link to={`delete/${restaurant._id}`} className="cardBtn m-top">
                  Delete
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
