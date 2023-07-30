import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../constants/theame";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import ROUTES from "../navigation/routes";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../apis/profile/profile";

import TripCard from "../components/trips/TripCard";
import { BASE_URL } from "../apis";
const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});
  const navigation = useNavigation();
  const {
    data: dataProfile,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    onSuccess: (data) => {
      setUserInfo(data);
    },
  });
  // console.log(` this is a profile infor = ${userInfo.firstName}`);

  console.log(`${BASE_URL}/${dataProfile?.image}`);
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
      ></View>
      <StatusBar backgroundColor={COLORS.gray} />
      <View style={{ width: "100%" }}>
        <Image
          source={require("../components/image/tPwCLS.jpg")}
          resizeMode="cover"
          style={{
            height: 200,
            width: "100%",
          }}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={{ uri: `${BASE_URL}/${userInfo?.image}` }}
          resizeMode="contain"
          style={{
            height: 130,
            width: 130,
            borderRadius: 999,
            borderColor: COLORS.primary,
            borderWidth: 2,
            marginTop: -68,
          }}
        />
        <Text style={{ ...FONTS.h3, color: COLORS.primary, marginVertical: 8 }}>
          {`${userInfo?.firstName} ${userInfo?.lastName}`}
        </Text>
        <Text
          style={{
            color: COLORS.black,
            ...FONTS.body4,
          }}
        >
          {userInfo?.bio}
        </Text>
        {/* <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
            alignItems: "center",
          }}
        >
          <Text> Bio: {userInfo.bio}</Text>
        </View> */}

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTES.APPROUTES.EDITPROFILE, {
                userInfo: userInfo,
                setUserInfo: setUserInfo,
              });
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
        <View
          style={{
            width: "109%",
            height: 400,
            padding: 20,
          }}
        >
          <>
            <FlatList
              data={dataProfile?.trips}
              numColumns={2}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    width: 100,
                    height: 200,
                  }}
                >
                  <TripCard title={item.title} image={item.image} />
                </View>
              )}
              refreshControl={
                <RefreshControl refreshing={isFetching} onRefresh={refetch} />
              }
              contentContainerStyle={{
                backgroundColor: "red",
              }}
            />
          </>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
