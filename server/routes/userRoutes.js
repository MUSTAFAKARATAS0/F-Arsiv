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

// Kullanıcı güncelleme rotası (PUT)
router.put("/update-user", requireSignIn, updateUserController);

// Router'ı dışa aktarın
module.exports = router;
