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
        {/* <View>
          <Text Style={{ fontSize: 25, fontWeight: "bold" }}>Welcome To</Text>
          <Text
            Style={{
              fontSize: "38",
              fontWeight: "bold",
              color: "dark_blue",
            }}
          >
            Bon Voyage
          </Text>
          <Text
            style={{ fontSize: 25, fontWeight: "bold", color: colors.black }}
          >
            The world is a book and those who do not travel read only one page
          </Text>
        </View> */}

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
