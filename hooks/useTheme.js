import { useState, useMemo } from "react";
import { StyleSheet } from "react-native";

export const useTheme = () => {
    const [darkMode, setDarkMode] = useState(false);

    const theme = useMemo(() => {
        return StyleSheet.create({
            container: {
                height: 100,
                backgroundColor: darkMode ? "#121212" : "#f5f5f5",
            },
            title: {
                fontSize: 24,
                fontWeight: "bold",
                color: "#387adf",
                marginBottom: 20,
                textAlign: "center",
            },
            section: {
                marginBottom: 25,
            },
            sectionTitle: {
                fontSize: 18,
                fontWeight: "bold",
                color: "#387adf",
                marginBottom: 15,
                paddingLeft: 5,
            },
            settingItem: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: darkMode ? "#1e1e1e" : "#fff",
                padding: 16,
                borderRadius: 8,
                marginBottom: 10,
                elevation: 2,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            settingLabel: {
                fontSize: 16,
                color: darkMode ? "#fff" : "#000",
                fontWeight: "500",
            },
            settingDescription: {
                fontSize: 12,
                color: darkMode ? "#bbb" : "#797979",
                marginTop: 2,
            },
        });
    }, [darkMode]);

    return { darkMode, setDarkMode, theme };
};
