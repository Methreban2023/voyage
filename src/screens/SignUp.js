import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../apis/auth/auth";
import { colors } from "../utils/colors/colors";
import { saveToken } from "../apis/auth/storage";
import UserContext from "../context/UserContext";
import ROUTES from "../navigation/routes";

const SignUp = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({});
  const [image, setImage] = useState(
    "https://www.pngitem.com/middle/hwxmbmT_empty-profile-picture-png-transparent-png/"
  );
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setUser } = useContext(UserContext);
  console.log(` signup page`);

  const { mutate: signupFn, error } = useMutation({
    mutationFn: () => signUp({ ...userInfo, image }),
    onSuccess: (data) => {
      saveToken(data.token);
      console.log(` signup = ${data}`);
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
    } else {
      setImage(
        "https://www.pngitem.com/middle/hwxmbmT_empty-profile-picture-png-transparent-png/"
      );
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (!regex.test(password)) {
      return "must be at least 8 characters long and contain one uppercase, one lowercase letter, and one number.";
    }
    return "";
  };
  const passwordChangeHandler = (value) => {
    const err = validatePassword(value);
    console.log("===============>", err);
    setPasswordError(err);
    if (err === "") {
      setPassword(value);
      return setUserInfo({ ...userInfo, password: value });
    }
  };

  console.log(userInfo);
  return (
    <View style={styles.container}>
      <Pressable onPress={pickImage}>
        <View style={styles.avatar_image}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100 }}
            />
          )}
        </View>
      </Pressable>

      <Text style={styles.text}>Username</Text>
      <TextInput
        // value ={this.state.value}
        style={styles.input}
        onChangeText={(value) => {
          setUserInfo({ ...userInfo, username: value });
        }}
        placeholder="Username"
      />

      <Text style={styles.text}>First Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => {
          setUserInfo({ ...userInfo, firstName: value });
        }}
        placeholder="First Name"
      />

      <Text style={styles.text}>Last Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => {
          setUserInfo({ ...userInfo, lastName: value });
        }}
        placeholder="Last Name"
      />

      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        autoCapitalize="none"
        // onChangeText={(value) => {
        //   setUserInfo({ ...userInfo, password: value });
        // }}
        onChangeText={(value) => {
          passwordChangeHandler(value);
        }}
        placeholder="password"
      />
      <View>
        <Text style={(styles.text, (backgroundColor = colors.baby_blue))}>
          {passwordError !== "" && (
            <Text style={{ color: "red" }}>{passwordError}</Text>
          )}
        </Text>
      </View>

      <Button
        title="Sign Me Up"
        onPress={() => {
          if (passwordError === "") signupFn();
          console.log(passwordError);
        }}
      />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  input: {
    height: 40,
    borderColor: colors.orange,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: colors.white,
    width: 300,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  link_text: {
    color: "blue",
  },
  avatar_image: {
    width: 100,
    height: 100,
    backgroundColor: "grey",
    borderRadius: 100,
    overflow: "hidden",
  },
});
