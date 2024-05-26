import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const HeaderMenu = () => {
  const [stack, setState] = useContext(AuthContext);
  const navigation = useNavigation();

  //logout
  const hendleLogout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
    alert("logout successfully");
    navigation.navigate("Login");
  };

  useEffect(() => {
    // Kullanıcı çıkış yaptıktan sonra giriş ekranındaki giriş bilgilerini temizle
    return () => {
      navigation.reset({
        // Ekran geçmişini temizler
        index: 0,
        routes: [{ name: "Login" }],
      });
    };
  }, []); // Sadece bileşen ilk kez oluşturulduğunda çalışır

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
  iconStyle: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 25,
  },
});

export default HeaderMenu;
