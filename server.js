const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const passport = require("./auth");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

//Middleware func---------
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made To : ${req.originalUrl}`
  );
  next(); //Move to the next phase
};

//Use Middleware for all the requests
app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate("local", { session: false });

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
app.use("/person", localAuthMiddleware, personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log("listening on port 3000");
});

//Comment added
