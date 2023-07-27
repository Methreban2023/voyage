import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ROUTES from "./routes";
import ProfileNavigation from "./ProfileNavigation";
import UserContext from "../context/UserContext";
import TripCard from "../screens/TripCard";
import AuthNavigation from "./AuthNavigation";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../utils/colors/colors";
import { useContext } from "react";
import { View, Text } from "react-native";
import HomeNavigation from "./HomeNavigation";
import React from "react";
import { Fontisto } from "@expo/vector-icons";
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
    <Tab.Navigator>
      <Tab.Screen
        name={ROUTES.APPROUTES.HOME_NAV}
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? colors.orange : colors.light_blue}
            />
          ),
        }}
      />
      {user ? (
        <Tab.Screen
          name={ROUTES.APPROUTES.CARD}
          component={TripCard}
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              return (
                <View
                  style={{
                    alignItem: "center",
                    justifyContent: "center",
                    backgroundColor: colors.white,
                    height: Platform.OS == "ios" ? 50 : 60,
                    width: Platform.OS == "ios" ? 50 : 60,
                    top: Platform.OS == "ios" ? -10 : -20,
                    borderRadius: Platform.OS == "ios" ? 25 : 30,
                    borderWidth: 2,
                    borderColor: colors.white,
                  }}
                >
                  <Fontisto name="plus-a" size={24} color={colors.white} />
                  <AntDesign
                    name="pluscircle"
                    size={24}
                    color={focused ? colors.orange : colors.light_blue}
                  />
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
            tabBarIcon: ({ color, size, focused }) => (
              <AntDesign
                name="user"
                size={24}
                color={focused ? colors.orange : colors.light_blue}
              />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name={ROUTES.AUTHROUTES.SIGNIN_NAV}
          component={AuthNavigation}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <AntDesign
                name="adduser"
                size={24}
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
