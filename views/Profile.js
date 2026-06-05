import React from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { usePerfil } from "../hooks/usePerfil";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const Profile = () => {
    const { theme } = useTheme();
    const { perfil, cargando } = usePerfil();

    return (
        <ScrollView style={theme.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Perfil de Usuario</Text>
                {cargando ? (
                    <ActivityIndicator color="#387adf" style={{ marginVertical: 20 }} />
                ) : perfil ? (
                    <>
                        {/* Información Personal */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Información Personal</Text>

                            <View style={theme.infoCard}>
                                <Text style={theme.label}>Nombre completo:</Text>
                                <Text style={theme.value}>
                                    {" "}
                                    {perfil.nombre} {perfil.apellido}
                                </Text>
                            </View>

                            <View style={theme.infoCard}>
                                <Text style={theme.label}>Cédula:</Text>
                                <Text style={theme.value}>
                                    {perfil.nacionalidad}-{perfil.cedula}
                                </Text>
                            </View>

                            <View style={theme.infoCard}>
                                <Text style={theme.label}>Email:</Text>
                                <Text style={theme.value}> {perfil.correo}</Text>
                            </View>

                            <View style={theme.infoCard}>
                                <Text style={theme.label}>Teléfono:</Text>
                                <Text style={theme.value}> {perfil.telefono}</Text>
                            </View>
                        </View>

                        {/* Información Profesional */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Información Profesional</Text>

                            <View style={theme.infoCard}>
                                <Text style={theme.label}>Especialidad:</Text>
                                <Text style={theme.value}>{perfil.especialidad ?? perfil.tipodecategoria ?? "Personal"}</Text>
                            </View>
                        </View>

                        {/* Estadísticas */}
                        {/* <View style={styles.section}>
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
                        </View> */}

                        {/* Horario de Trabajo */}
                        {/* <View style={styles.section}>
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
                        </View> */}
                    </>
                ) : (
                    <Text style={styles.sinDatos}>No se pudo cargar el perfil</Text>
                )}
            </View>
        </ScrollView>
    );
};

// ── Componente auxiliar ───────────────────────────────────────
function ProfileRow({ icon, label, value, theme }) {
    return (
        <View style={styles.profileRow}>
            <Ionicons name={icon} size={18} color="#387adf" />
            <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.profileRowLabel}>{label}</Text>
                <Text style={[styles.profileRowValue, theme.colorText]}>{value ?? "—"}</Text>
            </View>
        </View>
    );
}

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
