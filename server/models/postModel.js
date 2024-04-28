const mongoose = require("mongoose");

// Film Şeması
const filmSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add film title"],
    },
    description: {
      type: String,
      required: [true, "Please add film description"],
    },
    director: {
      type: String,
      required: [true, "Please add director name"],
    },
    releaseDate: {
      type: Date,
    },
  },
  { timestamps: true } // createdAt ve updatedAt alanlarını otomatik olarak ekler
);

const filmModel = mongoose.model("Film", filmSchema);

module.exports = filmModel;
