import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import { BASE_URL } from "../../apis/";
import { deleteTrip, updateTrip } from "../../apis/trips";
import { colors } from "../../utils/colors/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import style from "react-native-datepicker/style";
const width = dimentions.get("screen").width / 2 - 30;

const TripDetails = ({ navigation, title, image, onPress = () => {} }) => {
  return (
    <View>
      <TouchableHighlight>
        <View>
          <View style={style.card}>
            {/* add favorite heart icon - if user add to favorite */}
            <View style={{ alignItems: "flex-end" }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: trip.like
                    ? "rgba(245, 42, 42,0.2)"
                    : "rgba(0,0,0,0.2) ",
                }}
              >
                <Icon
                  name="favorite"
                  size={18}
                  color={trip.like ? colors.red : colors.black}
                  onPress={() => navigation.navigate("addToFavorite")}
                />
              </View>
            </View>
            {/* image of the trip */}
            <View
              style={{
                height: 100,
                alignItems: "center",
              }}
            >
              <Image
                source={trip.image}
                style={{ flex: 1, resizeMode: "contain" }}
              />

              {/* Add trip title */}
              <View style={style.tripTitle}>{trip.title}</View>

              {/* add trip description */}
              <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Why it is amazing trip?{" "}
                </Text>
                <Text
                  style={{
                    color: "grey",
                    fontSize: 16,
                    lineHeight: 22,
                    marginTop: 10,
                  }}
                >
                  {trip.decription}
                </Text>
              </View>

              {/* Adding Edit and Delete buttons */}
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  title="Update Trip"
                  onPress={() => navigation.navigate("updateTrip")}
                />
                <Button
                  title="Delete Trip"
                  onPress={() => navigation.navigate("deleteTrip")}
                />
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 18, color: colors.black }}>
                  Create By: {userInfo.username}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};
export default TripDetails;

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

  tripTitle: {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
  },

  borderBtn: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 40,
  },
  borderBtnText: {
    fontWeight: "bold",
    ontSize: 28,
  },

  buyBtn: {
    width: 130,
    height: 50,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
});
