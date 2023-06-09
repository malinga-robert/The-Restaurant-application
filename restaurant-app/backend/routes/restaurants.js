const router = require("express").Router();
const Restaurant = require("../model/Restaurant");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// Upload profile image directory
const IMAGE_DIR = "./images/";

// set multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGE_DIR);
  },
  filename: (req, file, cb) => {
    //generate random uuid
    const fileName = uuidv4() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

// Limit file upload only to images
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format is allowed!"));
    }
  },
});

// Create Restaurant
router.post("/", upload.single("file"), async (req, res) => {
  const newRestaurant = new Restaurant(req.body);
  try {
    // save the generated filename in our MongoDB Atlas database
    newRestaurant.imagePic = req.file.path;
    const savedRestaurant = await newRestaurant.save();
    res.status(200).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get Restaurant list or Search Restaurant by rfid or restaurantid query parameters
router.get("/", async (req, res) => {
  const restaurantId = req.query.restaurantId;
  const rfId = req.query.rfId;

  // if either RestaurantId or rfId query parameters is present
  if (restaurantId || rfId) {
    try {
      let restaurant;
      if (restaurantId && rfId) {
        restaurant = await Restaurant.find({
          restaurantId: restaurantId,
          rfidBadgeNumber: rfId,
        });
      } else if (restaurantd) {
        restaurant = await Restaurant.find({ restaurantId });
      } else if (rfId) {
        restaurant= await Restaurant.find({ rfidBadgeNumber: rfId });
      }
      return res.status(200).json(restaurant);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
  // else return the whole Restaurant list
  try {
    const restaurantList = await Restaurant.find();
    res.status(200).json(restaurantList);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get Restaurant by ID
router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Update Restaurant
router.put("/:id", upload.single("file"), async (req, res, next) => {
  //If a new profile pic is uploaded then process it first by deleting the old image file from disk
  if (req.file) {
    try {
      //find by id
      const oldRestaurantDetails = await Student.findById(req.params.id);
      if (!oldRestaurantDetails) {
        throw new Error("Restaurant not found!");
      }

      //if old image file exist then the delete file from directory
      if (fs.existsSync(oldRestaurantDetails.imagePic)) {
        fs.unlink(oldRestaurantDetails.imagePic, (err) => {
          if (err) {
            throw new Error("Failed to delete file..");
          } else {
            console.log("file deleted");
          }
        });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  // Update the database with new details
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
        imagePic: req.file?.path,
      },
      { new: true }
    );
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete Restaurant
router.delete("/:id", async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.status(200).json("Restaurant has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
