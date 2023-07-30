import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../utils/colors/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTrip } from "../apis/trips/index";
import * as ImagePicker from "expo-image-picker";
import CountryPicker from "react-native-country-picker-modal";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../navigation/routes";
import { Pressable, Image } from "react-native";

const UpdateTrip = ({ route }) => {
  const navigation = useNavigation();
  const [tripInfo, setTripInfo] = useState({});
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(new Date(1598051730000));
  const queryClient = useQueryClient();
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const handleCountrySelect = (country) => {
    setSelectedCountry(country.name);
  };

  const { mutate: updateTripFunction } = useMutation({
    mutationFn: () =>
      updateTrip({
        title: tripInfo.title,
        description: tripInfo.description,
        image: image,
        tripDate: date,
        country: selectedCountry,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["trips"]);
      navigation.navigate(ROUTES.APPROUTES.HOME);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // done image picker
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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "height" : "height"}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.white,
          paddingHorizontal: 22,
        }}
      >
        <View
          style={{
            flex: 1,
            marginHorizontal: 12,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              console.log("first");
              navigation.navigate(ROUTES.APPROUTES.TRIPDETAILS);
            }}
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={24}
              color={colors.white}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: colors.white,
              }}
            >
              Back to Trip Details
            </Text>
          </TouchableOpacity>
        </View>

        <Pressable onPress={pickImage}>
          <View style={styles.Trip_image}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100 }}
              />
            )}
          </View>
        </Pressable>

        <Text style={styles.text}>Trip Title</Text>

        <TextInput
          placeholder="Trip Title"
          style={styles.input}
          onChangeText={(value) => {
            setTripInfo({ ...tripInfo, title: value });
          }}
          value={tripInfo.title}
        />

        <Text style={styles.text}>Trip Description</Text>

        <TextInput
          placeholder="Description"
          style={styles.input}
          onChangeText={(value) => {
            setTripInfo({ ...tripInfo, description: value });
          }}
          value={tripInfo.description}
        />
        {/* ==== do styling  =====    */}
        <View>
          <Button onPress={showCountrypicker} title="Select Country" />
          {show && (
            <View style={styles.countryStyle}>
              <CountryPicker
                withFilter
                withFlag
                withCountryNameButton
                withAlphaFilter
                onSelect={handleCountrySelect}
              />
              {selectedCountry && (
                <Text style={styles.selectedCountryText}>
                  Selected Country: {selectedCountry}
                </Text>
              )}
            </View>
          )}
        </View>

        <Text style={styles.text}>Trip Date</Text>
        <>
          <Button onPress={showDatepicker} title="Select Date" />

          {show && (
            <DateTimePicker
              testID="datePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </>

        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              updateTripFunction();
            }}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: colors.white,
              }}
            >
              Save Change
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    width: 100,
    height: 100,
    backgroundColor: "grey",
    borderRadius: 130,
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
