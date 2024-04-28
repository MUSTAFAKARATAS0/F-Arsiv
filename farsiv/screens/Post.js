import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import FooterMenu from "../components/Menus/FooterMenu";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";

const CreateFilm = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [director, setDirector] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateFilm = async () => {
    try {
      setLoading(true);

      if (!title || !description || !director) {
        alert("Please provide all required fields.");
        setLoading(false);
        return;
      }

      const { data } = await axios.post("/api/v1/film/create-film", {
        title,
        description,
        director,
        releaseDate,
      });

      setLoading(false);
      alert(data.message);
      navigation.navigate("Home");
    } catch (error) {
      alert(error.response.data.message || error.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.heading}>Create a Film</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Film title"
            placeholderTextColor={"gray"}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Film description"
            placeholderTextColor={"gray"}
            multiline={true}
            numberOfLines={6}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Director name"
            placeholderTextColor={"gray"}
            value={director}
            onChangeText={(text) => setDirector(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Release date (YYYY-MM-DD)"
            placeholderTextColor={"gray"}
            value={releaseDate}
            onChangeText={(text) => setReleaseDate(text)}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.createBtn} onPress={handleCreateFilm}>
            <Text style={styles.createBtnText}>
              <FontAwesome5 name="plus-square" size={18} /> {"   "}
              Create Film
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    marginTop: 40,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inputBox: {
    backgroundColor: "#ffffff",
    textAlignVertical: "top",
    width: 320,
    paddingTop: 10,
    marginTop: 30,
    fontSize: 16,
    paddingLeft: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  createBtn: {
    backgroundColor: "black",
    width: 300,
    marginTop: 30,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  createBtnText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreateFilm;
