import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";

const Home = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get("/Film"); // Doğru rota
        setFilms(response.data); // Verileri duruma kaydet
      } catch (error) {
        console.error("Error fetching films:", error);
        Alert.alert("Error", "Unable to fetch films");
      } finally {
        setLoading(false);
      }
    };

    fetchFilms(); // Bileşen yüklendiğinde verileri çek
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {films.length > 0 ? (
          films.map((film, index) => (
            <View key={index} style={styles.filmContainer}>
              <Text style={styles.filmTitle}>{film.Title}</Text>
              <Text>{film.Review}</Text>
              <Text>{`Directed by: ${film.DirectorID}`}</Text>
              <Text>{`Release Date: ${new Date(
                film.ReleaseDate
              ).toDateString()}`}</Text>
            </View>
          ))
        ) : (
          <Text>No films found.</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
