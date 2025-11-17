import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

// Componentes
import Header from "../components/cita/header";
import Stats from "../components/cita/stats";
import CitaCard from "../components/cita/citaCard";
import StatusBarCustom from "../components/cita/statusCard";

// Helpers (funciones auxiliares)
import { getEstadoInfo, getTipoInfo, formatFecha } from "../components/cita/utilities";

export const Citas = () => {
    const [selectedDate] = useState(new Date());
    const [doctorActual] = useState("Dr. Carlos Rodríguez");

    // Citas de ejemplo
    const citasDelDia = [
        {
            id: "1",
            paciente: "María González",
            cedula: "30554032",
            edad: "45 años",
            telefono: "+34 612 345 678",
            hora: "13:00",
            estado: "pendiente",
            duracion: "30 min",
            enConsulta: 0,
        },
        {
            id: "2",
            paciente: "Juan Pérez",
            cedula: "32254032",
            edad: "62 años",
            telefono: "+34 623 456 789",
            hora: "09:30",
            estado: "pendiente",
            duracion: "20 min",
            enConsulta: 0,
        },
        {
            id: "3",
            paciente: "Laura Sánchez",
            cedula: "25254032",
            edad: "28 años",
            telefono: "+34 634 567 890",
            hora: "10:15",
            estado: "Realizada",
            duracion: "25 min",
            enConsulta: 1,
        },
        {
            id: "4",
            paciente: "Roberto Jiménez",
            cedula: "20254032",
            edad: "35 años",
            telefono: "+34 645 678 901",
            hora: "11:00",
            estado: "pendiente",
            duracion: "40 min",
            enConsulta: 0,
        },
        {
            id: "5",
            paciente: "Ana López",
            cedula: "20253232",
            edad: "50 años",
            telefono: "+34 656 789 012",
            hora: "11:45",
            estado: "Realizada",
            duracion: "30 min",
            enConsulta: 0,
        },
    ];

    const cambiarEstadoCita = (id, nuevoEstado) => {
        console.log(`Cambiando cita ${id} a estado: ${nuevoEstado}`);
    };

    const stats = {
        total: citasDelDia.length,
        pendientes: citasDelDia.filter((c) => c.estado === "pendiente").length,
        completadas: citasDelDia.filter((c) => c.estado === "Realizada").length,
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <StatusBar style="dark" />

                {/* Header */}
                <Header doctor={doctorActual} specialty="Cardiólogo" date={formatFecha(selectedDate)} />
                {/* Estadísticas */}
                <Stats stats={stats} />

                {/* Lista de Citas */}
                {
                    // Orden por hora
                    citasDelDia
                        .sort((a, b) => a.hora.localeCompare(b.hora))
                        .map((cita, index) => (
                            <CitaCard
                                key={cita.id}
                                cita={cita}
                                index={index}
                                estadoInfo={getEstadoInfo(cita.estado)}
                                tipoInfo={getTipoInfo(cita.tipo)}
                                cambiarEstadoCita={cambiarEstadoCita}
                            />
                        ))
                }
            </ScrollView>

            {/* Barra de estado inferior */}
            <StatusBarCustom citasDelDia={citasDelDia} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8fafc" },
    scrollView: { height: 100 },
});
