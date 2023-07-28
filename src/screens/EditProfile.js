import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../utils/colors/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import { TextInput } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../apis";
import { updateProfile } from "../apis/profile/profile";
import { ImagePicker } from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const EditProfile = ({ route }) => {
  const navigation = useNavigation();
  const { userInfo, setUserInfo } = route.params;
  // const [selectedImage, setSelectedImage] = useState(userInfo.image);
  // const [userInfo, setUserInfo] = useState({});
  // const [tripCount, setTripCount] = useState(0);

  const { mutate: updateFn, error } = useMutation({
    mutationFn: () => updateProfile({ ...userInfo, selectedImage }),
    onSuccess: (data) => {
      console.log(` edit profile = ${data}`);
      setUserInfo(...userInfo);
      // navigation.navigate(ROUTES.APPROUTES.HOME);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!(await result.canceled)) {
      setUserInfo({ ...userInfo, image: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,

        backgroundColor: colors.orange,
        paddingHorizontal: 22,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Edit Profile</Text>
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
      </View>
      <View>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.avatar_image}>
            <Image
              source={{ uri: `${BASE_URL}/${userInfo.image}` }}
              // source={{ uri: selectedImage }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                borderWidth: 4,
                borderColor: colors.black,
              }}
            />
            <View
              style={{
                position: "absolute",
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
        </TouchableOpacity>
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
        <Text style={styles.input}>
          Number of Trips = {userInfo.trips.length}
        </Text>
      </View>

      <View>
        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Name</Text>
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
  },
});
