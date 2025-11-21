import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";

export const HQuickActionButton = ({ icon, bgColor, label, onPress }) => {
    const { theme } = useTheme();

    return (
        <TouchableOpacity style={theme.button} onPress={onPress}>
            <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
                <Ionicons name={icon} size={24} color="#fff" />
            </View>
            <Text style={theme.text}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
});
