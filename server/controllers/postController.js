const filmModel = require("../models/postModel");

// Film Oluşturma Kontrolcüsü
const createFilmController = async (req, res) => {
  try {
    const { title, description, director, releaseDate } = req.body;

    // Girdi doğrulama
    if (!title || !description || !director || !releaseDate) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Yeni Film Oluşturma
    const film = await filmModel({
      title,
      description,
      director,
      releaseDate,
    }).save();

    res.status(201).send({
      success: true,
      message: "Film created successfully",
      film,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating film",
      error,
    });
  }
};

module.exports = { createFilmController };
