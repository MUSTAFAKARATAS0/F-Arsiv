import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// AuthContext'i oluştur
const AuthContext = createContext();

// AuthProvider
const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const data = await AsyncStorage.getItem("@auth");
        if (data) {
          const parsedData = JSON.parse(data);
          setState({ user: parsedData?.user, token: parsedData?.token });
        }
      } catch (error) {
        console.error("Error loading auth data:", error);
      }
    };

    loadAuthData();
  }, []);

  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
    axios.defaults.baseURL = "http://192.168.1.123"; // Temel URL'yi ayarla
  }, [state.token]); // Token değiştiğinde tekrar çalıştır

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
