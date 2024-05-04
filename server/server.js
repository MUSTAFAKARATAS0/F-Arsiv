// Gerekli modülleri yükleyin
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const User = require("../server/models/userModel");
const connectDB = require("./config/db");
const filmRoutes = require("./routes/filmRoutes");
const directorRoutes = require("./routes/directorRoutes");

dotenv.config();

const app = express(); // Express uygulamasını başlat

connectDB();
app.use(bodyParser.json());

app.use("/films", filmRoutes);

app.use("/directors", directorRoutes);

// Tüm kullanıcıları alma (Read)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Tüm kullanıcıları getir
    res.status(200).send(users); // Kullanıcı listesini döndür
  } catch (error) {
    console.error("Kullanıcıları getirme hatası:", error);
    res.status(500).send({ error: error.message }); // Hata mesajını döndür
  }
});
// Kullanıcı oluşturma (Create)
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body); // Gönderilen veriyi kullanarak yeni bir kullanıcı oluştur
    await user.save(); // Kullanıcıyı veritabanına kaydet
    res.status(201).send(user); // Başarıyla kaydedilen kullanıcıyı döndür
  } catch (error) {
    console.error("Kullanıcı oluşturma hatası:", error);
    res.status(400).send({ error: error.message }); // Hata mesajını döndür
  }
});

// "/films" rotası altında film rotalarını kullan

// Belirli bir kullanıcıyı alma (Read by ID)
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // ID'ye göre kullanıcıyı bul
    if (!user) {
      return res.status(404).send({ error: "Kullanıcı bulunamadı" });
    }
    res.status(200).send(user); // Kullanıcıyı döndür
  } catch (error) {
    console.error("Kullanıcıyı getirme hatası:", error);
    res.status(500).send({ error: error.message }); // Hata mesajını döndür
  }
});

// Kullanıcı güncelleme (Update)
app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Güncelleme sırasında şema doğrulaması yap
    });
    if (!user) {
      return res.status(404).send({ error: "Kullanıcı bulunamadı" });
    }
    res.status(200).send(user); // Güncellenmiş kullanıcıyı döndür
  } catch (error) {
    console.error("Kullanıcıyı güncelleme hatası:", error);
    res.status(400).send({ error: error.message }); // Hata mesajını döndür
  }
});

// Kullanıcı silme (Delete)
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // ID'ye göre kullanıcıyı sil
    if (!user) {
      return res.status(404).send({ error: "Kullanıcı bulunamadı" }); // Kullanıcı yoksa hata döndür
    }
    res.status(200).send({ message: "Kullanıcı başarıyla silindi" }); // Başarıyla silinen kullanıcı mesajını döndür
  } catch (error) {
    console.error("Kullanıcıyı silme hatası:", error);
    res.status(500).send({ error: error.message }); // Hata mesajını döndür
  }
});

// Uygulamayı çalıştır
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
