import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
import { Header } from '../components/Header.js'
import { TabScreens } from "./TabScreens";
export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={TabScreens}
        options={{ header: () => <Header /> }}
      />
    </Stack.Navigator>
  );
};

