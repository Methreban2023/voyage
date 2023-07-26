import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ROUTES from "./routes";
import ProfileNavigation from "./ProfileNavigation";
import UserContext from "../context/UserContext";
import TripCard from "../screens/TripCard";
import AuthNavigation from "./AuthNavigation";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../utils/colors/colors";
import { useContext } from "react";
import HomeNavigation from "./HomeNavigation";

const Tab = createBottomTabNavigator();
const AppNavigation = () => {
  const { setUser, user } = useContext(UserContext);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={ROUTES.APPROUTES.HOME}
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color={colors.orange} />
          ),
        }}
      />
      {user ? (
        <Tab.Screen
          name={ROUTES.APPROUTES.CARD}
          component={TripCard}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="pluscircle" size={24} color={colors.orange} />
            ),
          }}
        />
      ) : null}
      {user ? (
        <Tab.Screen
          name={ROUTES.APPROUTES.PROFILE}
          component={ProfileNavigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" size={24} color={colors.orange} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name={ROUTES.AUTHROUTES.SIGNIN}
          component={AuthNavigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="adduser" size={24} color={colors.orange} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default AppNavigation;
