import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../context/UserContext";
import { removeToken } from "../apis/auth/storage";
import { getProfile } from "../apis/";
const Profile = ({ navigation }) => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const { data: dataProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });
  const pressHandler = () => {
    setUser(false);
    removeToken();
  };
  return (
    <View>
      <Text>Profile</Text>
      <Button
        title="SignOut"
        onPress={() => {
          pressHandler();
        }}
      >
        Sign Out
      </Button>
      <View>{Profile}</View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
