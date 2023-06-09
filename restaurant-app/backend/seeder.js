const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Restaurant = require("./model/Restaurant");
const restaurants = require("./data/MOCK_DATA.json");

//load the .env file
dotenv.config();
var connectDB = mongoose.connect(process.env.MONGO_DB_URL);

//connect to our mongodb atlas database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_DB_URL);

const importData = async () => {
  try {
    await connectDB;
    await Restaurant.deleteMany();
    await Restaurant.insertMany(restaurants);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const clearData = async () => {
  try {
    await Restaurant.deleteMany();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  clearData();
} else {
  importData();
}
