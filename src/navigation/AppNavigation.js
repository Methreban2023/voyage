import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ROUTES from "./routes";
import ProfileNavigation from "./ProfileNavigation";
import UserContext from "../context/UserContext";
import { colors } from "../utils/colors/colors";

// import { View, Text } from "react-native";
import { removeToken } from "../apis/auth/storage";
import AuthNavigation from "./AuthNavigation";
import { AntDesign } from "@expo/vector-icons";

import { useContext } from "react";
import { View, Text } from "react-native";
import HomeNavigation from "./HomeNavigation";
import React from "react";
import { Fontisto } from "@expo/vector-icons";
import CreateTrip from "../screens/CreateTrip";
import { TouchableOpacity } from "react-native-gesture-handler";
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
const Tab = createBottomTabNavigator();
const AppNavigation = () => {
  const { setUser, user } = useContext(UserContext);

  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen
        name={ROUTES.APPROUTES.HOME_NAV}
        component={HomeNavigation}
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign
              name="home"
              size={focused ? 34 : 24}
              color={focused ? colors.orange : colors.light_blue}
              // backgroundColor={focused ? colors.orange : colors.white}
            />
          ),
        }}
      />
      {user ? (
        <Tab.Screen
          name={ROUTES.APPROUTES.CREATE_TRIP}
          component={CreateTrip}
          options={{
            title: "",

            tabBarIcon: ({ color, size, focused }) => {
              return (
                <View
                  style={{
                    alignItem: "center",
                    justifyContent: "center",
                    backgroundColor: colors.white,
                    height: Platform.OS == "ios" ? 60 : 70,
                    width: Platform.OS == "ios" ? 60 : 70,
                    top: Platform.OS == "ios" ? -10 : -20,
                    borderRadius: Platform.OS == "ios" ? 50 : 50,
                    borderWidth: 2,
                    borderColor: colors.white,
                    bottom: 30,
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      width: 65,
                      left: 3,
                      alignItem: "center",
                      justifyContent: "center",
                      borderColor: colors.white,
                    }}
                  >
                    <AntDesign
                      name="pluscircle"
                      size={50}
                      color={focused ? colors.orange : colors.light_blue}
                    />
                  </View>
                </View>
              );
            },
          }}
        />
      ) : null}
      {user ? (
        <Tab.Screen
          name={ROUTES.APPROUTES.PROFILE_NAV}
          component={ProfileNavigation}
          options={{
            title: "",
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <AntDesign
                name="user"
                size={focused ? 34 : 24}
                color={focused ? colors.orange : colors.light_blue}
                // backgroundColor={focused ? colors.orange : colors.white}
              />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name={ROUTES.AUTHROUTES.SIGNIN_NAV}
          component={AuthNavigation}
          options={{
            title: "",
            headerRight: () => {
              return (
                <TouchableOpacity
                  style={{ marginRight: 20 }}
                  onPress={() => {
                    removeToken();
                    setUser(false);
                  }}
                >
                  <AntDesign name="logout" size={24} color={colors.red} />
                </TouchableOpacity>
              );
            },
            tabBarIcon: ({ color, size, focused }) => (
              <AntDesign
                name="adduser"
                size={focused ? 34 : 24}
                color={focused ? colors.orange : colors.light_blue}
              />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default AppNavigation;
