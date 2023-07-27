import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar, SafeAreaView, StyleSheet, Platform } from "react-native";
import { useEffect, useState } from "react";
import UserContext from "./src/context/UserContext";
import { getToken } from "./src/apis/auth/storage";
// import * as SplashScreen from "expo-splash-screen";
import AppNavigation from "./src/navigation/AppNavigation";
// import { useFonts } from "expo-font";
// import { useCallback } from "react";

// const isAndroid = Platform.OS === "android";

// SplashScreen.preventAutoHideAsync();
export default function App() {
  // const [fontsLoaded] = useFonts({
  //   // black: require("./assets/fonts/Inter-Black.ttf"),
  //   // bold: require("./assets/fonts/Inter-Bold.ttf"),
  //   // medium: require("./assets/fonts/Inter-Medium.ttf"),
  //   // regular: require("./assets/fonts/Inter-Regular.ttf"),
  //   // semiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
  // });
  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  const [user, setUser] = useState(false);

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      setUser(true);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <UserContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <AppNavigation />
          </SafeAreaView>
        </NavigationContainer>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#000000",
    marginTop: StatusBar.currentHeight,
  },
});
