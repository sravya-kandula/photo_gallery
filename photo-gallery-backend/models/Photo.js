const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  imageUrl: String,
  title: String,
  description: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Photo", photoSchema);
