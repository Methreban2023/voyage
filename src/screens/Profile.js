// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   TouchableOpacity,
// } from "react-native";
// import { useContext } from "react";
// import { Button } from "react-native-paper";
// import { useNavigation } from "@react-navigation/native";
// import UserContext from "../context/UserContext";
// import { removeToken } from "../apis/auth/storage";
// import { getProfile } from "../apis/";
// import { useQuery } from "@tanstack/react-query";
// import { colors } from "../utils/colors/colors";
// import { MaterialIcons } from "@expo/vector-icons";

// const Profile = () => {
//   const navigation = useNavigation();
//   const { user, setUser } = useContext(UserContext);
//   const { data: dataProfile } = useQuery({
//     queryKey: ["profile"],
//     queryFn: () => getProfile(),
//   });
//   const pressHandler = () => {
//     removeToken();
//     setUser(false);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
//       <View>
//         <Text style={{ fontSize: 24 }}>Profile</Text>
//         <View></View>
//         <View></View>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={{ position: "absolute", left: 0 }}
//         >
//           <MaterialIcons
//             name="keyboard-arrow-left"
//             size={24}
//             color={colors.black}
//           />
//         </TouchableOpacity>

//         <View
//           style={{
//             backgroundColor: colors.baby_blue,
//             marginTop: 50,
//           }}
//         >
//           {/* <TouchableOpacity onPress={editProfileHandler}>
//             <Text>Edit my Profile </Text>
//           </TouchableOpacity> */}
//         </View>
//         <Button
//           title="SignOut"
//           onPress={() => {
//             pressHandler();
//           }}
//         >
//           Sign Out
//         </Button>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Profile;

// const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../constants/theame";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import ROUTES from "../navigation/routes";
import image from "../components/image/tPwCLS.jpg";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../apis/profile/profile";
import { removeToken } from "../apis/auth/storage";
const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigation();
  const { data: dataProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });
  const pressHandler = () => {
    removeToken();
    setUser(false);
  };
  console.log(dataProfile);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 22,
      }}
    >
      <StatusBar backgroundColor={COLORS.gray} />
      <View style={{ width: "100%" }}>
        <Image
          source={require("../components/image/tPwCLS.jpg")}
          resizeMode="cover"
          style={{
            height: 228,
            width: "100%",
          }}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={dataProfile?.image}
          resizeMode="contain"
          style={{
            height: 155,
            width: 155,
            borderRadius: 999,
            borderColor: COLORS.primary,
            borderWidth: 2,
            marginTop: -90,
          }}
        />
        <Text style={{ ...FONTS.h3, color: COLORS.primary, marginVertical: 8 }}>
          {`${dataProfile?.firstName} ${dataProfile?.lastName}`}
        </Text>
        <Text
          style={{
            color: COLORS.black,
            ...FONTS.body4,
          }}
        >
          {dataProfile?.bio}
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="location-on" size={24} color="black" />
          <Text
            style={{
              ...FONTS.body4,
              marginLeft: 4,
            }}
          >
            Yarmouk, Kuwait
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTES.APPROUTES.EDITPROFILE);
            }}
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              // marginHorizontal: SIZES.padding * 2,
            }}
          >
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.white,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
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
