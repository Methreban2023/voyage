import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useContext, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { colors } from "../utils/colors/colors";
import theme, { COLORS, FONTS } from "../../constants/theme";
import { createTrip } from "../apis/trips";
import { CLOSING } from "ws";
import { useMutation, useQueryClient } from "@tanstack/react-query/build/lib";
import ROUTES from "../navigation/routes";
import CountryPicker from "react-native-country-picker-modal";
import { BASE_URL } from "../apis";

const UpdateTrip = ({ navigation, route }) => {
  const {
    description,
    createdBy,
    country,
    tripDate,
    _id,
    image: oldImage,
    title,
  } = route.params;

  const [tripInfo, setTripInfo] = useState({});
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(new Date(1598051730000));
  const queryClient = useQueryClient();
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectCreatedBy, setSelectedCreatedBy] = useState(null);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country.name);
  };

  const { mutate: createTripFunction } = useMutation({
    mutationFn: () =>
      createTrip({
        title: tripInfo.title,
        description: tripInfo.description,
        image: image,
        tripDate: selectedStartDate,
        country: selectedCountry,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["trips"]);
      navigation.navigate(ROUTES.APPROUTES.HOME);
    },
  });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showCountrypicker = () => {
    showMode("Country");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  //another date picker
  //test
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const [selectedStartDate, setSelectedStartDate] = useState("01/01/1990");
  const [startedDate, setStartedDate] = useState("12/12/2023");

  const handleChangeStartDate = (propDate) => {
    setStartedDate(propDate);
  };

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  useEffect(() => {
    setTripInfo({
      description,
      createdBy,
      country,
      tripDate,
      _id,
      image: oldImage,
      title,
    });
    setSelectedCountry(country);
    setSelectedStartDate(tripDate);
  }, []);
  console.log(country);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 22,
      }}
    >
      <ScrollView
        style={
          {
            // marginHorizontal: 12,
            // flexDirection: "row",
            // justifyContent: "center",
            // alignItems: "center",
            // marginBottom: 20,
          }
        }
      >
        <View style={styles.container}>
          <Text style={{ fontSize: 50 }}>Update</Text>
          {/* IMAGE */}
          <Pressable onPress={pickImage}>
            <View style={styles.Trip_image}>
              {(image || oldImage) && (
                <Image
                  source={{ uri: image || `${BASE_URL}/${oldImage}` }}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </View>
          </Pressable>

          <Text style={styles.text}>Trip Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setTripInfo({ ...tripInfo, title: value });
            }}
            placeholder="Trip Title"
            value={tripInfo?.title}
          />
          {/* -------- */}
          <Text style={styles.text}>Trip Description</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setTripInfo({ ...tripInfo, description: value });
            }}
            placeholder="Description"
            value={tripInfo?.description}
          />
          <Text style={styles.text}>{tripInfo.description}</Text>
          {/* <Text style={styles.text}>Trip Destination</Text> */}

          <View style={{ width: "90%" }}>
            <CountryPicker
              withFilter
              withFlag
              withCountryNameButton
              withAlphaFilter
              onSelect={handleCountrySelect}
              containerButtonStyle={{
                borderWidth: 2,
                borderColor: colors.orange,
                width: 150,
                paddingHorizontal: 5,
                paddingVertical: 3,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
            {(selectedCountry || country) && (
              <Text style={styles.selectedCountryText}>
                Selected Country: {selectedCountry}
              </Text>
            )}
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  margin: 20,
                  backgroundColor: COLORS.white,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                  padding: 35,
                  width: "90%",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <DatePicker
                  mode="calendar"
                  minimumDate={startDate}
                  selected={startedDate}
                  onDateChanged={handleChangeStartDate}
                  onSelectedChange={(date) => setSelectedStartDate(date)}
                  options={{
                    backgroundColor: COLORS.white,
                    textHeaderColor: "#ffa500",
                    textDefaultColor: COLORS.black,
                    selectedTextColor: COLORS.black,
                    mainColor: "#ffa500",
                    textSecondaryColor: COLORS.green,
                    borderColor: "#ffa500",
                  }}
                />

                <TouchableOpacity onPress={handleOnPressStartDate}>
                  <Text style={{ ...FONTS.body3, color: COLORS.black }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            onPress={handleOnPressStartDate}
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.white,
              borderWidth: 1,
              borderRadius: 4,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8,
            }}
          >
            <Text> Trip date: {selectedStartDate}</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Update"
          onPress={() => {
            createTripFunction();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  input: {
    height: 40,
    borderColor: colors.orange,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: colors.white,
    width: 300,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  link_text: {
    color: "blue",
  },
  avatar_image: {
    width: 100,
    height: 100,
    backgroundColor: "grey",
    borderRadius: 10,
    overflow: "hidden",
  },
  Trip_image: {
    width: 300,
    height: 200,
    backgroundColor: colors.lightgray,
    borderRadius: 17,
    overflow: "hidden",
  },

  countryStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  selectedCountryText: {
    fontSize: 18,
    marginTop: 20,
  },
});
