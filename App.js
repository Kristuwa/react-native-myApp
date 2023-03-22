import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import useRoute from "./router";
import { store } from "./redux/store";
import { authFirebase } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  const [userAuth, setUser] = useState(null);
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/Fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/Fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/Fonts/Roboto-Regular.ttf"),
  });

  onAuthStateChanged(authFirebase, (user) => {
    setUser(user);
  });

  const routing = useRoute(userAuth);

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

  return (
    <Provider store={store}>
      <RootSiblingParent>
        <NavigationContainer>{routing}</NavigationContainer>
      </RootSiblingParent>
    </Provider>
  );
}
