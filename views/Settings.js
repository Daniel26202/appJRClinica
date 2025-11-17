import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";

export function Settings({ navigation }) {
    const { darkMode, setDarkMode, theme } = useTheme();

    const [notifications, setNotifications] = useState(true);
    const [autoSync, setAutoSync] = useState(false);

    const handleLogout = () => {
        Alert.alert("Cerrar Sesión", "¿Estás seguro de que deseas cerrar sesión?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Cerrar Sesión",
                onPress: () => navigation.replace("Login"),
                style: "destructive",
            },
        ]);
    };

    return (
        <ScrollView style={theme.container}>
            <View style={theme.content}>
                <Text style={theme.title}>Configuración</Text>

                {/* Notificaciones */}
                <View style={theme.section}>
                    <Text style={theme.sectionTitle}>Notificaciones</Text>

                    <View style={theme.settingItem}>
                        <View style={theme.settingInfo}>
                            <Ionicons name="notifications" size={22} color="#387adf" />
                            <View style={theme.textContainer}>
                                <Text style={theme.settingLabel}>Notificaciones</Text>
                                <Text style={theme.settingDescription}>Recibir notificaciones importantes</Text>
                            </View>
                        </View>
                        <Switch
                            value={notifications}
                            onValueChange={setNotifications}
                            trackColor={{ false: "#767577", true: "#387adf" }}
                            thumbColor={notifications ? "#fff" : "#f4f3f4"}
                        />
                    </View>

                    <View style={theme.settingItem}>
                        <View style={theme.settingInfo}>
                            <Ionicons name="mail" size={22} color="#387adf" />
                            <View style={theme.textContainer}>
                                <Text style={theme.settingLabel}>Notificaciones por Email</Text>
                                <Text style={theme.settingDescription}>Recibir resúmenes diarios</Text>
                            </View>
                        </View>
                        <Switch
                            value={autoSync}
                            onValueChange={setAutoSync}
                            trackColor={{ false: "#767577", true: "#387adf" }}
                            thumbColor={autoSync ? "#fff" : "#f4f3f4"}
                        />
                    </View>
                </View>

                {/* Seguridad */}
                <View style={theme.section}>
                    <Text style={theme.sectionTitle}>Seguridad</Text>

                    <TouchableOpacity style={theme.settingItem}>
                        <View style={theme.settingInfo}>
                            <Ionicons name="lock-closed" size={22} color="#387adf" />
                            <View style={theme.textContainer}>
                                <Text style={theme.settingLabel}>Cambiar Contraseña</Text>
                                <Text style={theme.settingDescription}>Actualizar contraseña de acceso</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#797979" />
                    </TouchableOpacity>
                </View>

                {/* Apariencia */}
                <View style={theme.section}>
                    <Text style={theme.sectionTitle}>Apariencia</Text>

                    <View style={theme.settingItem}>
                        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                            <Ionicons name="moon" size={22} color="#387adf" />
                            <View style={{ marginLeft: 12, flex: 1 }}>
                                <Text style={theme.settingLabel}>Modo Oscuro</Text>
                                <Text style={theme.settingDescription}>Activar interfaz oscura</Text>
                            </View>
                        </View>
                        <Switch
                            value={darkMode}
                            onValueChange={setDarkMode}
                            trackColor={{ false: "#767577", true: "#387adf" }}
                            thumbColor={darkMode ? "#fff" : "#f4f3f4"}
                        />
                    </View>
                </View>

                {/* Información de la App */}
                <View style={theme.section}>
                    <Text style={theme.sectionTitle}>Información</Text>

                    <TouchableOpacity style={theme.settingItem}>
                        <View style={theme.settingInfo}>
                            <Ionicons name="information-circle" size={22} color="#387adf" />
                            <View style={theme.textContainer}>
                                <Text style={theme.settingLabel}>Acerca de</Text>
                                <Text style={theme.settingDescription}>Versión 1.0.0</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#797979" />
                    </TouchableOpacity>

                    <TouchableOpacity style={theme.settingItem}>
                        <View style={theme.settingInfo}>
                            <Ionicons name="help-circle" size={22} color="#387adf" />
                            <View style={theme.textContainer}>
                                <Text style={theme.settingLabel}>Ayuda y Soporte</Text>
                                <Text style={theme.settingDescription}>Centro de ayuda</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#797979" />
                    </TouchableOpacity>
                </View>

                {/* Acciones Peligrosas */}
                <View style={theme.section}>
                    <TouchableOpacity style={[theme.settingItem, theme.dangerButton]} onPress={handleLogout}>
                        <View style={theme.settingInfo}>
                            <Ionicons name="log-out" size={22} color="#e74c3c" />
                            <Text style={[theme.settingLabel, theme.dangerText]}>Cerrar Sesión</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};
