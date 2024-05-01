const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
    },
    FilmID: {
      type: String,
      required: true,
      unique: true,
    },
    Title: {
      type: String,
      required: true,
    },
    ReleaseDate: {
      type: String, // Tarih türü
      required: true,
    },
    Review: {
      type: String,
    },
    DirectorID: {
      type: String, // ID'nin ObjectId olmaması durumunda düz metin
      required: true,
    },
    StudioID: {
      type: String, // ID'nin ObjectId olmaması durumunda düz metin
      required: true,
    },
    GenreID: {
      type: String, // ID'nin ObjectId olmaması durumunda düz metin
      required: true,
    },
    RunTimeMinutes: {
      type: String, // Sayısal değer
      required: true,
    },
    OscarWins: {
      type: String, // Sayısal değer
      default: 0,
    },
  },
  {
    timestamps: true, // Oluşturma ve güncelleme zamanlarını otomatik ekler
  }
);

// Film Modeli

module.exports = mongoose.model("Films", filmSchema);
