import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";

export const HStatCard = ({ icon, bgColor, number, label }) => {
    const { theme } = useTheme();
    return (
        <View style={theme.cardEst}>
            <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
                <Ionicons name={icon} size={24} color="#fff" />
            </View>
            <Text style={theme.numberEst}>{number}</Text>
            <Text style={theme.labelEst}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({

    iconContainer: { padding: 8, borderRadius: 8, marginBottom: 4 },

});
