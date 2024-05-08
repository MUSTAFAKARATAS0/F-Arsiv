const express = require("express");
const Studio = require("../models/studioModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const studios = await Studio.find(); // İlk 10 filmi getir // Film modelini kullanarak veritabanından tüm filmleri al
    console.log(Studio);
    res.status(200).json(studios); // Yanıt olarak JSON olarak filmleri döndür
  } catch (error) {
    console.error("Yönetmen getirme hatası:", error);
    res.status(500).json({ error: error.message });
  }
});
router.get("/get/:id", async (req, res) => {
  const studioObjectId = req.params.id;
  try {
    const studio = await Studio.findById(studioObjectId);
    if (!studio) {
      return res.status(404).send({ error: "Yönetmen bulunamadı" });
    }
    res.status(200).send(studio); // Kullanıcıyı döndür
  } catch (error) {
    console.error("Yönetmeni getirme hatası:", error);
    res.status(500).send({ error: error.message }); // Hata mesajını döndür
  }
});

module.exports = router;
