import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useTheme } from "../../hooks/useTheme";

const consultaP = (historiaClinica, diagnostico) => {
    Alert.alert("Datos de Hospitalización", `Historia Clínica: ${historiaClinica}\n\nDiagnóstico: ${diagnostico}\n`, [
        { text: "Cancelar", style: "cancel" },
    ]);
};

export const HPatientCard = ({ patient, getStatusColor, getStatusIcon }) => {
    const { theme } = useTheme();

    return (
        <View style={theme.card}>
            <View style={styles.header}>
                <View>
                    <Text style={theme.name}>{patient.name}</Text>
                    <Text style={theme.age}>{patient.age} años</Text>
                </View>
                <View style={[styles.status, { backgroundColor: getStatusColor(patient.status) }]}>
                    <Ionicons name={getStatusIcon(patient.status)} size={14} color="#fff" />
                    <Text style={styles.statusText}>{patient.status.toUpperCase()}</Text>
                </View>
            </View>

            <View style={styles.details}>
                <Ionicons name="calendar" size={16} color="#797979" />
                <Text style={theme.detail}>Ingreso: {patient.admissionDate}</Text>
            </View>

            <Text style={theme.diagnosis}>Diagnóstico: {patient.diagnosis}</Text>

            <View style={styles.details}>
                <Ionicons name="medical" size={16} color="#387adf" />
                <Text style={theme.detail}>Médico: {patient.doctor}</Text>
            </View>

            <TouchableOpacity style={styles.action} onPress={() => consultaP(patient.historial, patient.diagnosis)}>
                <Ionicons name="document-text" size={16} color="#387adf" />
                <Text style={styles.actionText}>Expediente</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
   
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    status: {
        flexDirection: "row",
        alignItems: "center",
        padding: 4,
        borderRadius: 6,
    },
    statusText: { color: "#fff", marginLeft: 4, fontSize: 10 },
    details: { flexDirection: "row", alignItems: "center", marginTop: 6 },
    

    action: { flexDirection: "row", alignItems: "center", marginTop: 10 },
    actionText: { marginLeft: 6, color: "#387adf", fontWeight: "bold" },
});
