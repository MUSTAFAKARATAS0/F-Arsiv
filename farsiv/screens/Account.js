import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import { useNavigation } from "@react-navigation/native";

const Account = () => {
  const [state, setState] = useContext(AuthContext);
  const { user } = state;

  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState(user.password);
  const [email] = useState(user.email); // email değiştirilemeyecek şekilde olduğu için sadece state içinde tutuluyor
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation(); // Navigation hook'unu her renderda al

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://192.168.8.220:8080/users/update`,
        {
          name,
          password,
          email,
        }
      );
      setLoading(false);

      const data = response.data;

      if (!data) {
        // Sunucudan gelen hata varsa
        alert("Hata");
      } else {
        // Güncelleme başarılıysa
        setState({ ...state, user: data });
        alert("Başarılı");
        navigation.navigate("Login"); // Login ekranına yönlendir
      }
    } catch (error) {
      // Axios hata durumu
      if (error.response && error.response.data && error.response.data.error) {
        // Sunucudan gelen hata varsa
        alert(error.response.data.error);
      } else {
        // Diğer hatalar
        alert("Bir hata oluştu, lütfen tekrar deneyin.");
      }
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
            }}
            style={{ height: 200, width: 200, borderRadius: 100 }}
          />
        </View>
        <Text style={styles.warningText}>
          Currently You Can Only Update Your Name And Password*
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Name</Text>
          <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput style={styles.inputBox} value={email} editable={false} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Role</Text>
          <TextInput
            style={styles.inputBox}
            value={state.user.role}
            editable={false}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
            <Text style={styles.updateBtnText}>
              {loading ? "please wait " : "Update Profile"}
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
    marginTop: 40,
    justifyContent: "space-between",
  },
  warningText: {
    color: "red",
    fontSize: 13,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontWeight: "bold",
    width: 70,
    color: "gray",
  },
  inputBox: {
    width: 250,
    backgroundColor: "#ffffff",
    marginLeft: 10,
    fontSize: 16,
    paddingLeft: 20,
    borderRadius: 5,
  },
  updateBtn: {
    backgroundColor: "black",
    color: "white",
    height: 40,
    width: 250,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  updateBtnText: {
    color: "#ffffff",
    fontSize: 18,
  },
});

export default Account;
