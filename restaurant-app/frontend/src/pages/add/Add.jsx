import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Message from "../../components/message/Message";
import "./add.css";

export default function Add() {
  // For navigation during button click
  const navigate = useNavigate();
  // State object of our restaurant
  const [restaurant, setRestaurant] = useState({
    restaurantId: "",
    restaurantName: "",
    cuisineType: "",
    address: "",
    rfidBadgeNumber: "",
    imagePic: "",
  });

  // represents the restaurant picture uploaded
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({
    show: false,
    msg: "",
    type: "",
  });

  // Used for updating our state object
  const updateRestaurant = (e) => {
    const fieldName = e.target.name;
    setRestaurant((currentRestaurant) => ({
      ...currentRestaurant,
      [fieldName]: e.target.value,
    }));
  };

  // Show info or error message during calling of the Axios REST API
  const showMessage = (show = false, type = "", msg = "") => {
    setMessage({ show, type, msg });
  };

  // Handle form submit and using FormData API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const restaurantData = new FormData();
    restaurantData.append("restaurantId", restaurant.restaurantId);
    restaurantData.append("restaurantName", restaurant.restaurantName);
    restaurantData.append("cuisineType", restaurant.cuisineType);
    restaurantData.append("address", restaurant.address);
    restaurantData.append("rfidBadgeNumber", restaurant.rfidBadgeNumber);
    if (file) {
      restaurantData.append("file", file);
    }
    try {
      await axios.post("http://localhost:5000/api/restaurants", restaurantData);
      showMessage(true, "info", "Successfully added restaurant information");
    } catch (error) {
      showMessage(true, "error", error);
    }
  };

  // Displays the form for Adding
  return (
    <>
      <Header />
      <div className="header">
        <h1>Add Restaurant</h1>
      </div>
      <section className="managePage">
        <form className="editForm" onSubmit={handleSubmit}>
          <div className="fields">
            <div className="imgColumn">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "http://localhost:5000/images/defaultPic.png"
                }
                alt="Restaurant Pic"
              />
              <label htmlFor="fileInput" className="fileUploadLabel">
                <i className="fa-solid fa-circle-plus addProfileIcon">
                  Add  Pic
                </i>
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <div className="fieldsColumn">
              <div className="fieldRow">
                <label htmlFor="restaurantId" className="fieldLabel">
                Restaurant ID
                </label>
                <input
                  type="text"
                  name="restaurantId"
                  id="restaurantId"
                  value={restaurant.restaurantId}
                  onChange={updateRestaurant}
                  className="addInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="restaurantName" className="fieldLabel">
                Restaurant Name
                </label>
                <input
                  type="text"
                  name="restaurantName"
                  id="restaurantName"
                  value={restaurant.restaurantName}
                  onChange={updateRestaurant}
                  className="addInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="cuisineType" className="fieldLabel">
                  cuisineType
                </label>
                <input
                  type="text"
                  name="cuisineType"
                  id="cuisineType"
                  value={restaurant.cuisineType}
                  onChange={updateRestaurant}
                  className="addInputs"
                />
              </div>
           
              <div className="fieldRow">
                <label htmlFor="address" className="fieldLabel">
                  Location
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={restaurant.address}
                  onChange={updateRestaurant}
                  className="addInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="rfidBadgeNumber" className="fieldLabel">
                  RFID Badge Number
                </label>
                <input
                  type="text"
                  name="rfidBadgeNumber"
                  id="rfidBadgeNumber"
                  value={restaurant.rfidBadgeNumber}
                  onChange={updateRestaurant}
                  className="addInputs"
                />
              </div>
            </div>
          </div>

          <div className="btnContainer">
            <button type="submit" className="bottomButton">
              Add
            </button>
            <button
              type="button"
              className="bottomButton"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>
          <div>
            {message.show && (
              <Message {...message} removeMessage={showMessage} />
            )}
          </div>
        </form>
      </section>
    </>
  );
}
