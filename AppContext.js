import React, { createContext, useContext, useState } from "react";
import { AsyncStorage } from "react-native";
import styles from "@/styles";
import * as FileSystem from "expo-file-system";

export const AppContext = createContext();

export const AppProvider = ({
  targetBible,
  setTargetBible,
  theme,
  setTheme,
  children
}) => {
  const handleTheme = async themeName => {
    await AsyncStorage.setItem("themeName", themeName);
    if (themeName === "light") setTheme(styles.LIGHT);
    else if (themeName === "dark") setTheme(styles.DARK);
  };

  const handleBible = async bibleVersion => {
    let bible;
    if (bibleVersion) {
      if (bibleVersion === "krv") {
        // bible = (await import("@/resources/krv")).default;
        const bibleString = await FileSystem.readAsStringAsync(
          `${FileSystem.documentDirectory}life-bible/krv.txt`
        );
        bible = new Function(`return ${bibleString};`)();
      } else if (bibleVersion === "kjv") {
        // bible = (await import("@/resources/kjv")).default;
        const bibleString = await FileSystem.readAsStringAsync(
          `${FileSystem.documentDirectory}life-bible/kjv.txt`
        );
        bible = new Function(`return ${bibleString};`)();
      }
    }

    setTargetBible({
      bible,
      bibleVersion
    });
  };

  return (
    <AppContext.Provider
      value={{ targetBible, handleBible, theme, handleTheme }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useTheme = () => {
  const { theme } = useContext(AppContext);
  return theme;
};

export const useHandleTheme = () => {
  const { handleTheme } = useContext(AppContext);
  return handleTheme;
};

export const useBible = () => {
  const { targetBible } = useContext(AppContext);
  return targetBible;
};

export const useHandleBible = () => {
  const { handleBible } = useContext(AppContext);
  return handleBible;
};
