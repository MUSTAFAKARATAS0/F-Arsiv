const express = require("express");
const Film = require("../models/filmModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const films = await Film.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    const totalCount = await Film.countDocuments();
    res.set("X-Total-Count", totalCount);
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
