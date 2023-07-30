import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import ROUTES from "./routes";
import ForgotPassword from "../screens/ForgotPassword";
import React from "react";
import { colors } from "../utils/colors/colors";

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: colors.white,
  },
};
const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerTitle: "Test", headerShown: false }}
    >
      <Stack.Screen name={ROUTES.AUTHROUTES.SIGNIN} component={SignIn} />
      <Stack.Screen name={ROUTES.AUTHROUTES.SIGNUP} component={SignUp} />

      {/* <Stack.Screen
        name={ROUTES.AUTHROUTES.FORGOT}
        component={ForgotPassword}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigation;
