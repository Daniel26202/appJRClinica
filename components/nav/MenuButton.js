// components/MenuButton.js
import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../hooks/useNavegation";

export function MenuButton({ style, color = "#fff", size = 26 }) {
    const { openDrawer } = useAppNavigation();

    return (
        <TouchableOpacity onPress={openDrawer} style={[{ marginLeft: 15 }, style]}>
            <Ionicons name="menu" size={size} color={color} />
        </TouchableOpacity>
    );
};
