import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// targeta estadistica
import { HStatCard } from "../components/hospitalization/HStatCard";
// resumen del dia
import { HDaySummaryItem } from "../components/hospitalization/HDaySummaryItem";
// card de paciente
import { HPatientCard } from "../components/hospitalization/HPatientCard";
// btn de accion rapida
import { HQuickActionButton } from "../components/hospitalization/HQuickActionButton";
import { useTheme } from "../hooks/useTheme";

export const Hospitalization = () => {
    const { theme } = useTheme();
    // Datos de ejemplo
    const hospitalizationData = {
        totalPatients: 24,
        // cama disponible
        availableBeds: 8,
        // pacientes ingresos de hoy
        todayAdmissions: 3,
        todayDischarges: 2,
        averageStay: "4.2 días",
    };

    const patients = [
        {
            id: 1,
            name: "María González",
            age: 65,
            admissionDate: "2024-01-15",
            diagnosis: "Neumonía",
            historial: "No aplica",
            doctor: "Dr. Rodríguez",
            status: "estable",
        },
        {
            id: 2,
            name: "Carlos López",
            age: 72,
            admissionDate: "2024-01-14",
            diagnosis: "Fractura de cadera",
            historial: "Hospitalizado por desmayo",
            doctor: "Dra. Martínez",
            status: "mejorando",
        },
        {
            id: 3,
            name: "Ana Vargas",
            age: 45,
            admissionDate: "2024-01-16",
            diagnosis: "Apéndicitis aguda",
            historial: "Hospitalizado por apéndicitis",
            doctor: "Dr. Herrera",
            status: "crítico",
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "crítico":
                return "#e74c3c";
            case "estable":
                return "#27ae60";
            case "mejorando":
                return "#f39c12";
            default:
                return "#95a5a6";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "crítico":
                return "warning";
            case "estable":
                return "checkmark-circle";
            case "mejorando":
                return "trending-up";
            default:
                return "help-circle";
        }
    };

    return (
        <ScrollView style={theme.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Hospitalización</Text>

                {/* Estadísticas */}
                <View style={styles.statsContainer}>
                    <HStatCard
                        icon="bed"
                        bgColor="#3498db"
                        number={hospitalizationData.totalPatients}
                        label="Pacientes Totales"
                    />
                    <HStatCard
                        icon="bed-outline"
                        bgColor="#27ae60"
                        number={hospitalizationData.availableBeds}
                        label="Camas Disponibles"
                    />
                </View>

                {/* Resumen del Día */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resumen del Día</Text>
                    <View style={theme.daySummary}>
                        <HDaySummaryItem
                            icon="log-in"
                            color="#27ae60"
                            number={hospitalizationData.todayAdmissions}
                            label="Ingresos Hoy"
                        />
                        <View style={styles.summaryDivider} />
                        <HDaySummaryItem
                            icon="log-out"
                            color="#e74c3c"
                            number={hospitalizationData.todayDischarges}
                            label="Altas Hoy"
                        />
                    </View>
                </View>

                {/* Lista de Pacientes */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Pacientes Hospitalizados</Text>
                        <TouchableOpacity style={theme.filterButton}>
                            <Ionicons name="filter" size={18} color="#387adf" />
                            <Text style={styles.filterText}>Filtrar</Text>
                        </TouchableOpacity>
                    </View>

                    {patients.map((p) => (
                        <HPatientCard key={p.id} patient={p} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
                    ))}
                </View>

                {/* Acciones Rápidas */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
                    <View style={styles.quickActions}>
                        <HQuickActionButton
                            icon="person-add"
                            bgColor="#27ae60"
                            label="Nuevo Ingreso"
                            onPress={() => console.log("Nuevo Ingreso")}
                        />
                        <HQuickActionButton
                            icon="person-remove"
                            bgColor="#e74c3c"
                            label="Alta Médica"
                            onPress={() => console.log("Alta Médica")}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    content: { padding: 16 },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#387adf",
        marginBottom: 20,
        textAlign: "center",
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    section: { marginBottom: 25 },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#387adf",marginBottom:12 },

    filterText: {
        fontSize: 12,
        color: "#387adf",
        marginLeft: 4,
        fontWeight: "500",
    },
    
    // divisor resumen
    summaryDivider: {
        width: 1,
        backgroundColor: "#ecf0f1",
        marginHorizontal: 20,
    },
    // acciones rapidas
    quickActions: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});
