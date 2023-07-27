import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
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

        <View
          style={{
            backgroundColor: colors.baby_blue,
            marginTop: 50,
          }}
        >
          {/* <TouchableOpacity onPress={editProfileHandler}>
            <Text>Edit my Profile </Text>
          </TouchableOpacity> */}
        </View>
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
