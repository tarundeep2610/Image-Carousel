// const mongoose = require("mongoose");

// // Define Image Schema
// const imageSchema = new mongoose.Schema({
//   filePath: String,
//   contentType: String,
//   title: String,
//   description: String,
//   rank: Number,
// });

// const Image = mongoose.model("Image", imageSchema);
// module.exports = Image;

const mongoose = require("mongoose");

// Define Image Schema
const imageSchema = new mongoose.Schema({
  filePath: String, // Path of the image file
  contentType: String, // MIME type of the image
  title: String, // Title of the image
  description: String, // Description of the image
  rank: Number, // Rank for ordering images
});

// Create Image model
const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
