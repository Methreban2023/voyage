import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import TripList from "../components/trips/TripList";
import FilterList from "../components/filter/FilterList";

const Trip = () => {
  const [selectedTrips, setSelectedTrips] = useState([]);
  const handleAddTrip = (trip) => {
    const isFound = selectedTrips.find((trip) => trip.title);
    if (isFound) {
      selectedTrips(selectedTrips.filter((trip) => trip != trip.title));
    } else {
      setSelectedTrips([...selectedTrips, trip.title]);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.15 }}>
        <TripList />
      </View>

      {setSelectedTrips.length != 0 ? (
        <View>
          <View style={{ flex: 0.08 }}>
            <FilterList list={setSelectedTrips} />
          </View>

          <View style={{ flex: 0.77 }}></View>
        </View>
      ) : (
        <View style={{ flex: 0.85 }}></View>
      )}
    </View>
  );
};

export default Trip;

const styles = StyleSheet.create({});
