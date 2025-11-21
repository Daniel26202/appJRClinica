import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";

const Header = ({ doctor, specialty, date }) => {
    const { theme } = useTheme();
    return (
        <View>
            <View style={theme.header}>
                <View style={styles.headerContent}>
                    <View>
                        <Text style={theme.doctorName}>{doctor}</Text>
                        <Text style={theme.doctorSpecialty}>{specialty}</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text style={styles.title}>Citas de Hoy</Text>
                <View style={{ marginBottom: 11 }}>
                    <Text style={[theme.dateDay, { textAlign: "center" }]}>{date.split(",")[0]}</Text>

                    <Text
                        style={
                            //split separa por la coma "," el array
                            [theme.dateFull, { textAlign: "center" }]
                        }
                    >
                        {date.split(",")[1]}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        color: "#387adf",
        textAlign: "center",
        fontSize: 25,
        margin: "auto",
        paddingBottom: 16,
        paddingTop: 11,
    },
    headerContent: { flexDirection: "row", justifyContent: "space-between" },
});

export default Header;
