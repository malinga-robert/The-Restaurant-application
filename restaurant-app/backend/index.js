const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const restaurantRoute = require("./routes/restaurants");
  
//setup cors for our project
app.use(cors());
//load static files
app.use("/images", express.static(path.join(__dirname, "/images")));

//load the .env file
dotenv.config();
//parse the json request and put it in the req.body
app.use(express.json());

//connect to our mongodb atlas database
mongoose.connect(process.env.MONGO_DB_URL)
// for testing db connetion
const DB = mongoose.connect(process.env.MONGO_DB_URL)
//load our rest api routes
app.use("/api/restaurants", restaurantRoute);

//start the server
app.listen("5000", () => {
  console.log("Restaurant backend API server is running.");
});
