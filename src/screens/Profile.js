import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Button } from "react-native-paper";
import UserContext from "../context/UserContext";
import { removeToken } from "../apis/auth/storage";

const Profile = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const pressHandler = () => {
    removeToken();
    setUser(false);
  };
  return (
    <View>
      <Text>Profile</Text>
      <View></View>
      <View></View>
      <Button
        title="SignOut"
        onPress={() => {
          pressHandler();
        }}
      >
        Sign Out
      </Button>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
