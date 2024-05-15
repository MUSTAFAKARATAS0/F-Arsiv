const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const { expressjwt: jwt } = require("express-jwt");
const dotenv = require("dotenv");
dotenv.config();

// Middleware
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

// Kullanıcı kaydı
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Geçerlilik kontrolleri
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Name, Email ve Password gereklidir",
      });
    }

    if (password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Şifre en az 6 karakter uzunluğunda olmalıdır",
      });
    }

    // Var olan kullanıcıyı kontrol et
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Bu email ile zaten kayıtlı kullanıcı var",
      });
    }

    // Şifreyi hashle
    const hashedPassword = await hashPassword(password);

    // Yeni kullanıcıyı kaydet
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).send({
      success: true,
      message: "Kayıt başarılı",
    });
  } catch (error) {
    console.error("Kayıt hatası:", error);
    return res.status(500).send({
      success: false,
      message: "Kayıt API'sinde hata",
    });
  }
};

// Kullanıcı giriş
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email ve Şifre gereklidir",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    // Şifreyi karşılaştır
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Geçersiz şifre",
      });
    }

    // JWT oluştur
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Başarıyla giriş yapıldı",

      user,
    });
  } catch (error) {
    console.error("Giriş API'sinde hata:", error);
    return res.status(500).send({
      success: false,
      message: "Giriş API'sinde hata",
    });
  }
};
/*  --KULLANICI GÜNCELLEME--
const updateUserController = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    // Var olan kullanıcıyı bul
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Şifre en az 6 karakter olmalıdır",
      });
    }

    // Yeni şifre varsa hashle
    const hashedPassword = password
      ? await hashPassword(password)
      : user.password;

    // Kullanıcıyı güncelle
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        password: hashedPassword,
      },
      { new: true }
    );

    updatedUser.password = undefined; // Şifreyi yanıt içinde göstermeyin

    res.status(200).send({
      success: true,
      message: "Profil başarıyla güncellendi",
      updatedUser,
    });
  } catch (error) {
    console.error("Kullanıcı güncelleme hatası:", error);
    res.status(500).send({
      success: false,
      message: "Kullanıcı güncelleme API'sinde hata",
      error,
    });
  }
};
*/
module.exports = {
  registerController,
  loginController,
  //updateUserController
  requireSignIn,
};
