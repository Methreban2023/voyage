import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

import TripCard from "../trips/TripCard";
import { useQuery } from "@tanstack/react-query";
import { getAllTrips } from "../../apis/trips";

const TripList = ({ handleAddTrip }) => {
  const { data: trips, isLoading } = useQuery({
    queryKey: ["trips"],
    queryFn: () => getAllTrips(),
  });

  if (trips?.length == 0)
    return (
      <ScrollView horizontal contentContainerStyle={{ padding: 5, gap: 5 }}>
        <View style={{ width: 150 }}>
          <TripCard
            name="Empty"
            image={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpsbbfdOYmsxB3yf6a1YbC8auRHG7o9Ta4xw&usqp=CAU"
            }
          />
        </View>
      </ScrollView>
    );
  return (
    <ScrollView horizontal contentContainerStyle={{ padding: 5, gap: 5 }}>
      {trips?.map((trip) => (
        <View style={{ width: 150 }} key={trip._id}>
          <TripCard
            title={trip.title}
            image={trip.image}
            // description={trip.description}
            onPress={handleAddTrip}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default TripList;

const styles = StyleSheet.create({});
