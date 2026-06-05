import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useTheme } from "../../hooks/useTheme";

const consultaP = (historiaClinica, diagnostico) => {
    Alert.alert("Datos de Hospitalización", `Historia Clínica: ${historiaClinica}\n\nDiagnóstico: ${diagnostico}\n`, [
        { text: "Cerrar", style: "cancel" },
    ]);
};

export const HPatientCard = ({ patient, getStatusColor, getStatusIcon }) => {
    const { theme } = useTheme();

    return (
        <View style={theme.card}>
            {/* Encabezado: nombre + estado */}
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={theme.name}>{patient.paciente}</Text>
                    <Text style={theme.age}>
                        {patient.edad} años • {patient.cedula}
                    </Text>
                </View>
                <View style={[styles.status, { backgroundColor: getStatusColor(patient.status) }]}>
                    <Ionicons name={getStatusIcon(patient.status)} size={14} color="#fff" />
                    <Text style={styles.statusText}>{patient.status.toUpperCase()}</Text>
                </View>
            </View>

            {/* Fecha de ingreso */}
            <View style={styles.row}>
                <Ionicons name="calendar" size={16} color="#797979" />
                <Text style={theme.detail}>Ingreso: {patient.ingreso?.replace("T", " ").slice(0, 16) ?? "—"}</Text>
            </View>

            {/* Diagnóstico */}
            <Text style={theme.diagnosis}>Diagnóstico: {patient.diagnostico}</Text>

            {/* Doctor */}
            <View style={styles.row}>
                <Ionicons name="medical" size={16} color="#387adf" />
                <Text style={theme.detail}>Médico: {patient.doctor}</Text>
            </View>

            {/* Botón expediente */}
            <TouchableOpacity style={styles.action} onPress={() => consultaP(patient.historial, patient.diagnostico)}>
                <Ionicons name="document-text" size={16} color="#387adf" />
                <Text style={styles.actionText}>Ver Expediente</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    status: {
        flexDirection: "row",
        alignItems: "center",
        padding: 4,
        borderRadius: 6,
    },
    statusText: {
        color: "#fff",
        marginLeft: 4,
        fontSize: 10,
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },
    action: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    actionText: {
        marginLeft: 6,
        color: "#387adf",
        fontWeight: "bold",
    },
});
