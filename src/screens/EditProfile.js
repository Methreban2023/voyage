import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../utils/colors/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../apis";
import { updateProfile } from "../apis/profile/profile";
import { ImagePicker } from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../navigation/routes";
import { Pressable, Image } from "react-native";

const EditProfile = ({ route }) => {
  const navigation = useNavigation();
  const { userInfo, setUserInfo } = route.params;

  const { mutate: updateFn, error } = useMutation({
    mutationFn: () => updateProfile({ userInfo }),
    onSuccess: (data) => {
      // console.log(` edit profile = ${data}`);
      setUserInfo(...userInfo);
      navigation.navigate(ROUTES.APPROUTES.PROFILE);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  console.log(` image = ${userInfo.image}`);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!(await result.canceled)) {
      setUserInfo({ ...userInfo, image: result.assets[0].uri });
    } else {
      setUserInfo({ ...userInfo, image: userInfo.image });
    }
  };
  console.log(` image = ${userInfo.image}`);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.black,
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", left: 0 }}
          flex={1}
          flexDirection="row"
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={colors.black}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Back to Profile
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Pressable onPress={pickImage}>
          <View style={styles.avatar_image}>
            {userInfo.image && (
              <Image
                source={{ uri: `${BASE_URL}/${userInfo.image}` }}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                  borderWidth: 4,
                  borderColor: colors.black,
                }}
              />
            )}
            <View
              style={{
                bottom: 0,
                right: 10,
                zIndex: 9999,
              }}
            >
              <MaterialIcons
                name="photo-camera"
                size={32}
                color={colors.baby_blue}
              />
            </View>
          </View>
        </Pressable>
        <TextInput
          style={styles.input}
          onChangeText={(value) => {
            setUserInfo({ ...userInfo, firstName: value });
          }}
          placeholder={userInfo.firstName}
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => {
            setUserInfo({ ...userInfo, lastName: value });
          }}
          placeholder={userInfo.lastName}
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => {
            setUserInfo({ ...userInfo, bio: value });
          }}
          placeholder={userInfo.bio}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          height: 20,
        }}
      >
        <Text style={styles.input}>My Trips</Text>
        <Text style={styles.input}> {userInfo.trips.length}</Text>
      </View>

      <View>
        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: colors.grey,
              borderRadius: 4,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8,
            }}
          ></View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            updateFn();
          }}
          style={{
            backgroundColor: colors.primary,
            height: 44,
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
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  avatar_image: {
    width: 200,
    height: 200,
    backgroundColor: "grey",
    borderRadius: 100,
    overflow: "hidden",
    alignSelf: "center",
    marginVertical: 20,
    marginTop: 40,
  },
  input: {
    color: colors.white,
    fontWeight: "bold",
  },
});
