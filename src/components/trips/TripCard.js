import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BASE_URL } from "../../apis/";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../navigation/routes";

const TripCard = ({
  title,
  image,
  description,
  createdBy,
  onPress = () => {},
}) => {
  const navigation = useNavigation();
  // const {data:}
  return (
    <Pressable
      onPress={() => {
        navigation.navigate(ROUTES.APPROUTES.TRIPDETAILS);
      }}
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
    </Pressable>
  );
};

export default TripCard;

const styles = StyleSheet.create({});
