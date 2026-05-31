// components/SubmitButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export function SubmitButton({ onPress, title, disabled }) {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && { opacity: 0.6 }]}
            onPress={onPress}
            disabled={disabled}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#387adf",
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
    },
});
