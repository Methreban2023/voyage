// import { StyleSheet, Text, View } from "react-native";
// import React, { useContext, useState } from "react";
// import { Image, TextInput, Button } from "react-native-web";
// import { authContext } from "../apis/auth";
// import axios from "axios";

// const ForgotPassword = ({ navigation }) => {
//   const [setForgotEmail] = useContext(authContext);
//   const [email, setEmail] = useState[""];
//   const [error, setError] = useState[""];

//   const handleResetPassword = async (req, res, next) => {
//     try {
//       const data = { email: email };
//       await axios
//         .post("http://localhost:8000/resetPassword", data, {
//           headers: { "Content-Type": "application/json" },
//         })
//         .then((response) => {
//           if (response.data.success) {
//             setForgotEmail(email);

//           } else {
//             setError(
//               "There was an issue resetting your password, Please try again."
//             );
//           }
//         });
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const handleBackToLogin = () => {

//   };
//   return (
//     <>
//       <View style={styles.container}>
//         <Image
//           source={require("../media/forgotPassword2.jpeg")}
//           style={styles.image}
//         />
//         <Text>Forgot Password</Text>
//         <Text>Enter your email Address below to reset your paasword.</Text>
//         <TextInput
//           autoCorrect={false}
//           autoCapitalize={false}
//           label="Email"
//           mode="outlined"
//           // style={styles.input}
//           value={email}
//           onChangeText={(text) => setEmail(text)}
//         />
//         <Button
//           mode="contained"
//           onPress={handleResetPassword}
//           style={styles.button}
//         >
//           Reset Password
//         </Button>
//         <Button onPress={handleBackToLogin} style={styles.backButton}>
//           Back to Login
//         </Button>
//         {error ? <Text style={styles.error}>{error}</Text> : null}
//       </View>
//     </>
//   );
// };

// export default ForgotPassword;

// const styles = StyleSheet.create({});
// // https://reactnative.dev/docs/textinput
// //https://www.react-native-material.com/docs/components/button#:~:text=-%20contained%20%3A%20Contained%20buttons%20have%20more,and%20shadow%20(high%20emphasis).&text=The%20main%20color%20of%20the,%2C%20icons%2C%20etc.).
// //https://react.dev/reference/react/useContext
