const express = require("express");
const Film = require("../models/filmModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const films = await Film.find(); // İlk 10 filmi getir // Film modelini kullanarak veritabanından tüm filmleri al
    console.log(Film);
    res.status(200).json(films); // Yanıt olarak JSON olarak filmleri döndür
  } catch (error) {
    console.error("Filmleri getirme hatası:", error);
    res.status(500).json({ error: error.message });
  }
});
router.get("/get/:id", async (req, res) => {
  try {
    const film = await Film.find({ FilmID: req.params.id }); // ID'ye göre kullanıcıyı bul
    if (!film) {
      return res.status(404).send({ error: "Film bulunamadı" });
    }
    res.status(200).send(film); // Kullanıcıyı döndür
  } catch (error) {
    console.error("Filmi getirme hatası:", error);
    res.status(500).send({ error: error.message }); // Hata mesajını döndür
  }
});

module.exports = router; // Rota modülünü dışa aktar
