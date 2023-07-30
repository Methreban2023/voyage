import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import TripList from "../components/trips/TripList";
import { colors } from "../utils/colors/colors";
const Home = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <View
        style={{
          flex: 1,

          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: "30", fontWeight: "bold" }}>Bon Voyage</Text>
        </View>

        {/* TripsList */}
        <View style={{ flex: 1, width: "100%" }}>
          <View style={{ flex: 1 }}>
            <TripList />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  searchContainer: {
    height: 50,
    backgroundColor: colors.lightgray,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: "18",
    fontWeight: "bold",
    color: colors.darkgray,
    flex: 1,
  },
});
