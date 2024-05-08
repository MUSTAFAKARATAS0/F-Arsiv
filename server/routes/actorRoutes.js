const express = require("express");
const Actor = require("../models/actorModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const actors = await Actor.find(); // İlk 10 filmi getir // Film modelini kullanarak veritabanından tüm filmleri al
    console.log(Actor);
    res.status(200).json(actors); // Yanıt olarak JSON olarak filmleri döndür
  } catch (error) {
    console.error("Aktör getirme hatası:", error);
    res.status(500).json({ error: error.message });
  }
});
router.get("/get/:id", async (req, res) => {
  const actorObjectId = req.params.id;
  try {
    const actors = await Actor.findById(actorObjectId); // ID'ye göre kullanıcıyı bul
    if (!actors) {
      return res.status(404).send({ error: "Yönetmen bulunamadı" });
    }
    res.status(200).send(actors); // Kullanıcıyı döndür
  } catch (error) {
    console.error("Yönetmeni getirme hatası:", error);
    res.status(500).send({ error: error.message }); // Hata mesajını döndür
  }
});

module.exports = router;
