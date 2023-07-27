import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../utils/colors/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const EditProfile = ({ navigation }, id) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setUser } = useContext(UserContext);

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getProfileById(id),
  });

  const { mutate: signupFn, error } = useMutation({
    mutationFn: () => updateProfile({ ...userInfo, image }),
    onSuccess: (data) => {
      saveToken(data.token);
      console.log(` edit profile = ${data}`);
      setUser(true);
      navigation.navigate(ROUTES.APPROUTES.HOME);
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
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!(await result.canceled)) {
      //add default image here
      setSelectedImage(result.uri);
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.white, paddingHorizontal: 22 }}
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
          <Image
            source={{ uri: selectedImage }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 85,
              borderWidth: 2,
              borderColor: colors.orange,
            }}
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setUserInfo({ ...userInfo, username: value });
            }}
            placeholder="Username"
          />

          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setUserInfo({ ...userInfo, firstName: value });
            }}
            placeholder="First Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setUserInfo({ ...userInfo, lastName: value });
            }}
            placeholder="Last Name"
          />
          <TextInput
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(value) => {
              setUserInfo({ ...userInfo, password: value });
            }}
            // onChangeText={passwordChangeHandler}
            placeholder="password"
          />
          {/* <MaterialIcons name="keyboard-arrow-left" size={24} color="black" /> */}
        </TouchableOpacity>
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
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
