import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = ({ doctor, specialty, date }) => (
    <View>
        <View style={styles.header}>
            <View style={styles.headerContent}>
                <View>
                    <Text style={styles.doctorName}>{doctor}</Text>
                    <Text style={styles.doctorSpecialty}>{specialty}</Text>
                </View>
            </View>
        </View>
        <View>
            <Text style={styles.title}>Citas de Hoy</Text>
            <View style={{ marginBottom: 11 }}>
                <Text style={[styles.dateDay, { textAlign: "center" }]}>{date.split(",")[0]}</Text>

                <Text
                    style={
                        //split separa por la coma "," el array
                        [styles.dateFull, { textAlign: "center" }]
                    }
                >
                    {date.split(",")[1]}
                </Text>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#e2e8f0",
        elevation: 3,
    },
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
    doctorName: { fontSize: 24, fontWeight: "700", color: "#1e293b" },
    doctorSpecialty: { fontSize: 16, color: "#64748b", fontWeight: "500" },

    dateDay: { fontSize: 14, fontWeight: "700", color: "#1e293b" },
    dateFull: { fontSize: 12, color: "#64748b" },
});

export default Header;
