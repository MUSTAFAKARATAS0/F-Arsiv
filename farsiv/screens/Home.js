import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext"; // AuthContext'i içe aktar
import FooterMenu from "../components/Menus/FooterMenu";

const Home = () => {
  const [films, setFilms] = useState([]); // Film verilerini saklamak için dizi
  const [loading, setLoading] = useState(true); // Yükleme durumunu izlemek için
  const [state] = useContext(AuthContext); // AuthContext'ten kullanıcı durumunu al

  // Film verilerini çekme
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const { data } = await axios.get("/film/get-films"); // API rotasından veri çek
        setFilms(data.films); // Verileri duruma kaydet
        setLoading(false); // Yükleme tamamlandı
      } catch (error) {
        console.error("Error fetching films:", error);
        setLoading(false); // Yükleme hatası
      }
    };

    fetchFilms(); // Verileri çek
  }, []); // Bileşen yüklendiğinde çalışır

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ); // Yükleme devam ediyorsa gösterilecek
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {films.length > 0 ? (
          films.map((film, index) => (
            <View key={index} style={styles.filmContainer}>
              <Text style={styles.filmTitle}>{film.title}</Text>
              <Text>{film.description}</Text>
              <Text>{`Directed by: ${film.director}`}</Text>
              <Text>{`Release Date: ${film.releaseDate}`}</Text>
            </View>
          ))
        ) : (
          <Text>No films found.</Text> // Veri yoksa
        )}
      </ScrollView>
      <FooterMenu /> // Alt menüyü ekler
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 40,
    justifyContent: "space-between",
  },
  filmContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  filmTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;
