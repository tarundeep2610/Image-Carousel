const express = require("express"); // Import Express framework
const multer = require("multer"); // Import Multer for file uploads
const cors = require("cors"); // Import CORS to allow cross-origin requests
const path = require("path"); // Import Path module for handling file paths
const fs = require("fs"); // Import File System module to interact with the file system
const app = express(); // Create an Express application
const port = 3000; // Define the port number for the server
const db = require("./db.js"); // Import database connection module
const Image = require("./models/image.js"); // Import Image model

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static("public")); // Serve static files from the "public" directory
app.use(cors()); // Enable CORS for all routes

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads2/";
    fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the upload directory exists
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Generate a unique filename
  },
});

const upload = multer({ storage: storage }); // Configure Multer with the defined storage settings

// API endpoint to upload images
app.post("/api/images", upload.single("image"), async (req, res) => {
  try {
    const count = await Image.countDocuments(); // Get the current count of images
    const newImage = new Image({
      filePath: req.file.path,
      contentType: req.file.mimetype,
      title: req.body.title,
      description: req.body.desc,
      rank: count + 1, // Rank based on the count
    });
    await newImage.save();
    res.json({ message: "Image uploaded successfully" });
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Middleware to handle multiple file uploads (not used in this specific example)
app.use(upload.array());

// API endpoint to update the rank of an image
app.patch("/api/update-rank/:id", async (req, res) => {
  try {
    const { rank } = req.body;
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    image.rank = rank;
    await image.save();

    res.json({ message: "Image rank updated successfully", image });
  } catch (err) {
    console.error("Error updating image rank:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to get all images
app.get("/api/images", async (req, res) => {
  try {
    const images = await Image.find().sort({ rank: 1 });
    res.json(images);
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to delete an image by ID
app.delete("/api/images/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    fs.unlinkSync(image.filePath); // Delete the file from the file system
    await Image.findByIdAndDelete(req.params.id);

    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error("Error deleting image:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Serve uploaded images statically from the "uploads" directory
app.use("/uploads", express.static("uploads"));

// Start the server and listen on the defined port
app.listen(port, () => console.log(`Listening on port ${port}`));
