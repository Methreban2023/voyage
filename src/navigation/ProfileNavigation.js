import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ROUTES from "./routes";
import Profile from "../screens/Profile";
import EditProfile from "../screens/EditProfile";
const Stack = createStackNavigator();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerTitle: "Test", headerShown: false }}
    >
      <Stack.Screen
        name={ROUTES.APPROUTES.PROFILE}
        component={Profile}
        options={{
          headerTitle: () => (
            <TouchableOpacity
              onPress={() => {
                removeToken();
                setUser(false);
              }}
            >
              <AntDesign name="logout" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerShown: false,
        }}
        screenOptions={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.APPROUTES.EDITPROFILE}
        component={EditProfile}
        options={{ headerShown: false }}
        screenOptions={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;

const styles = StyleSheet.create({});
