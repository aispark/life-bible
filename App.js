import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { AsyncStorage } from "react-native";
import { ThemeProvider } from "styled-components";
import styles from "@/styles";
import { AppProvider } from "@/AppContext";
import MainNavigation from "@/navigation/MainNavigation";
import i18n from "@/i18n";
import loadBible from "@/loadBible";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState({});
  const [targetBible, setTargetBible] = useState({});

  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font
      });
      await Asset.loadAsync([require("./assets/icon.png")]);

      const { bible, bibleVersion } = await loadBible();

      setTargetBible({
        bible,
        bibleVersion
      });

      const themeName = (await AsyncStorage.getItem("themeName")) || "light";

      themeName === "dark" ? setTheme(styles.DARK) : setTheme(styles.LIGHT);

      setLoaded(true);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    preLoad();
  }, []);

  return loaded ? (
    <ThemeProvider theme={theme}>
      <AppProvider
        targetBible={targetBible}
        setTargetBible={setTargetBible}
        theme={theme}
        setTheme={setTheme}
      >
        <MainNavigation />
      </AppProvider>
    </ThemeProvider>
  ) : (
    <AppLoading />
  );
}
