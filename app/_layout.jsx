import React, { useEffect, useState } from "react";

import "../global.css";

import { useFonts } from "expo-font";

import { SplashScreen, Stack } from "expo-router";
import { GlobalProvider } from "../context/GlobalProvider";
import Popup from "../components/popups/MessagePopup";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    RethinkSans: require("../assets/fonts/RethinkSans-VariableFont_wght.ttf"),
    Kablammo: require("../assets/fonts/Kablammo-Regular-VariableFont_MORF.ttf"),
    PublicBlack: require("../assets/fonts/PublicSans-Black.ttf"),
    PublicBold: require("../assets/fonts/PublicSans-Bold.ttf"),
    PublicExtraBold: require("../assets/fonts/PublicSans-ExtraBold.ttf"),
    PublicExtraLight: require("../assets/fonts/PublicSans-ExtraLight.ttf"),
    PublicLight: require("../assets/fonts/PublicSans-Light.ttf"),
    PublicMedium: require("../assets/fonts/PublicSans-Medium.ttf"),
    PublicRegular: require("../assets/fonts/PublicSans-Regular.ttf"),
    PublicSemiBold: require("../assets/fonts/PublicSans-SemiBold.ttf"),
    PublicThin: require("../assets/fonts/PublicSans-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <Popup />
    </GlobalProvider>
  );
};

export default RootLayout;
