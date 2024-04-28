const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Çevresel Değişkenleri Yükleme
dotenv.config();

// MongoDB Bağlantısı
connectDB(); // MongoDB bağlantısını sağlar

// REST Nesnesi
const app = express();

// Orta Katmanlar
app.use(cors()); // CORS izinlerini ayarlar
app.use(express.json()); // JSON işleyiciyi etkinleştirir
app.use(morgan("dev")); // HTTP isteklerini loglar

// Rotalar
app.use("/api/v1/auth", require("./routes/userRoutes")); // Kullanıcı kimlik doğrulama
app.use("/api/v1/post", require("./routes/postRoutes")); // Film ile ilgili rotalar

// PORT Ayarlama
const PORT = process.env.PORT || 8080;

// Sunucu Başlatma
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgGreen.white);
});
