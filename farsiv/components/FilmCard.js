import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FilmCard = ({ film }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.filmTitle}>{film.Title}</Text>
      <Text style={styles.review}>Review: {film.Review}</Text>
      <Text style={styles.director}>Directed by: {film.DirectorID}</Text>
      <Text style={styles.date}>
        Release Date: {new Date(film.ReleaseDate).toDateString()}
      </Text>
      <Text style={styles.oscar}>Oscar Wins: {film.OscarWins}</Text>
      <Text style={styles.genre}>Genre: {film.GenreID}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  filmTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  review: {
    fontSize: 16,
    marginBottom: 5,
    color: "gray",
  },
  director: {
    fontSize: 16,
    marginBottom: 5,
    color: "darkblue",
  },
  date: {
    fontSize: 16,
    marginBottom: 5,
    color: "darkgreen",
  },
  oscar: {
    fontSize: 16,
    marginBottom: 5,
    color: "darkred",
  },
  genre: {
    fontSize: 16,
    color: "purple",
  },
});

export default FilmCard;
