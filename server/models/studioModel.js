const mongoose = require("mongoose");

const studioSchema = new mongoose.Schema({
  StudioID: {
    type: String,
    require: true,
    unique: true,
  },

  Studio: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("studios", studioSchema);
