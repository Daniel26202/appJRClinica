import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CitaCard = ({ cita, index }) => (
    <View style={styles.citaCard}>
        {/* Acciones */}
        <View style={styles.actionsSection}>
            {cita.estado === "pendiente" ? (
                <View style={[styles.posicion, styles.primary]}>
                    <View style={styles.citaHeader}>
                        <View>
                            <Text style={[styles.successText, styles.textStatus]}>#{index + 1}</Text>
                        </View>
                        <View style={{ marginRight: 12 }}>
                            <Text style={[styles.primaryText, styles.textStatus]}>⏱ Consulta Pendiente</Text>
                        </View>
                        <View></View>
                    </View>
                </View>
            ) : cita.estado === "Realizada" ? (
                <View style={[styles.posicion, styles.success]}>
                    <View style={styles.citaHeader}>
                        <View>
                            <Text style={[styles.successText, styles.textStatus]}>#{index + 1}</Text>
                        </View>
                        <View style={{ marginRight: 12 }}>
                            <Text style={[styles.successText, styles.textStatus]}>✓ Consulta Finalizada</Text>
                        </View>
                        <View></View>
                    </View>
                </View>
            ) : (
                <View style={[styles.posicion, styles.completedState]}>
                    <Text style={styles.completedText}>✓ Consulta </Text>
                </View>
            )}
        </View>

        {/* Paciente */}
        <View style={styles.pacienteSection}>
            <View>
                <Text style={styles.pacienteNombre}>{cita.paciente}</Text>
            </View>
            <Text style={styles.textCedula}>{cita.cedula}</Text>
            <Text>
                {cita.edad} - {cita.telefono}
            </Text>
        </View>
        <View style={{ marginLeft: 6 }}>
            <Text style={styles.citaHora}>{cita.hora}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    citaCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        marginInline: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    citaHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    textStatus: { fontWeight: "bold" },
    citaHora: { fontSize: 18, fontWeight: "700" },
    pacienteSection: { marginVertical: 13, marginLeft: 6 },
    pacienteNombre: { fontSize: 19, fontWeight: "700" },
    actionsSection: { marginTop: 8 },
    posicion: { padding: 12, borderRadius: 8, alignItems: "center" },
    primary: { backgroundColor: "#387adf" },
    primaryText: { color: "#fff" },
    success: { backgroundColor: "#10b981" },
    successText: { color: "#fff" },
    completedState: { backgroundColor: "#f1f5f9" },
    completedText: { color: "#64748b" },
    textCedula: { marginBottom: 8, fontSize: 13 },
});

export default CitaCard;
