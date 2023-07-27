import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Button } from "react-native-paper";
import UserContext from "../context/UserContext";
import { removeToken } from "../apis/auth/storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../utils/colors/colors";
import { MaterialIcons } from "@expo/vector-icons";
const Profile = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const pressHandler = () => {
    removeToken();
    setUser(false);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View>
        <Text style={{ fontSize: 24 }}>Profile</Text>
        <View></View>
        <View></View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", left: 0 }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={colors.black}
          />
        </TouchableOpacity>
        <Button
          title="SignOut"
          onPress={() => {
            pressHandler();
          }}
        >
          Sign Out
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
