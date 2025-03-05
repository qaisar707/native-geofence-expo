import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './TabNavigation'; // Your bottom tabs

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator 
                screenOptions={{
                    headerShown: false, // We will create a custom header
                }}
            >
                <Drawer.Screen name="Home" component={TabNavigation} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default DrawerNavigation;
