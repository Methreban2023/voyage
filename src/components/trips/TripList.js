import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import React from "react";
import FilterList from "../filter/FilterList";
import TripCard from "../trips/TripCard";
import { useQuery } from "@tanstack/react-query";
import { getAllTrips } from "../../apis/trips";
import { useState } from "react";
const TripList = ({ handleAddTrip }) => {
  const [query, setQuery] = useState("");
  const {
    data: trips,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: () => getAllTrips(),
  });

  if (trips?.length == 0)
    return (
      <>
        <FilterList setQuery={setQuery} />
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
      </>
    );

  return (
    <>
      <FilterList setQuery={setQuery} />
      <FlatList
        data={trips?.filter((trip) => {
          if (trip.title.toLowerCase().includes(query.toLowerCase())) {
            console.log(trip);
            return true;
          } else return false;
        })}
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
    </>
    // ScrollView
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
