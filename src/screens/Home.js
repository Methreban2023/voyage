import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import TripList from "../components/trips/TripList";
import FilterList from "../components/filter/FilterList";
import { Searchbar } from "react-native-paper";
import { colors } from "../utils/colors/colors";
import style from "react-native-datepicker/style";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
const Home = ({ navigation }) => {
  const [selectedTrips, setSelectedTrips] = useState([]);
  const handleAddTrip = (title) => {
    const isFound = selectedTrips.find((trip) => trip == title);
    if (isFound) {
      setSelectedTrips(selectedTrips.filter((trip) => trip != title));
    } else {
      setSelectedTrips([...selectedTrips, title]);
    }
  };
  const removeFromTrips = (title) => {
    setSelectedTrips(selectedTrips.filter((trip) => trip != title));
  };

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
        <View>
          <Text Style={{ fontSize: 25, fontWeight: "bold" }}>Welcome To</Text>
          <Text
            Style={{
              fontSize: 38,
              fontWeight: "bold",
              color: colors.dark_blue,
            }}
          >
            Bon Voyage
          </Text>
          <Text
            style={{ fontSize: 25, fontWeight: "bold", color: colors.black }}
          >
            The world is a book and those who do not travel read only one page
          </Text>
        </View>

        {/* TripsList */}
        <View style={{ flex: 1, width: "100%" }}>
          <View style={{ flex: 1 }}>
            <TripList handleAddTrip={handleAddTrip} />
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
