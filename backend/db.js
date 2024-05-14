const mongoose = require("mongoose"); // Import Mongoose for MongoDB interaction

// Connect to MongoDB server
// Note: Changed 'localhost' to '127.0.0.1' to ensure proper connection
mongoose.connect("mongodb://127.0.0.1:27017/imageCarouselDB2", {
  useNewUrlParser: true, // Use the new URL parser to handle connection strings
  useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
});

const db = mongoose.connection; // Get the default connection
db.on("error", console.error.bind(console, "MongoDB connection error:")); // Bind connection to error event to get notification of connection errors
db.once("open", () => {
  console.log("Connected to MongoDB"); // Log a message once the connection is open
});

module.exports = db;
