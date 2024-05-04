const express = require("express");
const Director = require("../models/directorModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const directors = await Director.find(); // İlk 10 filmi getir // Film modelini kullanarak veritabanından tüm filmleri al
    console.log(Director);
    res.status(200).json(directors); // Yanıt olarak JSON olarak filmleri döndür
  } catch (error) {
    console.error("Yönetmen getirme hatası:", error);
    res.status(500).json({ error: error.message });
  }
});
router.get("/get/:id", async (req, res) => {
  try {
    const director = await Director.find({ DirectorID: req.params.id }); // ID'ye göre kullanıcıyı bul
    if (!director) {
      return res.status(404).send({ error: "Yönetmen bulunamadı" });
    }
    res.status(200).send(director); // Kullanıcıyı döndür
  } catch (error) {
    console.error("Yönetmeni getirme hatası:", error);
    res.status(500).send({ error: error.message }); // Hata mesajını döndür
  }
});

module.exports = router;
