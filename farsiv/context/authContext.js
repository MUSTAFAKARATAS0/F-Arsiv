import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// AuthContext oluşturma
const AuthContext = createContext();

// AuthProvider
const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null, // Kullanıcı bilgileri
    token: "", // Kimlik doğrulama token'ı
  });

  // Yerel depolama verilerini yükleme
  useEffect(() => {
    const loadAuthData = async () => {
      const data = await AsyncStorage.getItem("@auth"); // Yerel depolamadan veriyi çek
      if (data) {
        const parsedData = JSON.parse(data); // JSON formatını çöz
        setState({ user: parsedData?.user, token: parsedData?.token }); // Küresel durumu güncelle
      }
    };

    loadAuthData();
  }, []);

  // Axios varsayılan ayarları
  if (state.token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`; // Kimlik doğrulama başlığı
  }
  axios.defaults.baseURL = "http://localhost:8080/api/v1"; // API'nin temel URL'si

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children} // Sağlayıcıya geçirilen çocuk bileşenleri
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
