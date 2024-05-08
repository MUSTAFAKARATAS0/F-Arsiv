// genre.model.js
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  GenreID: {
    type: String,
    required: true,
    unique: true, // Her türün benzersiz bir kimliği olmalı
  },
  Genre: {
    type: String,
    required: true, // Tür ismi boş olamaz
  },
});

// Şemayı bir model olarak kaydedin

module.exports = mongoose.model("genres", genreSchema);
