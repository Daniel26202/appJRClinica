import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatusBarCustom = ({ citasDelDia }) => {
    const pacienteEnConsulta = citasDelDia.find((c) => c.estado === "Realizada" && c.enConsulta > 0);
    return (
        <View style={styles.statusBar}>
            <View style={styles.statusContent}>
                <View style={styles.statusIndicator} />
                <Text style={styles.statusText}>
                    {
                        // El ?. evita errores si pacienteEnConsulta es undefined
                        pacienteEnConsulta.enConsulta > 0
                            ? `Atendiendo a ${pacienteEnConsulta?.paciente}`
                            : "Listo para recibir pacientes"
                    }
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statusBar: { backgroundColor: "#1e293b", padding: 16 },
    statusContent: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    statusIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#10b981",
        marginRight: 8,
    },
    statusText: { color: "#fff", fontSize: 14, fontWeight: "500" },
});

export default StatusBarCustom;
