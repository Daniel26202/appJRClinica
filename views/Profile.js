import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export const Profile = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Perfil de Usuario</Text>

                {/* Información Personal */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Información Personal</Text>

                    <View style={styles.infoCard}>
                        <Text style={styles.label}>Nombre completo:</Text>
                        <Text style={styles.value}>Dr. Juan Pérez García</Text>
                    </View>

                    <View style={styles.infoCard}>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.value}>juan.perez@hospital.com</Text>
                    </View>

                    <View style={styles.infoCard}>
                        <Text style={styles.label}>Teléfono:</Text>
                        <Text style={styles.value}>+1 234 567 890</Text>
                    </View>

                    <View style={styles.infoCard}>
                        <Text style={styles.label}>Fecha de nacimiento:</Text>
                        <Text style={styles.value}>15 de Marzo, 1985</Text>
                    </View>
                </View>

                {/* Información Profesional */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Información Profesional</Text>

                    <View style={styles.infoCard}>
                        <Text style={styles.label}>Especialidad:</Text>
                        <Text style={styles.value}>Cardiología</Text>
                    </View>

                    <View style={styles.infoCard}>
                        <Text style={styles.label}>Cédula profesional:</Text>
                        <Text style={styles.value}>CP-784512963</Text>
                    </View>

                    <View style={styles.infoCard}>
                        <Text style={styles.label}>Años de experiencia:</Text>
                        <Text style={styles.value}>12 años</Text>
                    </View>

                    <View style={styles.infoCard}>
                        <Text style={styles.label}>Hospital:</Text>
                        <Text style={styles.value}>Hospital Central Metropolitano</Text>
                    </View>
                </View>

                {/* Estadísticas */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Estadísticas</Text>

                    <View style={styles.statsContainer}>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>156</Text>
                            <Text style={styles.statLabel}>Pacientes atendidos</Text>
                        </View>

                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>42</Text>
                            <Text style={styles.statLabel}>Citas este mes</Text>
                        </View>
                    </View>

                </View>

                {/* Horario de Trabajo */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Horario de Trabajo</Text>

                    <View style={styles.infoCard}>
                        <Text style={styles.label}>Lunes a Viernes:</Text>
                        <Text style={styles.value}>8:00 AM - 4:00 PM</Text>
                    </View>

                    <View style={styles.infoCard}>
                        <Text style={styles.label}>Sábados:</Text>
                        <Text style={styles.value}>9:00 AM - 1:00 PM</Text>
                    </View>

                    <View style={styles.infoCard}>
                        <Text style={styles.label}>Domingos:</Text>
                        <Text style={styles.value}>Descanso</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: "#f5f5f5",
    },
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
    infoCard: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    label: {
        fontSize: 14,
        color: "#797979",
        marginBottom: 4,
        fontWeight: "500",
    },
    value: {
        fontSize: 16,
        color: "#000",
        fontWeight: "500",
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    statCard: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 8,
        alignItems: "center",
        flex: 0.48,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#387adf",
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 12,
        color: "#797979",
        textAlign: "center",
    },
});
