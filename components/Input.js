// components/Input.js
import React from "react";
import { TextInput, StyleSheet } from "react-native";

export function Input({ value, onChangeText, placeholder, secureTextEntry = false }) {
    return (
        <>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
        </>
    );
}
const styles = StyleSheet.create({
    input: {
        height: 46,
        backgroundColor: "#F3F5FF",
        borderRadius: 10,
        paddingHorizontal: 16,
        marginVertical: 8,
        fontSize: 16,
        color: "#222831",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
});
