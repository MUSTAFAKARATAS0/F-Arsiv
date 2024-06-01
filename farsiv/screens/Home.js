import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import FilmCard from "../components/FilmCard";
import FooterMenu from "../components/Menus/FooterMenu";

const PAGE_SIZE = 20;

const Home = () => {
  const [films, setFilms] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const scrollViewRef = useRef();

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const response = await axios.get("http://192.168.0.220:8080/directors");
        setDirectors(response.data);
      } catch (error) {
        console.error("Error fetching directors:", error);
        Alert.alert("Error", "Unable to fetch directors");
      }
    };

    fetchDirectors();
  }, []);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.220:8080/films?page=${currentPage}&pageSize=${PAGE_SIZE}`
        );
        const filmsWithDirectors = response.data.map((film) => {
          const director = directors.find(
            (dir) => dir.DirectorID === film.DirectorID
          );
          return {
            ...film,
            DirectorName: director ? director.FullName : "bozkurt ordusu",
          };
        });
        setFilms(filmsWithDirectors);
        const totalFilmsCount = response.headers["x-total-count"];
        const totalPagesCount = Math.ceil(totalFilmsCount / PAGE_SIZE);
        setTotalPages(totalPagesCount);
      } catch (error) {
        console.error("Error fetching films:", error);
        Alert.alert("Error", "Unable to fetch films");
      } finally {
        setLoading(false);
      }
    };

    if (directors.length > 0) {
      fetchFilms();
    }
  }, [currentPage, directors]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef}>
        {films.length > 0 ? (
          films.map((film, index) => <FilmCard key={index} film={film} />)
        ) : (
          <Text>No films found.</Text>
        )}
      </ScrollView>
      <View style={styles.pagination}>
        <TouchableOpacity
          style={styles.pageButton}
          onPress={handlePrevPage}
          disabled={currentPage === 1}
        >
          <Text>Previous</Text>
        </TouchableOpacity>
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <TouchableOpacity
          style={styles.pageButton}
          onPress={handleNextPage}
          disabled={films.length < PAGE_SIZE}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  pageButton: {
    padding: 10,
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
  },
});

export default Home;
