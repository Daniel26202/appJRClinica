import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import { HomeStackScreen, SettingsStackScreen, ProfileStackScreen, HospitalizationStackScreen, CitasStackScreen } from "./stacks";
import { useTheme } from "../hooks/useTheme";

const Drawer = createDrawerNavigator();

export function MainDrawer() {
    const { DarkMode } = useTheme();
    return (
        //

        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: "#387adf",
                drawerInactiveTintColor: DarkMode ? "#fff" : "#333",
                drawerStyle: { backgroundColor: DarkMode ? "#272727ff" : "#fff", width: 280 },
                drawerLabelStyle: { fontSize: 16, fontWeight: "500" },
            }}
        >
            <Drawer.Screen
                name="Inicio"
                component={HomeStackScreen}
                options={{
                    drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
                }}
            />
            <Drawer.Screen
                name="Citas"
                component={CitasStackScreen}
                options={{
                    drawerIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
                }}
            />
            <Drawer.Screen
                name="Hospitalización"
                component={HospitalizationStackScreen}
                options={{
                    drawerIcon: ({ color, size }) => <Ionicons name="bed" size={size} color={color} />,
                }}
            />
            <Drawer.Screen
                name="Mi Perfil"
                component={ProfileStackScreen}
                options={{
                    drawerIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
                }}
            />
            <Drawer.Screen
                name="Configuración"
                component={SettingsStackScreen}
                options={{
                    drawerIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
                }}
            />
        </Drawer.Navigator>
    );
}
