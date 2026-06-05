import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Pressable } from "react-native";
import { useTheme } from "../../hooks/useTheme";

const Header = ({ doctor, specialty, date, listaDoctores = [], onSelectDoctor }) => {
    const { theme, DarkMode } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <View style={theme.header}>
                <View style={styles.headerContent}>
                    <View>
                        {/* El nombre del doctor ahora es un botón desplegable */}
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(true)} style={styles.selectorButton}>
                            <Text style={theme.doctorName}>{doctor} ▾</Text>
                        </TouchableOpacity>

                        <Text style={theme.doctorSpecialty}>{specialty}</Text>
                    </View>
                </View>
            </View>

            <View>
                <Text style={styles.title}>Citas de Hoy</Text>
                <View style={{ marginBottom: 11 }}>
                    <Text style={[theme.dateDay, { textAlign: "center" }]}>{date.split(",")[0]}</Text>

                    <Text style={[theme.dateFull, { textAlign: "center" }]}>{date.split(",")[1]}</Text>
                </View>
            </View>

            {/* ==================== PANEL SELECTOR VISUAL ==================== */}
            <Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={() => setModalVisible(false)}>
                {/* Fondo translúcido que cierra el modal al tocar fuera */}
                <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    {/* Contenedor de la lista desplegable */}
                    <View
                        style={[
                            styles.modalContainer,
                            {
                                backgroundColor: DarkMode ? "#1e1e1e" : "#fff",
                                borderTopColor: DarkMode ? "#3b3b3b" : "#ffffff00",
                            },
                        ]}
                    >
                        <View style={[styles.modalIndicator, { backgroundColor: DarkMode ? "#c4c4c4" : "#E2E8F0" }]} />
                        <Text style={[styles.modalTitle, { color: DarkMode ? "#ffffff" : "#1E293B" }]}>Cambiar de Médico</Text>

                        <FlatList
                            data={listaDoctores}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => {
                                const isSelected = item.nombre === doctor;
                                return (
                                    <TouchableOpacity
                                        style={[
                                            theme.optionButton,
                                            isSelected && theme.optionButtonSelected,
                                            { backgroundColor: DarkMode ? "#1e1e1e" : "#EEF5FF" },
                                        ]}
                                        onPress={() => {
                                            onSelectDoctor(item.nombre); // Notifica el cambio al padre
                                            setModalVisible(false); // Cierra el modal
                                        }}
                                    >
                                        <Text style={[theme.optionText, isSelected && theme.optionTextSelected]}>
                                            {item.nombre}
                                        </Text>
                                        {isSelected && <Text style={theme.checkIcon}>✓</Text>}
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        color: "#387adf",
        textAlign: "center",
        fontSize: 25,
        margin: "auto",
        paddingBottom: 16,
        paddingTop: 11,
    },
    headerContent: { flexDirection: "row", justifyContent: "space-between" },
    selectorButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    /* Estilos del selector interactivo */
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        justifyContent: "flex-end",
    },
    modalContainer: {
        borderTopWidth: 0.3,

        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingBottom: 34,
        maxHeight: "45%", // Evita que cubra toda la pantalla si hay muchos doctores
    },
    modalIndicator: {
        width: 40,
        height: 5,
        borderRadius: 3,
        alignSelf: "center",
        marginTop: 12,
        marginBottom: 22,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",

        marginBottom: 16,
    },
});

export default Header;
