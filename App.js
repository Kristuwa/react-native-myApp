import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";

import useRoute from "./router";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/Fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/Fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/Fonts/Roboto-Regular.ttf"),
  });
  const routing = useRoute(null);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}
