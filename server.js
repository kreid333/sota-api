// DEFINING REQUIRED PACKAGES
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

// CREATING INSTANCE OF EXPRESS
const app = express();

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// PORT
const PORT = process.env.PORT || 3001;

// CONNECTING TO MONGODB DATABASE
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/sota", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// TESTING CONNECTION TO DATABASE
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

// LISTENING ON PORT
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// API ROUTES
const apiRoutes = require("./controller/apiController");
app.use(apiRoutes);

// BUILD FOLDER STATIC
app.use(express.static("client/public"));
