import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../context/authContext"; // AuthContext'i içe aktar

const Home = () => {
  const [films, setFilms] = useState([]); // Film verilerini saklamak için
  const [loading, setLoading] = useState(true); // Yükleme durumunu izlemek için
  const [state] = useContext(AuthContext); // AuthContext'ten kullanıcı durumunu al

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get("/film/get-films");
        setFilms(response.data.films); // Verileri duruma kaydet
      } catch (error) {
        console.error("Error fetching films:", error);
        Alert.alert("Error", "Unable to fetch films"); // Hata yönetimi
      } finally {
        setLoading(false); // Yükleme tamamlandı
      }
    };

    fetchFilms(); // Bileşen yüklendiğinde verileri çek
  }, []); // Bağımlılık olmadan çalışır

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ); // Yükleme devam ediyorsa
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
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
