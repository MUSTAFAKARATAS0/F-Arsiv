const mongoose = require("mongoose");
//FilmID;Title;ReleaseDate;Review;DirectorID;StudioID;GenreID;RunTimeMinutes;OscarWins
// Film Şeması
const filmSchema = new mongoose.Schema(
  {
    FilmID: {
      type: String,
      required: [true, "Please add film title"],
    },
    Title: {
      type: String,
      required: [true, "Please add film description"],
    },
    Review: {
      type: String,
    },
    ReleaseDate: {
      type: String,
      required: [true, "Please add director name"],
    },
    DirectorID: {
      type: Date,
    },
    StudioID: {
      type: Date,
    },
    GenreID: {
      type: Date,
    },
    RunTimeMinutes: {
      type: Date,
    },
    OscarWins: {
      type: Date,
    },
  },
  { timestamps: true } // createdAt ve updatedAt alanlarını otomatik olarak ekler
);

const filmModel = mongoose.model("Film", filmSchema);

module.exports = filmModel;
