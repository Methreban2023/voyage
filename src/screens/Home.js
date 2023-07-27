import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import TripList from "../components/trips/TripList";
import FilterList from "../components/filter/FilterList";
import { Searchbar } from "react-native-paper";
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
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <TripList handleAddTrip={handleAddTrip} />
      </View>

      {/* {selectedTrips.length != 0 ? (
        <View>
          <View style={{ flex: 0.08 }}>
            <FilterList list={selectedTrips} onPress={removeFromTrips} />
          </View>

          <View style={{ flex: 0.77 }}></View>
        </View>
      ) : (
        <View style={{ flex: 0.85 }}></View>
      )} */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
