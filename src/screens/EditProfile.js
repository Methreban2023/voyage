import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../utils/colors/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../apis";
import { updateProfile } from "../apis/profile/profile";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../navigation/routes";
import { Pressable, Image } from "react-native";
import coverImage from "../components/image/cover.jpg";
const EditProfile = ({ route }) => {
  const navigation = useNavigation();
  const { userInfo, setUserInfo } = route.params;
  const [updateUserInfo, setUpdateUserInfo] = useState({ ...userInfo });
  const [image, setImage] = useState(null);

  const { mutate: updateFn, error } = useMutation({
    mutationFn: () =>
      updateProfile({
        ...updateUserInfo,
        image,
      }),
    onSuccess: (data) => {
      setUserInfo({ ...data, image: image ? data.image : userInfo.image });
      navigation.navigate(ROUTES.APPROUTES.PROFILE);
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

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "height" : "height"}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.white,
          paddingHorizontal: 22,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImageBackground
          source={coverImage}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <View
            style={{
              flex: 1,
              position: "absolute",
              backgroundColor: "rgba(255,255,255,0.75)",
              paddingHorizontal: 22,
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <ScrollView>
            <View
              style={{
                marginHorizontal: 12,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginBottom: 20,
                flex: 1,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(ROUTES.APPROUTES.PROFILE);
                }}
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={24}
                  color={colors.black}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: colors.black,
                  }}
                >
                  Back to Profile
                </Text>
              </TouchableOpacity>
            </View>

            <Pressable
              onPress={pickImage}
              style={{
                backgroundColor: colors.white,
                marginTop: 30,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: 200,
                height: 200,
                borderRadius: 100,
                borderWidth: 4,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <View style={styles.avatar_image}>
                {(image || updateUserInfo.image) && (
                  <Image
                    source={{
                      uri: image || `${BASE_URL}/${updateUserInfo.image}`,
                    }}
                    style={{
                      width: 200,
                      height: 200,
                      borderRadius: 100,
                      borderWidth: 4,
                      borderColor: colors.orange,
                    }}
                  />
                )}
              </View>
            </Pressable>
            <TextInput
              style={styles.input}
              onChangeText={(value) => {
                setUpdateUserInfo({ ...updateUserInfo, firstName: value });
              }}
              value={updateUserInfo?.firstName}
            />
            <TextInput
              style={styles.input}
              onChangeText={(value) => {
                setUpdateUserInfo({ ...updateUserInfo, lastName: value });
              }}
              value={updateUserInfo.lastName}
            />
            <TextInput
              style={styles.input}
              onChangeText={(value) => {
                setUpdateUserInfo({ ...updateUserInfo, bio: value });
              }}
              value={!updateUserInfo.bio ? "My Bio..." : updateUserInfo?.bio}
            />

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
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
                    height: 30,
                    width: "100%",
                    borderColor: colors.grey,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      updateFn();
                    }}
                    style={{
                      backgroundColor: colors.orange,
                      borderRadius: 6,
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "auto",
                      marginRight: "auto",
                      height: 50,
                      width: 70,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.black,
                      }}
                    >
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
  },

  imageBackground: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  input: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 20,
  },
});
