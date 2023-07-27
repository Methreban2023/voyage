import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-web";

const TripCard = ({ trip }) => {
  return (
    <TouchableOpacity style={styles.tripCard}>
      <Text style={{ flex: 1, alignItems: "center" }}>{trip.title}</Text>
      <Image source={trip.image} style={{ hieght: 228, width: "100%" }} />
      <Text style={{ flex: 1, alignItems: "center" }}>{trip.description}</Text>
      <View>{styles.tripInfo}</View>
    </TouchableOpacity>
  );
};

export default TripCard;

const styles = StyleSheet.create({});
