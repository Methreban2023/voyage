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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { colors } from "../utils/colors/colors";
import theme, { COLORS, FONTS } from "../../constants/theme";
import { createTrip } from "../apis/trips";
import { CLOSING } from "ws";
import { useMutation, useQueryClient } from "@tanstack/react-query/build/lib";
import ROUTES from "../navigation/routes";
import CountryPicker from "react-native-country-picker-modal";

const CreateTrip = ({ navigation }) => {
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
        tripDate: date,
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

  console.log(tripInfo);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 22,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <View style={styles.container}>
          <Text>Create</Text>
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
            style={styles.input}
            onChangeText={(value) => {
              setTripInfo({ ...tripInfo, title: value });
            }}
            placeholder="Trip Title"
          />
          {/* -------- */}
          <Text style={styles.text}>Trip Description</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setTripInfo({ ...tripInfo, description: value });
            }}
            placeholder="Description"
          />
          <Text style={styles.text}>{tripInfo.description}</Text>

          <>
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
          </>
          <></>
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

          <Button
            title="Create"
            onPress={() => {
              createTripFunction();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateTrip;

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
