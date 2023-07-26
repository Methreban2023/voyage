import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TripCard from "../components/trips/TripCard";

const Home = ({ navigation }) => {
  return (
    <View>
      <TripCard />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
