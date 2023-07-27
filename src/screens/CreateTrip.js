
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import DatePicker, { getFormatedDate } from "react-native-datepicker";
import { colors } from "../utils/colors/colors";
// import { useMutation } from "@tanstack/react-query";
// import { colors } from "../utils/colors/colors";

// const { setTrip } = useContext(TripContext);
import theme from "../../constants/theme";
import { createTrip } from "../apis/trips";

const CreateTrip = ({ navigation }) => {

  const [tripInfo, setTripInfo] = useState({});
  const [image, setImage] = useState(null);
  const [tripDetail, setTripDetail] = useState("");


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

//Date picker
const [openStartDatePicker, SetOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );

  const [selectedStartDate, setSelectedStartDate] = useState("01/01/1990");
  const [startedDate, setStartedDate] = useState("12/12/2023");

  const handleChangeStartDate = (propData) => {
    setStartedDate(propData);
  };

  const handleOnPressStartDate = () => {
    SetOpenStartDatePicker(!openStartDatePicker);
  };


  return (
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

      
      <Text style={styles.text}>Trip title</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => {
          setTripInfo({ ...tripInfo, title: value });
        }}
        placeholder="Trip Title"
      />


<Text style={styles.text}>Trip Description</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => {
          setTripDetail({ ...tripDetail, description: value });
        }}
        placeholder="Description"
      />
  

  <Text style={styles.text}>Trip Date</Text>
 
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
              backgroundColor: COLORS.primary,
              alignItems: "center",
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
              selected={startDate}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={(date) => setSelectedStartDate(date)}
              options={{
                backgroundColor: COLORS.primary,
                textHeaderColor: "#469ab6",
                textDefaultColor: "COLORS.white",
                selectedTextColor: "COLORS.white",
                mainColor: "#469ab6",
                textSecondaryColor: COLORS.white,
                borderColor: "rgba(122,146,156,0.1)",
              }}
            />
            <TouchableOpacity onPress={handleOnPressStartDate}>
              <Text style={{ ...FONTS.body3, color: COLORS.white }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  

  <Button
        title="Create"
        onPress={() => {
          createTrip();
        }}
      />
    </View>
  );
};

export default CreateTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
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
    borderRadius: 100,
    overflow: "hidden",
  },
  Trip_image: {
    width: 100,
    height: 100,
    backgroundColor: "grey",
    borderRadius: 130,
    overflow: "hidden",
  },
});
