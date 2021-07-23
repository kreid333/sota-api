const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  name: String,
  email: String,
  rating: Number,
  review: String,
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
