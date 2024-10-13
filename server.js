const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello! Welcome to our Hotel, how can we help you ?");
});

app.get("/chicken", function (req, res) {
  res.send("your chicken is ready");
});

//Import the router files
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

//Use the routers
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("listening on port 3000");
});

//Comment added
