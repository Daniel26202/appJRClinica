import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";

const CitaCard = ({ cita, index }) => {
    const { theme } = useTheme();

    return (
        <View style={theme.citaCard}>
            {/* Acciones */}
            <View style={styles.actionsSection}>
                {cita.estado === "Pendiente" ? (
                    <View style={[styles.posicion, theme.primary]}>
                        <View style={styles.citaHeader}>
                            <View>
                                <Text style={[theme.primaryText, theme.textStatus]}>#{index + 1}</Text>
                            </View>
                            <View style={{ marginRight: 12 }}>
                                <Text style={[theme.primaryText, theme.textStatus]}>⏱ Consulta Pendiente</Text>
                            </View>
                            <View></View>
                        </View>
                    </View>
                ) : cita.estado === "Realizadas" ? (
                    <View style={[styles.posicion, theme.success]}>
                        <View style={styles.citaHeader}>
                            <View>
                                <Text style={[theme.successText, theme.textStatus]}>#{index + 1}</Text>
                            </View>
                            <View style={{ marginRight: 12 }}>
                                <Text style={[theme.successText, theme.textStatus]}>✓ Consulta Finalizada</Text>
                            </View>
                            <View></View>
                        </View>
                    </View>
                ) : (
                    <View style={[styles.posicion, theme.completedState]}>
                        <Text style={styles.completedText}>✓ Consulta </Text>
                    </View>
                )}
            </View>

            {/* Paciente */}
            <View style={styles.pacienteSection}>
                <View>
                    <Text style={[styles.pacienteNombre,theme.colorText]}>{cita.paciente}</Text>
                </View>
                <Text style={[styles.textCedula,theme.colorText]}>{cita.cedula}</Text>
                <Text style={[theme.colorText]}>
                    {cita.edad} - {cita.telefono}
                </Text>
            </View>
            <View style={{ marginLeft: 6 }}>
                <Text style={[styles.citaHora,theme.colorText]}>{cita.hora}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    citaHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    citaHora: { fontSize: 18, fontWeight: "700" },
    pacienteSection: { marginVertical: 13, marginLeft: 6 },
    pacienteNombre: { fontSize: 19, fontWeight: "700" },
    actionsSection: { marginTop: 8 },
    posicion: { padding: 12, borderRadius: 8, alignItems: "center" },
    completedText: { color: "#64748b" },
    textCedula: { marginBottom: 8, fontSize: 13 },
});

export default CitaCard;
