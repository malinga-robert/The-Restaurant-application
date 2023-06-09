const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: String,
      required: true,
      unique: true,
    },
    restaurantName: String,
    cuisineType: String,
    address: String,
    rfidBadgeNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    imagePic: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", RestaurantSchema);
