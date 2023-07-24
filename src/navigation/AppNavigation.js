import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ROUTES from ".";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import UserContext from "../context/UserContext";
import TripCard from "../screens/TripCard";
import SignIn from "../screens/SignIn";
// import Thankyou from "../screens/Thankyou";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../utils/colors/colors";
import { useContext } from "react";

const Tab = createBottomTabNavigator();
const AppNavigation = () => {
  const { setUser, user } = useContext(UserContext);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={ROUTES.APPROUTES.HOME}
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-home" size={24} color={colors.orange} />
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
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user-circle" size={24} color={colors.orange} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name={ROUTES.AUTHROUTES.SIGNIN}
          component={SignIn}
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
