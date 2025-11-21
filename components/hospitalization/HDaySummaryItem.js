import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";

export const HDaySummaryItem = ({ icon, color, number, label }) => {
    const { theme } = useTheme();
    return (
        <View style={styles.item}>
            <Ionicons name={icon} size={20} color={color} />
            <Text style={theme.number}>{number}</Text>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    item: { alignItems: "center", flex: 1 },

    label: { fontSize: 12, color: "#7f8c8d" },
});
