// Import the mongoose library
const mongoose = require("mongoose");

// Define the schema for the director
const directorSchema = new mongoose.Schema({
  DirectorID: {
    type: String,
    required: true,
    unique: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  FamilyName: {
    type: String,
    required: true,
  },
  FullName: {
    type: String,
    required: true,
  },
  DoB: {
    type: Date,
    required: true,
  },
  DoD: {
    type: Date,
    required: false,
  },
  Gender: {
    type: String,
    enum: ["Male", "Female", "Other"], // Ensures valid values
    required: true,
  },
});

module.exports = mongoose.model("directors", directorSchema);
