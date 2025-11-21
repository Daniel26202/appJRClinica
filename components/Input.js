// components/Input.js
import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

export function Input({ value, onChangeText, placeholder, secureTextEntry = false }) {
    const { theme, DarkMode } = useTheme();
    return (
        <>
            <TextInput
                style={theme.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={DarkMode ? "#acababff" : "#797979"}
                secureTextEntry={secureTextEntry}
            />
        </>
    );
}
