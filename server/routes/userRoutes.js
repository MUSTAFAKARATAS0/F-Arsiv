const express = require("express");
const {
  registerController,
  loginController,
  updateUserController,
  requireSignIn,
} = require("../controllers/userController");

const router = express.Router();

// Kullanıcı kayıt rotası (POST)
router.post("/register", registerController);

// Kullanıcı giriş rotası (POST)
router.post("/login", loginController);

// Router'ı dışa aktarın
module.exports = router;
