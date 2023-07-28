import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BASE_URL } from "../../apis/";

const TripCard = ({
  title,
  image,
  description,
  createdBy,
  onPress = () => {},
}) => {
  // const {data:}
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",

        // borderRadius: 17,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: `${BASE_URL}/${image}`,
        }}
        width="100%"
        height="100%"
      />

      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundColor: "#00000070",
          zIndex: 1,
        }}
      ></View>
      <Text
        style={{
          color: "white",
          zIndex: 2,
          position: "absolute",
          fontSize: 20,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: "white",
          zIndex: 2,
          position: "absolute",
          fontSize: 20,
        }}
      >
        {/* {description} */}
      </Text>
    </View>
  );
};

export default TripCard;

const styles = StyleSheet.create({});
