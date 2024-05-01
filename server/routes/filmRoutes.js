const express = require("express");

const router = express.Router();

/*router.get("/", async (req, res) => {
  try {
    const films = await Film.find(); // İlk 10 filmi getir // Film modelini kullanarak veritabanından tüm filmleri al
    console.log(Film);
    res.status(200).json(films); // Yanıt olarak JSON olarak filmleri döndür
  } catch (error) {
    console.error("Filmleri getirme hatası:", error);
    res.status(500).json({ error: error.message });
  }
});

/* router.post("/add", async (req, res) => {
  try {
    const film = await Films.add(req.body); // Film modelini kullanarak veritabanından tüm filmleri al
    res.status(200).json(film); // Yanıt olarak JSON olarak filmleri döndür
  } catch (error) {
    console.error("Filmleri getirme hatası:", error);
    res.status(500).json({ error: error.message });
  }
}); */

module.exports = router; // Rota modülünü dışa aktar
