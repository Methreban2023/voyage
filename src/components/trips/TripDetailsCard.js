import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Dimensions,
  Button,
} from "react-native";
import React from "react";
import { colors } from "../../utils/colors/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import style from "react-native-datepicker/style";
import { deleteTrip, updateTrip } from "../../apis/trips";
import { BASE_URL } from "../../apis";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
const width = Dimensions.get("screen").width / 2 - 30;

const TripDetails = ({
  title,
  image,
  onPress = () => {},
  description,
  createdBy,
}) => {
  const navigation = useNavigation();
  const { mutate: handleDeleteTripCard, error } = useMutation({
    mutationFn: () => ({ deleteTrip }),
    onSuccess: () => {
      navigation.navigate(ROUTES.APPROUTES.HOME);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handlePressCreatedBy = () => {
    setSelectedCreatedBy(createdBy);
  };
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <TouchableHighlight style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={[{ flex: 1 }]}>
            {/* add favorite heart icon - if user add to favorite */}
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
                  onPress={() => navigation.navigate("addToFavorite")}
                />
              </View>
            </View>
            {/* image of the trip */}
            <View
              style={{
                flex: 1,
                height: "100%",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: `${BASE_URL}/${image}` }}
                style={{
                  flex: 1,
                  resizeMode: "contain",
                  width: "100%",
                  height: "100%",
                  padding: "5%",
                }}
              />

              {/* Add trip title */}
              {/* add trip description */}
              <View
                style={{
                  // paddingHorizontal: 10,
                  marginTop: 10,
                  flex: 1,
                  alignItems: "flex-start",
                  alignContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",

                    alignContent: "flex-start",
                  }}
                >
                  Why{" "}
                  <Text
                    style={{
                      fontStyle: "italic",
                      fontSize: 20,
                      color: colors.dark_blue,
                    }}
                  >
                    {title}
                  </Text>
                  is amazing trip?
                </Text>
                <Text
                  style={{
                    color: "grey",
                    fontSize: 16,
                    lineHeight: 22,
                    marginTop: 10,
                  }}
                >
                  {description}
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
                  style={{
                    width: 100,
                    height: 50,
                    backgroundColor: "green",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 30,
                  }}
                  onPress={() => handleDeleteTripCard(trip.id)}
                />
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Button
                  title="Created By: "
                  style={{
                    fontSize: 14,
                    color: colors.black,
                    fontWeight: "bold",
                    paddingTop: "10%",
                  }}
                  onPress={() => handlePressCreatedBy()}
                />
                {/* check if user = createdBBy the he can delete */}
                {/* Create By: {createdBy?.username} */}
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};
export default TripDetails;

// const styles = StyleSheet.create({
//   card: {
//     height: 225,
//     backgroundColor: colors.light,
//     width,
//     marginHorizontal: 2,
//     borderRadius: 10,
//     marginBottom: 20,
//     padding: 15,
//   },

// tripTitle: {
//   // fontWeight: "bold",
//   // fontSize: 17,
//   // marginTop: 10,
// },

//   borderBtn: {
//     borderColor: "grey",
//     borderWidth: 1,
//     borderRadius: 5,
//     justifyContent: "center",
//     alignItems: "center",
//     width: 60,
//     height: 40,
//   },
//   borderBtnText: {
//     fontWeight: "bold",
//     ontSize: 28,
//   },

//   buyBtn: {
//     width: 130,
//     height: 50,
//     backgroundColor: colors.green,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 30,
//   },
// });
