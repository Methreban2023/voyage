import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../utils/colors/colors";
import TripDetailsCard from "../components/trips/TripDetailsCard";
const TripDetails = ({ route }) => {
  const { createdBy, description, title, image } = route.params;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 22,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
          flex: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <TripDetailsCard {...{ createdBy, description, title, image }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TripDetails;

const styles = StyleSheet.create({});
