import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ROUTES from "./routes";

const TripNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerTitle: "Test", headerShown: false }}
    >
      <Stack.Screen
        name={ROUTES.APPROUTES.TRIPDETAILS}
        component={TripDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default TripNavigation;

const styles = StyleSheet.create({});
