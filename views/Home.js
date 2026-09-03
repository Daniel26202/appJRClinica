import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, useWindowDimensions, Modal, TouchableOpacity, Alert, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Card } from "../components/Card";
import { SubmitButton } from "../components/SubmitButton";
import { useTheme } from "../hooks/useTheme";
import { useCitas } from "../hooks/useCitas";
import { useEstadisticas } from "../hooks/useEstadisticas";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import { PieChart, BarChart } from "react-native-chart-kit";

const COLORES = ["#387adf", "#78a0f0", "#a4c7ff", "#ffcc00", "#ff6666"];

const chartConfigDark = {
    backgroundGradientFrom: "#1e1e1e",
    backgroundGradientTo: "#1e1e1e",
    decimalPlaces: 0,
    color: (o = 1) => `rgba(9,199,923, ${o})`,
    labelColor: () => `#e2e8f0`,
    style: { borderRadius: 12 },
    propsForDots: { r: "4", strokeWidth: "2", stroke: "#fff" },
};
const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (o = 1) => `rgba(56,122,223, ${o})`,
    labelColor: (o = 1) => `rgba(0,0,0, ${o})`,
    style: { borderRadius: 12 },
    propsForDots: { r: "4", strokeWidth: "2", stroke: "#fff" },
};

const formatearFecha = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
};

export function Home() {
    const { citas, cargando, error } = useCitas();
    const {
        especialidades,
        totalEspecialidades,
        cargandoEspecialidades,
        errorEspecialidades,
        cargarEspecialidades,
        sintomas,
        totalSintomas,
        cargandoSintomas,
        errorSintomas,
        cargarSintomas,
    } = useEstadisticas();

    const { DarkMode, theme } = useTheme();
    const { width: windowWidth } = useWindowDimensions();
    const PIE_INNER = Math.min(windowWidth * 0.8, 300);

    // Estado del modal de filtro: "especialidades" | "sintomas" | null
    const [modalTipo, setModalTipo] = useState(null);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFinal, setFechaFinal] = useState(null);
    const [mostrarPicker, setMostrarPicker] = useState(null); // "inicio" | "final" | null

    const dataEspecialidadesPie = especialidades.map((item, i) => ({
        name: item.especialidad,
        population: Number(item.total_solicitudes),
        color: COLORES[i % COLORES.length],
        legendFontColor: DarkMode ? "#7a7a7aff" : "#5F5F5F",
        legendFontSize: 12.5,
    }));

    const dataSintomasBar = {
        labels: sintomas.map((s) => s.sintoma),
        datasets: [{ data: sintomas.map((s) => Number(s.total)) }],
    };

    const abrirFiltro = (tipo) => {
        setFechaInicio(null);
        setFechaFinal(null);
        setModalTipo(tipo);
    };

    const aplicarFiltro = () => {
        if (!fechaInicio || !fechaFinal) {
            Alert.alert("Fechas requeridas", "Selecciona ambas fechas.");
            return;
        }
        if (fechaInicio >= fechaFinal) {
            Alert.alert("Fechas inválidas", "La fecha de inicio debe ser anterior a la fecha final.");
            return;
        }
        const ini = formatearFecha(fechaInicio);
        const fin = formatearFecha(fechaFinal);

        if (modalTipo === "especialidades") cargarEspecialidades(ini, fin);
        if (modalTipo === "sintomas") cargarSintomas(ini, fin);

        setModalTipo(null);
    };

    const quitarFiltro = () => {
        if (modalTipo === "especialidades") cargarEspecialidades();
        if (modalTipo === "sintomas") cargarSintomas();
        setModalTipo(null);
    };

    const generarReporteEspecialidades = async () => {
        const filas = especialidades.map((e) => `<tr><td>${e.especialidad}</td><td>${e.total_solicitudes}</td></tr>`).join("");
        const html = `<h1>Reporte de Especialidades Más Solicitadas</h1>
            <p>De las ${totalEspecialidades} especialidades médicas, las ${especialidades.length} más solicitadas son:</p>
            <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%;">
                <tr><th>Especialidad</th><th>Solicitudes</th></tr>${filas}</table>`;
        const { uri } = await Print.printToFileAsync({ html });
        await Sharing.shareAsync(uri);
    };

    const generarReporteSintomas = async () => {
        const filas = sintomas.map((s) => `<tr><td>${s.sintoma}</td><td>${s.total}</td></tr>`).join("");
        const html = `<h1>Reporte de Síntomas Más Comunes</h1>
            <p>De los ${totalSintomas} síntomas registrados, los ${sintomas.length} más comunes son:</p>
            <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%;">
                <tr><th>Síntoma</th><th>Casos</th></tr>${filas}</table>`;
        const { uri } = await Print.printToFileAsync({ html });
        await Sharing.shareAsync(uri);
    };

    return (
        <ScrollView style={theme.container}>
            <View style={styles.content}>
                <Card color={"#387adf"}>
                    <Text style={styles.title_card}>Pacientes Recuperados: 2</Text>
                </Card>

                <View style={styles.cardsContainer}>
                    <Card color={DarkMode ? "#1e1e1e" : "#fff"}>
                        <Text style={theme.sub_title_card}>
                            Citas para hoy: {error ? "Error" : cargando ? "Cargando..." : citas.length}
                        </Text>
                    </Card>

                    <Card color={DarkMode ? "#1e1e1e" : "#fff"}>
                        <Text style={theme.sub_title_card}>Pacientes atendidos: 156</Text>
                    </Card>

                    {/* Especialidades */}
                    <Card color={DarkMode ? "#1e1e1e" : "#fff"}>
                        <Text style={theme.sub_title_card}>Especialidades más solicitadas</Text>
                        {cargandoEspecialidades ? (
                            <Text style={{ textAlign: "center", padding: 20 }}>Cargando...</Text>
                        ) : errorEspecialidades ? (
                            <Text style={{ textAlign: "center", padding: 20, color: "#e74c3c" }}>{errorEspecialidades}</Text>
                        ) : dataEspecialidadesPie.length > 0 ? (
                            <PieChart
                                data={dataEspecialidadesPie}
                                width={PIE_INNER}
                                height={200}
                                chartConfig={chartConfig}
                                accessor="population"
                                backgroundColor="transparent"
                                paddingLeft="10"
                                center={[8, 0]}
                                absolute
                                style={{ alignSelf: "center" }}
                            />
                        ) : (
                            <Text style={{ textAlign: "center", padding: 20 }}>No hay datos para mostrar.</Text>
                        )}
                        <View style={{ flexDirection: "row", gap: 8 }}>
                            <SubmitButton title={"Filtrar"} onPress={() => abrirFiltro("especialidades")} />
                            <SubmitButton title={"Generar Reporte"} onPress={generarReporteEspecialidades} />
                        </View>
                    </Card>

                    {/* Síntomas */}
                    <Card color={DarkMode ? "#1e1e1e" : "#fff"}>
                        <Text style={theme.sub_title_card}>Síntomas más comunes</Text>
                        <View style={{ alignItems: "center" }}>
                            {cargandoSintomas ? (
                                <Text style={{ textAlign: "center", padding: 20 }}>Cargando...</Text>
                            ) : errorSintomas ? (
                                <Text style={{ textAlign: "center", padding: 20, color: "#e74c3c" }}>{errorSintomas}</Text>
                            ) : sintomas.length > 0 ? (
                                <ScrollView horizontal>
                                    <BarChart
                                        data={dataSintomasBar}
                                        width={Math.max(windowWidth, 400)}
                                        height={220}
                                        chartConfig={DarkMode ? chartConfigDark : chartConfig}
                                        verticalLabelRotation={30}
                                        fromZero={true}
                                        style={{ marginVertical: 8, borderRadius: 12 }}
                                    />
                                </ScrollView>
                            ) : (
                                <Text style={{ textAlign: "center", padding: 20 }}>No hay datos para mostrar.</Text>
                            )}
                        </View>
                        <View style={{ flexDirection: "row", gap: 8 }}>
                            <SubmitButton title={"Filtrar"} onPress={() => abrirFiltro("sintomas")} />
                            <SubmitButton title={"Generar Reporte"} onPress={generarReporteSintomas} />
                        </View>
                    </Card>
                </View>
            </View>

            {/* Modal de filtro con selector nativo de fecha */}
            <Modal visible={modalTipo !== null} transparent animationType="slide">
                <View style={styles.modalFondo}>
                    <Card color={DarkMode ? "#2e2e2e" : "#fff"}>
                        <Text style={theme.titleIS}>Filtrar por rango de fechas</Text>

                        <TouchableOpacity onPress={() => setMostrarPicker("inicio")} style={theme.input}>
                            <Text>{fechaInicio ? formatearFecha(fechaInicio) : "Seleccionar fecha inicio"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setMostrarPicker("final")} style={theme.input}>
                            <Text>{fechaFinal ? formatearFecha(fechaFinal) : "Seleccionar fecha final"}</Text>
                        </TouchableOpacity>

                        {mostrarPicker && (
                            <DateTimePicker
                                value={mostrarPicker === "inicio" ? fechaInicio || new Date() : fechaFinal || new Date()}
                                mode="date"
                                display={Platform.OS === "ios" ? "spinner" : "default"}
                                maximumDate={new Date()}
                                onChange={(event, selectedDate) => {
                                    setMostrarPicker(null);
                                    if (event.type === "set" && selectedDate) {
                                        if (mostrarPicker === "inicio") setFechaInicio(selectedDate);
                                        else setFechaFinal(selectedDate);
                                    }
                                }}
                            />
                        )}

                        <SubmitButton title="Aplicar" onPress={aplicarFiltro} />
                        <TouchableOpacity onPress={quitarFiltro}>
                            <Text style={{ textAlign: "center", marginTop: 10 }}>Quitar filtro</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalTipo(null)}>
                            <Text style={{ textAlign: "center", marginTop: 6, color: "#e74c3c" }}>Cancelar</Text>
                        </TouchableOpacity>
                    </Card>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: { padding: 16 },
    cardsContainer: { marginTop: 10 },
    title_card: { fontSize: 24, fontWeight: "bold", color: "#ffffffff", marginBottom: 20, textAlign: "center" },
    modalFondo: { flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)", padding: 20 },
});
