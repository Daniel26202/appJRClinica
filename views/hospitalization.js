import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
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
import { useHospitalizacion } from "../hooks/useHospitalizacion";

export const Hospitalization = () => {
    const { theme } = useTheme();

    const { pacientes, stats, cargando, error, recargar } = useHospitalizacion();

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

    if (cargando)
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#387adf" />
                <Text style={{ marginTop: 12, color: "#64748b" }}>Cargando hospitalizaciones...</Text>
            </View>
        );

    if (error)
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "#e74c3c", padding: 20, textAlign: "center" }}>{error}</Text>
            </View>
        );

    return (
        <ScrollView style={theme.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Hospitalización</Text>

                {/* Estadísticas */}
                <View style={styles.statsContainer}>
                    <HStatCard icon="bed" bgColor="#3498db" number={stats.ocupadas} label="Camas Ocupadas" />
                    <HStatCard icon="bed-outline" bgColor="#27ae60" number={stats.disponibles} label="Camas Disponibles" />
                </View>

                {/* Resumen del Día */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resumen del Día</Text>
                    <View style={theme.daySummary}>
                        <HDaySummaryItem icon="log-in" color="#27ae60" number={stats.ingresos_hoy} label="Ingresos Hoy" />
                        <View style={styles.summaryDivider} />
                        <HDaySummaryItem icon="log-out" color="#e74c3c" number={stats.altas_hoy} label="Altas Hoy" />
                    </View>
                </View>

                {/* Lista de Pacientes */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Pacientes Hospitalizados</Text>
                    </View>

                    {pacientes.length === 0 ? (
                        <Text style={styles.sinPacientes}>No hay pacientes hospitalizados</Text>
                    ) : (
                        pacientes.map((p) => (
                            <HPatientCard key={p.id} patient={p} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
                        ))
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    content: { padding: 16 },
    title: { fontSize: 24, fontWeight: "bold", color: "#387adf", marginBottom: 20, textAlign: "center" },
    statsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
    section: { marginBottom: 25 },
    sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
    sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#387adf", marginBottom: 12 },
    summaryDivider: { width: 1, backgroundColor: "#ecf0f1", marginHorizontal: 20 },
    sinPacientes: { textAlign: "center", color: "#64748b", fontSize: 16, marginTop: 20 },
});
