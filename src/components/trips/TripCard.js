<<<<<<< HEAD
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { BASE_URL } from "../../apis/";
import { colors } from "../../utils/colors/colors";
import style from "react-native-datepicker/style";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

// to get the width of the correct region u will work in
const width = Dimensions.get("screen").width / 2 - 30;

const TripCard = ({ title, image, onPress = () => {} }) => {
=======
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
>>>>>>> origin/main
  // const {data:}
  const navigation = useNavigation();
  return (
<<<<<<< HEAD
    <TouchableHighlight
      style={{ flex: 1 }}
      onPress={() => navigation.navigate("TripDetails")}
=======
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
>>>>>>> origin/main
    >
      <View style={style.card}>
        <View style={{ alignItems: "flex-end" }}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: false
                ? "rgba(245, 42, 42,0.2)"
                : "rgba(0,0,0,0.2) ",
            }}
          >
            <Icon
              name="favorite"
              size={18}
              color={false ? colors.red : colors.black}
            />
          </View>
        </View>

<<<<<<< HEAD
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
            top: 0,
            position: "absolute",
            backgroundColor: "#00000070",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
=======
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
>>>>>>> origin/main
  );
};

export default TripCard;

const styles = StyleSheet.create({
  card: {
    height: 225,
    backgroundColor: colors.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
});
