import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./edit.css";
import Message from "../../components/message/Message";
import Header from "../../components/header/Header";

export default function Edit() {
  // For navigation during button click
  const navigate = useNavigate();
  // Extract the ID from the browser url
  const { id } = useParams();
  // Our restaurant state information
  const [restaurant, setRestaurant] = useState({
    restaurantId: "",
    restaurantName: "",
    cuisineType: "",
    address: "",
    rfidBadgeNumber: "",
    imagePic: "",
  });
  // The restaurant picture file
  const [file, setFile] = useState(null);
  // Messages used to display if successful or error during updating
  const [message, setMessage] = useState({
    show: false,
    msg: "",
    type: "",
  });

  // Get the restaurant information by passing the ID into our MongoDB Atlas database
  useEffect(() => {
    const getRestaurant = async () => {
      const res = await axios.get("http://localhost:5000/api/restaurants/" + id);
      setRestaurant(res.data);
    };
    getRestaurant();
  }, []);

  // Update our state object
  const updateRestaurant = (e) => {
    const fieldName = e.target.name;
    setRestaurant((currentRestaurant) => ({
      ...currentRestaurant,
      [fieldName]: e.target.value,
    }));
  };

  // Function to show or hide messages
  const showMessage = (show = false, type = "", msg = "") => {
    setMessage({ show, type, msg });
  };

  // Handle form submit
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
      await axios.put(
        "http://localhost:5000/api/restaurants/" + restaurant._id,
        restaurantData
      );
      showMessage(true, "info", "Successfully edited restaurant information");
    } catch (error) {
      showMessage(true, "error", error);
    }
  };

  // The user interface for the Edit page
  return (
    <>
      <Header />
      <div className="header">
        <h1>Edit Restaurant</h1>
      </div>
      <section className="managePage">
        <form className="editForm" onSubmit={handleSubmit}>
          <div className="fields">
            <div className="imgColumn">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : restaurant.imagePic
                    ? `http://localhost:5000/${restaurant.imagePic}`
                    : "http://localhost:5000/images/defaultPic.png"
                }
                alt="Profile Pic"
              />
              <label htmlFor="fileInput" className="fileUploadLabel">
                <i className="fa-solid fa-circle-plus addProfileIcon"></i>Add
                Restaurant Pic
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
                  className="editInputs"
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
                  className="editInputs"
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
                  className="editInputs"
                />
              </div>
              
              <div className="fieldRow">
                <label htmlFor="address" className="fieldLabel">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={restaurant.address}
                  onChange={updateRestaurant}
                  className="editInputs"
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
                  className="editInputs"
                />
              </div>
            </div>
          </div>

          <div className="btnContainer">
            <button type="submit" className="bottomButton">
              Edit
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
