const express = require("express");
const Genre = require("../models/genreModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const genre = await Genre.find(); // İlk 10 filmi getir // Film modelini kullanarak veritabanından tüm filmleri al
    console.log(Genre);
    res.status(200).json(genre); // Yanıt olarak JSON olarak filmleri döndür
  } catch (error) {
    console.error("Yönetmen getirme hatası:", error);
    res.status(500).json({ error: error.message });
  }
});
router.get("/get/:id", async (req, res) => {
  const genreObjectId = req.params.id;
  try {
    const genre = await Genre.findById(genreObjectId);
    if (!genre) {
      return res.status(404).send({ error: "Yönetmen bulunamadı" });
    }
    res.status(200).send(genre); // Kullanıcıyı döndür
  } catch (error) {
    console.error("Yönetmeni getirme hatası:", error);
    res.status(500).send({ error: error.message }); // Hata mesajını döndür
  }
});

module.exports = router;
