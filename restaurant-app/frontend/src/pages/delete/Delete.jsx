import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./delete.css";
import Message from "../../components/message/Message";
import Header from "../../components/header/Header";

export default function Delete() {
  // For navigation during button click
  const navigate = useNavigate();
  // Extract the ID from the browser url
  const { id } = useParams();
  // Our student state information
  const [restaurant, setRestaurant] = useState({
    restaurantId: "",
    restaurantName: "",
    cuisineType: "",
    address: "",
    rfidBadgeNumber: "",
    imagePic: "",
  });

  const [message, setMessage] = useState({
    show: false,
    msg: "",
    type: "",
  });

  // Get the restaurant information by passing the ID into our MongoDB Atlas database
  useEffect(() => {
    const getRestaurant= async () => {
      const res = await axios.get("http://localhost:5000/api/restaurants/" + id);
      setRestaurant(res.data);
    };
    getRestaurant();
  }, []);

  // Function to show or hide messages
  const showMessage = (show = false, type = "", msg = "") => {
    setMessage({ show, type, msg });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete("http://localhost:5000/api/restaurants/" + restaurant._id);
      showMessage(true, "info", "Successfully deleted restaurant information");
      clearRestaurantInfo();
    } catch (error) {
      showMessage(true, "error", error);
    }
  };

  // Clear restaurant info after deletion
  const clearRestaurantInfo = () => {
    setRestaurant({
      restaurantId: "",
      restaurantName: "",
      cuisineType: "",
      address: "",
      rfidBadgeNumber: "",
      imagePic: "",
    });
  };

  // The user interface for the Delete page
  return (
    <>
      <Header />
      <div className="header">
        <h1>Delete Restaurant</h1>
      </div>
      <section className="managePage">
        <form className="editForm" onSubmit={handleSubmit}>
          <div className="fields">
            <div className="imgColumn">
              <img
                src={
                  restaurant.imagePic
                    ? `http://localhost:5000/${restaurant.imagePic}`
                    : "http://localhost:5000/images/defaultPic.png"
                }
                alt="Profile Pic"
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
                  readOnly={true}
                  className="deleteInputs"
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
                  readOnly={true}
                  className="deleteInputs"
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
                  readOnly={true}
                  className="deleteInputs"
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
                  readOnly={true}
                  className="deleteInputs"
                />
              </div>
            </div>
          </div>

          <div className="btnContainer">
            <button type="submit" className="bottomButton">
              Delete
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
