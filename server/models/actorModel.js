// actor.model.js
const mongoose = require("mongoose"); // Bağlantı için db.js'yi kullanıyoruz

const actorSchema = new mongoose.Schema({
  ActorID: {
    type: String,
    required: true,
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
  },
  DoB: {
    type: Date,
  },
  DoD: {
    type: Date,
    default: null, // Optional field
  },
  Gender: {
    type: String,
    enum: ["Male", "Female", "Other"], // Gender should be one of these
    required: true,
  },
});

module.exports = mongoose.model("actors", actorSchema);
