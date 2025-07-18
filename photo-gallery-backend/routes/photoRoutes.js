const express = require("express");
const router = express.Router();
const Photo = require("../models/Photo");

// Upload a photo
router.post("/upload", async (req, res) => {
  const { imageUrl, title, description } = req.body;
  try {
    const newPhoto = new Photo({ imageUrl, title, description });
    await newPhoto.save();
    res.status(201).json(newPhoto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all photos
router.get("/", async (req, res) => {
  try {
    const photos = await Photo.find().sort({ uploadedAt: -1 });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a photo by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPhoto = await Photo.findByIdAndDelete(req.params.id);
    if (!deletedPhoto) {
      return res.status(404).json({ message: "Photo not found" });
    }
    res.json({ message: "Photo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
