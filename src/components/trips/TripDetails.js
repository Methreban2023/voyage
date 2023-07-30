import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
  ,
} from "react-native";
import React from "react";
import { BASE_URL } from "../../apis/";
import { deleteTrip, updateTrip } from "../../apis/trips";
import { colors } from "../../utils/colors/colors";
const TripDetail = ({ title, image, onPress = () => {} }) => {
  return (
    <TouchableHighlight
      onPress={() => onPress(title)}
      style={{ flex: 1, width: "100%", height: "100%", borderRadius: 17 }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",

          borderRadius: 17,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: image,
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
        
        <Button 
          title="Delete"
          onPress={() => {
            deleteTrip();
          }}
        />
      </View>
    </TouchableHighlight>
  );
};

export default TripDetail;

const styles = StyleSheet.create({});
