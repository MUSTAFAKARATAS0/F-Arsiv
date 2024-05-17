import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"; // react-navigation kullanarak navigasyon yönlendirmesi için

const HeaderMenu = () => {
  const [stack, setState] = useContext(AuthContext);
  const navigation = useNavigation(); // Navigation hook'unu kullanarak navigasyonu al

  //logout
  const hendleLogout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
    alert("logout successfully");
    navigation.navigate("Login"); // Çıkış yapıldıktan sonra giriş ekranına yönlendirme yap
  };

  return (
    <View>
      <TouchableOpacity onPress={hendleLogout}>
        <FontAwesome5
          name="sign-out-alt"
          color={"red"}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 25,
  },
});

export default HeaderMenu;
