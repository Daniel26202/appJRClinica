import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";

const Stats = ({ stats }) => {
    const { theme } = useTheme();

    return (
        <View style={styles.statsContainer}>
            <View style={theme.statCard}>
                <Text style={theme.statNumber}>{stats.total}</Text>
                <Text style={theme.statLabel}>Total Citas</Text>
            </View>
            <View style={theme.statCard}>
                <Text style={[theme.statNumber, { color: "#387adf" }]}>{stats.pendientes}</Text>
                <Text style={theme.statLabel}>Pendientes</Text>
            </View>
            <View style={theme.statCard}>
                <Text style={[theme.statNumber, { color: "#10b981" }]}>{stats.completadas}</Text>
                <Text style={theme.statLabel}>Completadas</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statsContainer: { flexDirection: "row", padding: 16, gap: 12 },

});

export default Stats;
