import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ROUTES from "./routes";
import Home from "../screens/Home";
import TripDetails from "../screens/TripDetails";
import Profile from "../screens/Profile";
import UpdateTrip from "../screens/UpdateTrip";

const Stack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerTitle: "Test", headerShown: false }}
    >
      <Stack.Screen name={ROUTES.APPROUTES.HOME} component={Home} />
      <Stack.Screen name={"updateTrip"} component={UpdateTrip} />
      <Stack.Screen
        name={ROUTES.APPROUTES.TRIPDETAILS}
        component={TripDetails}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});
