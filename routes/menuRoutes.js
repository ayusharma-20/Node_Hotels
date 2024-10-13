const express = require("express");
const router = express.Router();

const MenuItem = require("./../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const data = req.body; //asuming that the body contains the person data

    //create a new Person document using the Mongoose model
    const newItem = new MenuItem(data);

    //save the new Person in the database
    const response = await newItem.save();
    console.log("Data Saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET method to get the Menu data
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType; //Extract the worktype from the URL parameter
    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("response fetched");
      res.status(200).json(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Invalid work Type" });
  }
});

//Comment added for testing purpose

module.exports = router;
