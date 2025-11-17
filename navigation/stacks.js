import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../views/Home";
import { Profile } from "../views/Profile";
import { Settings } from "../views/Settings";
import { Hospitalization } from "../views/hospitalization";
import { Citas } from "../views/cita";
import { MenuButton } from "../components/nav/MenuButton";
import { defaultStackOptions } from "./stackConfig";

const Stack = createStackNavigator();

export const HomeStackScreen = () => (
    <Stack.Navigator screenOptions={defaultStackOptions}>
        <Stack.Screen
            name="HomeStack"
            component={Home}
            options={({ navigation }) => ({
                title: "Inicio",
                headerLeft: () => <MenuButton navigation={navigation} />,
            })}
        />
    </Stack.Navigator>
);
export const CitasStackScreen = () => (
    <Stack.Navigator screenOptions={defaultStackOptions}>
        <Stack.Screen
            name="CitasStack"
            component={Citas}
            options={({ navigation }) => ({
                title: "Citas",
                headerLeft: () => <MenuButton navigation={navigation} />,
            })}
        />
    </Stack.Navigator>
);
export const HospitalizationStackScreen = () => (
    <Stack.Navigator screenOptions={defaultStackOptions}>
        <Stack.Screen
            name="HospitalizationStack"
            component={Hospitalization}
            options={({ navigation }) => ({
                title: "Hospitalización",
                headerLeft: () => <MenuButton navigation={navigation} />,
            })}
        />
    </Stack.Navigator>
);
export const ProfileStackScreen = () => (
    <Stack.Navigator screenOptions={defaultStackOptions}>
        <Stack.Screen
            name="ProfileStack"
            component={Profile}
            options={({ navigation }) => ({
                title: "Mi Perfil",
                headerLeft: () => <MenuButton navigation={navigation} />,
            })}
        />
    </Stack.Navigator>
);
export const SettingsStackScreen = () => (
    <Stack.Navigator screenOptions={defaultStackOptions}>
        <Stack.Screen
            name="SettingsStack"
            component={Settings}
            options={({ navigation }) => ({
                title: "Configuración",
                headerLeft: () => <MenuButton navigation={navigation} />,
            })}
        />
    </Stack.Navigator>
);
