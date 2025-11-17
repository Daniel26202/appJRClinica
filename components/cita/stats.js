import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Stats = ({ stats }) => (
    <View style={styles.statsContainer}>
        <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total Citas</Text>
        </View>
        <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: "#387adf" }]}>{stats.pendientes}</Text>
            <Text style={styles.statLabel}>Pendientes</Text>
        </View>
        <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: "#10b981" }]}>{stats.completadas}</Text>
            <Text style={styles.statLabel}>Completadas</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    statsContainer: { flexDirection: "row", padding: 16, gap: 12 },
    statCard: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    statNumber: { fontSize: 20, fontWeight: "700", color: "#1e293b" },
    statLabel: { fontSize: 12, color: "#64748b", fontWeight: "500" },
});

export default Stats;
