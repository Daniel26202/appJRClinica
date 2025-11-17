import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator  } from "@react-navigation/stack";

import { Login } from "../views/Login";
import { RecuperarPassword } from "../views/recuperarPassword";
// import { Settings } from "../views/Settings";
// import { MainDrawer } from "../navigation/drawer";

const Stack = createStackNavigator ();

export function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerStyle: { backgroundColor: "#387adf" },
                    headerTintColor: "#fff",
                }}
            >
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                {/* <Stack.Screen name="Main" component={MainDrawer} options={{ headerShown: false }} /> */}
                <Stack.Screen name="RecuperarPassword" component={RecuperarPassword} options={{ headerShown: false }} />
                {/* <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
