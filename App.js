import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthNavigation from "./src/navigation/AuthNavigation";
import { StatusBar, SafeAreaView, StyleSheet, Platform } from "react-native";
import AppNavigation from "./src/navigation/AppNavigation";
// import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import UserContext from "./src/context/UserContext";
import { getToken } from "./src/apis/auth/storage";
const isAndroid = Platform.OS === "android";
export default function App() {
  const [user, setUser] = useState(false);

  const checkToken = () => {
    const token = getToken();
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
