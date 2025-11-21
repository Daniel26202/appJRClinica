import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../hooks/useTheme";

export const Profile = () => {
    const { theme } = useTheme();

    return (
        <ScrollView style={theme.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Perfil de Usuario</Text>

                {/* Información Personal */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Información Personal</Text>

                    <View style={theme.infoCard}>
                        <Text style={theme.label}>Nombre completo:</Text>
                        <Text style={theme.value}>Dr. Juan Pérez García</Text>
                    </View>

                    <View style={theme.infoCard}>
                        <Text style={theme.label}>Email:</Text>
                        <Text style={theme.value}>juan.perez@hospital.com</Text>
                    </View>

                    <View style={theme.infoCard}>
                        <Text style={theme.label}>Teléfono:</Text>
                        <Text style={theme.value}>+1 234 567 890</Text>
                    </View>

                    <View style={theme.infoCard}>
                        <Text style={theme.label}>Fecha de nacimiento:</Text>
                        <Text style={theme.value}>15 de Marzo, 1985</Text>
                    </View>
                </View>

                {/* Información Profesional */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Información Profesional</Text>

                    <View style={theme.infoCard}>
                        <Text style={theme.label}>Especialidad:</Text>
                        <Text style={theme.value}>Cardiología</Text>
                    </View>

                    <View style={theme.infoCard}>
                        <Text style={theme.label}>Cédula profesional:</Text>
                        <Text style={theme.value}>CP-784512963</Text>
                    </View>

                    <View style={theme.infoCard}>
                        <Text style={theme.label}>Años de experiencia:</Text>
                        <Text style={theme.value}>12 años</Text>
                    </View>

                    <View style={theme.infoCard}>
                        <Text style={theme.label}>Hospital:</Text>
                        <Text style={theme.value}>Hospital Central Metropolitano</Text>
                    </View>
                </View>

                {/* Estadísticas */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Estadísticas</Text>

                    <View style={styles.statsContainer}>
                        <View style={theme.statCardP}>
                            <Text style={styles.statNumber}>156</Text>
                            <Text style={theme.statLabel}>Pacientes atendidos</Text>
                        </View>

                        <View style={theme.statCardP}>
                            <Text style={styles.statNumber}>42</Text>
                            <Text style={theme.statLabel}>Citas este mes</Text>
                        </View>
                    </View>
                </View>

                {/* Horario de Trabajo */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Horario de Trabajo</Text>

                    <View style={theme.infoCard}>
                        <Text style={theme.label}>Lunes a Viernes:</Text>
                        <Text style={theme.value}>8:00 AM - 4:00 PM</Text>
                    </View>

                    <View style={theme.infoCard}>
                        <Text style={theme.label}>Sábados:</Text>
                        <Text style={theme.value}>9:00 AM - 1:00 PM</Text>
                    </View>

                    <View style={theme.infoCard}>
                        <Text style={theme.label}>Domingos:</Text>
                        <Text style={theme.value}>Descanso</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    content: {
        padding: 16,
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

    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },

    statNumber: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#387adf",
        marginBottom: 5,
    },

});
