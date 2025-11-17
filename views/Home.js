import React from "react";
import { StyleSheet, Text, View, ScrollView, useWindowDimensions } from "react-native";
import { Card } from "../components/Card";
import { SubmitButton } from "../components/SubmitButton";

// Charts
import { PieChart, BarChart } from "react-native-chart-kit";

const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(56,122,223, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
    style: { borderRadius: 12 },
    propsForDots: { r: "4", strokeWidth: "2", stroke: "#fff" },
};

export function Home() {
    const { width: windowWidth } = useWindowDimensions();

    const H_PADDING = 48;
    const availableWidth = Math.max(windowWidth - H_PADDING, 200);

    const PIE_SIZE = Math.min(windowWidth * 0.8, 300);
    const PIE_INNER = PIE_SIZE;
    const BAR_WIDTH = Math.min(availableWidth * 0.95, 560);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Card color={"#387adf"}>
                    <Text style={styles.title_card}>Pacientes Recuperados: 2</Text>
                </Card>

                <View style={styles.cardsContainer}>
                    <Card color={"#fff"}>
                        <Text style={styles.sub_title_card}>Citas para hoy: 5</Text>
                    </Card>

                    <Card color={"#fff"}>
                        <Text style={styles.sub_title_card}>Pacientes atendidos: 156</Text>
                    </Card>

                    {/* Reportes - Especialidades más solicitadas */}
                    <Card color={"#fff"}>
                        <Text style={styles.sub_title_card}>Especialidades más solicitadas</Text>

                        <View>
                            <View>
                                <PieChart
                                    data={[
                                        {
                                            name: "Cardio",
                                            population: 35,
                                            color: "#387adf",
                                            legendFontColor: "#5F5F5F",
                                            legendFontSize: 12.5,
                                        },
                                        {
                                            name: "Pediatría",
                                            population: 25,
                                            color: "#f39c12",
                                            legendFontColor: "#5F5F5F",
                                            legendFontSize: 12.5,
                                        },
                                        {
                                            name: "Ortopedia",
                                            population: 20,
                                            color: "#27ae60",
                                            legendFontColor: "#5F5F5F",
                                            legendFontSize: 12.5,
                                        },
                                    ]}
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
                            </View>
                        </View>

                        <SubmitButton title={"Generar Reporte"} onPress={() => alert("Reporte Generado")} />
                    </Card>

                    {/* Reportes - Síntomas más comunes */}
                    <Card color={"#fff"}>
                        <Text style={styles.sub_title_card}>Síntomas más comunes</Text>
                        <View style={{ alignItems: "center" }}>
                            <ScrollView horizontal>
                                <BarChart
                                    data={{
                                        labels: ["Fiebre", "Tos", "Dolor"],
                                        datasets: [{ data: [45, 30, 20] }],
                                    }}
                                    width={Math.max(windowWidth, 400)}
                                    height={220}
                                    chartConfig={chartConfig}
                                    verticalLabelRotation={30}
                                    fromZero={true}
                                    style={{ marginVertical: 8, borderRadius: 12 }}
                                />
                            </ScrollView>
                        </View>
                        <SubmitButton title={"Generar Reporte"} onPress={() => alert("Reporte Generado")} />
                    </Card>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f5",
        height: 100,
    },
    content: {
        padding: 16,
    },
    cardsContainer: {
        marginTop: 10,
    },
    title_card: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffffff",
        marginBottom: 20,
        textAlign: "center",
    },
    sub_title_card: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#797979ff",
        marginBottom: 16,
        textAlign: "center",
    },
    circle_reporte: {
        backgroundColor: "#f0f3f8",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginVertical: 8,
        elevation: 2,
    },
    pieWrapper: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
});
