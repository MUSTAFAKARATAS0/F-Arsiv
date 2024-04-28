const express = require("express");
const { createFilmController } = require("../controllers/postController");
const { requireSignIn } = require("../controllers/userController"); // Kimlik doğrulama için varsayılan orta katman

// Router nesnesi
const router = express.Router();

// Yeni Film Oluşturma || POST
router.post("/create-film", requireSignIn, createFilmController);

// Modülü dışa aktarma
module.exports = router;
