const express = require("express");
const Film = require("../models/filmModel");
const axios = require("axios");

const router = express.Router();

/* router.get("/", async (req, res) => {
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
}); */

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;

    const films = await Film.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const totalCount = await Film.countDocuments();

    // Process each film to include director, studio, and genre details
    const filmsWithDetails = await Promise.all(
      films.map(async (film) => {
        const directorID = film.DirectorID;
        const genreID = film.GenreID;
        const studioID = film.StudioID;

        const getDirector = await axios.get(
          `http://localhost:8080/directors/get/d/${directorID}`
        );
        const getGenre = await axios.get(
          `http://localhost:8080/genres/get/g/${genreID}`
        );
        const getStudio = await axios.get(
          `http://localhost:8080/studios/get/s/${studioID}`
        );

        const director = getDirector.data;
        const genre = getGenre.data;
        const studio = getStudio.data;

        return {
          ...film.toObject(),
          DirectorFullName: director ? director.FullName : "Unknown",
          GenreName: genre ? genre.Genre : "Unknown",
          StudioName: studio ? studio.Studio : "Unknown",
        };
      })
    );

    res.set("X-Total-Count", totalCount);
    res.status(200).json(filmsWithDetails); // Yanıt olarak JSON formatında filmleri döndür
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
