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
import ROUTES from "../../navigation/routes";
import { TouchableOpacity } from "react-native-gesture-handler";
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
  console.log("===============>", trips);
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
  const handledescription = () => {
    navigation.navigate(ROUTES.TRIP_DETAILS, { trip: item });
  };
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
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
          backgroundColor: "black",
        }}
        numColumns={2}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              width: 100,
              height: 200,
              padding: 5,
            }}
          >
            <TripCard
              title={item.title}
              image={item.image}
              description={item.description}
              createdBy={item.createdBy}
              onPress={() => {}}
            />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      />
    </>
  );
};

export default TripList;

const styles = StyleSheet.create({});
