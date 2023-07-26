import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ROUTES from "./routes";
import { TripCard } from "../screens/TripCard";

const Stack = createStackNavigator();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{ headerTitle: "Test", headerShown: false }}
    >
      <Stack.Screen name={ROUTES.APPROUTES.CARD} component={TripCard} />
    </Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
