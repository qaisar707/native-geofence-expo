import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { HomeScreen, MapScreen,Profile, Analytics, Support } from "../screens";
import colors from "../utils/colors";

const Tab = createBottomTabNavigator();

export const TabScreens = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarActiveTintColor: colors.PRIMARY,
      headerShown: false,
      tabBarStyle: {
        height: 60, // Adjusted tab bar height
        paddingBottom: 5, // Added padding at the bottom
        paddingTop: 5, // Added padding at the top
        borderTopLeftRadius: 20, // Rounded corners
        borderTopRightRadius: 20, // Rounded corners
        elevation: 10, // Shadow effect
        backgroundColor: colors.WHITE, // Background color
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={MapScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Analytics"
      component={Analytics}
      options={{
        tabBarLabel: "Analytics",
        tabBarIcon: ({ color }) => (
          <Ionicons name="stats-chart" size={25} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Support"
      component={Support}
      options={{
        tabBarLabel: "Support",
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="support-agent" color={color} size={25} />
        ),
      }}
    />
     <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: "Profile",
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="perm-identity" color={color} size={25} />
        ),
      }}
    />
  </Tab.Navigator>
);