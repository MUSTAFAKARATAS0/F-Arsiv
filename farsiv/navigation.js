import { View, Text } from "react-native";
import React from "react";
import { AuthProvider } from "./context/authContext";
import ScreenMenu from "./components/Menus/ScreenMenu";

const RootNavigation = () => {
  return (
    <Text>
      <AuthProvider>
        <Text>
          <ScreenMenu />
        </Text>
      </AuthProvider>
    </Text>
  );
};

export default RootNavigation;
