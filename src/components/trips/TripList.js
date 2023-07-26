import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import React from "react";

import TripCard from "../trips/TripCard";
import { useQuery } from "@tanstack/react-query";
import { getAllTrips } from "../../apis/trips";

const TripList = ({ handleAddTrip }) => {
  const {
    data: trips,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: () => getAllTrips(),
  });
  // console.log(trips);
  if (trips?.length == 0)
    return (
      <ScrollView contentContainerStyle={{ padding: 5, gap: 5 }}>
        <View style={{ width: 150 }}>
          <TripCard
            title="Empty"
            image={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpsbbfdOYmsxB3yf6a1YbC8auRHG7o9Ta4xw&usqp=CAU"
            }
          />
        </View>
      </ScrollView>
    );

  return (
    <FlatList
      data={trips}
      numColumns={2}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1,
            width: 100,
            height: 200,
          }}
        >
          <TripCard title={item.title} image={item.image} />
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
      contentContainerStyle={{
        backgroundColor: "red",
      }}
    />
    // <ScrollView
    //   refreshControl={
    //     <RefreshControl refreshing={isFetching} onRefresh={refetch} />
    //   }
    //   contentContainerStyle={{
    //     padding: 5,
    //     gap: 5,

    //     backgroundColor: "red",
    //   }}
    // >
    //   <Text>Hello</Text>

    //   {trips?.map((trip) => (
    //     <View style={{ width: 150, height: 150 }} key={trip._id}>
    //       <TripCard
    //         title={trip.title}
    //         image={trip.image}
    //         // description={trip.description}
    //         onPress={handleAddTrip}
    //       />
    //     </View>
    //   ))}
    // </ScrollView>
  );
};

export default TripList;

const styles = StyleSheet.create({});
