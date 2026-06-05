import React, { useState } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
// Componentes
import Header from "../components/cita/header";
import Stats from "../components/cita/stats";
import CitaCard from "../components/cita/citaCard";
import StatusBarCustom from "../components/cita/statusCard";

// Helpers (funciones auxiliares)
import { getTipoInfo, formatFecha } from "../components/cita/utilities";
import { useTheme } from "../hooks/useTheme";
import { useCitas } from "../hooks/useCitas";

export const Citas = () => {
    const { theme } = useTheme();

    const { citas, cargando, error } = useCitas();
    const [doctorActual, setDoctorActual] = useState(null);

    // --- Estados de carga y error ---
    if (cargando)
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#387adf" />
                <Text style={{ marginTop: 12, color: "#64748b" }}>Cargando citas...</Text>
            </View>
        );
    if (error)
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "#e74c3c", padding: 20, textAlign: "center" }}>{error}</Text>
            </View>
        );

    // Extraemos doctores únicos de las citas que llegaron del backend
    const listaDoctores = [...new Map(citas.map((c) => [c.doctor, { nombre: c.doctor }])).values()];

    // Si no eligió ninguno aún, mostramos el primero automáticamente
    const doctorSeleccionado = doctorActual ?? listaDoctores[0]?.nombre ?? "";

    // Especialidad del doctor seleccionado para mostrar en el header
    // find devuelve únicamente el primer elemento que cumpla tu condición, deteniéndose de inmediato al encontrarlo
    const especialidad = citas.find((c) => c.doctor === doctorSeleccionado)?.especialidad ?? "";
    // filtradas por el doctor activo
    const citasDelDoctor = citas.filter((c) => c.doctor === doctorSeleccionado);

    const stats = {
        total: citas.length,
        pendientes: citas.filter((c) => c.estado === "Pendiente").length,
        completadas: citas.filter((c) => c.estado === "Realizadas").length,
    };

    // Tu lista de doctores disponibles
    return (
        <View style={theme.containerC}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <StatusBar style="dark" />

                {/* Header */}
                <Header
                    doctor={doctorSeleccionado}
                    specialty={especialidad}
                    date={formatFecha(new Date())}
                    listaDoctores={listaDoctores}
                    onSelectDoctor={(nombre) => setDoctorActual(nombre)}
                />

                {/* Estadísticas */}
                <Stats stats={stats} />

                 {/* Lista de citas del doctor seleccionado */}
                {citasDelDoctor.length === 0 ? (
                    <Text style={styles.sinCitas}>Sin citas para hoy</Text>
                ) : (
                    citasDelDoctor.map((cita, index) => (
                        <CitaCard
                            key={cita.id_cita}
                            cita={cita}
                            index={index}
                            tipoInfo={getTipoInfo(cita.categoria)}
                            cambiarEstadoCita={() => {}}
                        />
                    ))
                )}
            </ScrollView>

            {/* Barra de estado inferior */}
            <StatusBarCustom citasDelDia={citas} />
        </View>
    );
};


const styles = StyleSheet.create({
    scrollView: { flex: 1 },
    sinCitas: {
        textAlign: "center",
        color: "#64748b",
        fontSize: 16,
        marginTop: 40,
    },
});