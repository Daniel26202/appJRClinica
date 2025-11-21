import { useState, useMemo, createContext, useContext } from "react";
import { StyleSheet } from "react-native";
const ThemeContext = createContext();
// contenedor del la lógica y lo que se va a utilizar en el tema
export const ThemeCont = ({ children }) => {
    const [DarkMode, setDarkMode] = useState(false);

    const theme = useMemo(() => {
        return StyleSheet.create({
            container: {
                height: 100,
                backgroundColor: DarkMode ? "#121212" : "#f5f5f5",
            },

            // configuración

            settingItem: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: DarkMode ? "#1e1e1e" : "#fff",
                padding: 16,
                borderRadius: 8,
                marginBottom: 10,
                elevation: 2,
                shadowColor: DarkMode ? "#adadadff" : "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            settingLabel: {
                fontSize: 16,
                color: DarkMode ? "#fff" : "#000",
                fontWeight: "500",
            },
            settingDescription: {
                fontSize: 12,
                color: DarkMode ? "#bbb" : "#797979",
                marginTop: 2,
            },

            // citas
            containerC: { flex: 1, backgroundColor: DarkMode ? "#121212" : "#f8fafc" },
            header: {
                backgroundColor: DarkMode ? "#1e1e1e" : "#ffffff",
                paddingHorizontal: 20,
                paddingTop: 10,
                paddingBottom: 20,
                borderBottomWidth: 1,
                borderBottomColor: DarkMode ? "#313131ff" : "#e2e8f0",
                elevation: 3,
            },
            doctorName: { fontSize: 24, fontWeight: "700", color: DarkMode ? "#ffffff" : "#1e293b" },
            doctorSpecialty: { fontSize: 16, color: DarkMode ? "#e2e8f0" : "#64748b", fontWeight: "500" },
            dateDay: { fontSize: 14, fontWeight: "700", color: DarkMode ? "#7f8c8d" : "#1e293b" },
            dateFull: { fontSize: 12, color: DarkMode ? "#7f8c8d" : "#64748b" },

            statCard: {
                flex: 1,
                backgroundColor: DarkMode ? "#1e1e1e" : "#fff",
                padding: 16,
                borderRadius: 12,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 3,
            },
            statNumber: { fontSize: 20, fontWeight: "700", color: DarkMode ? "#e2e8f0" : "#1e293b" },
            statLabel: { fontSize: 12, color: DarkMode ? "#e2e8f0" : "#64748b", fontWeight: "500" },
            textStatus: { fontWeight: "bold", fontSize: DarkMode ? 21.2 : 14.7 },

            citaCard: {
                backgroundColor: DarkMode ? "#1e1e1e" : "#fff",
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
                marginInline: 14,
                shadowColor: DarkMode ? "#adadadff" : "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 3,
            },
            primaryText: { color: DarkMode ? "#387adf" : "#fff" },
            successText: { color: DarkMode ? "#10b981" : "#fff" },
            primary: { backgroundColor: DarkMode ? "#1e1e1e" : "#387adf" },
            success: { backgroundColor: DarkMode ? "#1e1e1e" : "#10b981" },

            completedState: { backgroundColor: DarkMode ? "#1b1b1bff" : "#f1f5f9" },
            colorText: { color: DarkMode ? "#e2e8f0" : "#000" },

            // perfil
            infoCard: {
                backgroundColor: DarkMode ? "#1e1e1e" : "#fff",
                padding: 16,
                borderRadius: 8,
                marginBottom: 10,
                elevation: 2,
                shadowColor: DarkMode ? "#adadadff" : "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            label: {
                fontSize: 14,
                color: DarkMode ? "#e2e8f0" : "#797979",
                marginBottom: 4,
                fontWeight: "500",
            },
            value: {
                fontSize: 16,
                color: DarkMode ? "#fff" : "#000",
                fontWeight: "500",
            },
            statCardP: {
                backgroundColor: DarkMode ? "#1e1e1e" : "#fff",
                padding: 20,
                borderRadius: 8,
                alignItems: "center",
                flex: 0.48,
                elevation: 2,
                shadowColor: DarkMode ? "#adadadff" : "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },

            // hopitalizacion

            filterButton: {
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: DarkMode ? "#1e1e1e" : "#f8f9fa",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 6,
            },
            // Resumen dia
            daySummary: {
                backgroundColor: DarkMode ? "#1e1e1e" : "#fff",
                flexDirection: "row",
                borderRadius: 12,
                padding: 20,
                elevation: 2,
                marginTop: 13,
            },

            number: {
                fontSize: 20,
                fontWeight: "bold",
                color: DarkMode ? "#f8f9fa" : "#2c3e50",
                marginVertical: 4,
            },
            card: {
                backgroundColor: DarkMode ? "#1e1e1e" : "#fff",
                padding: 16,
                marginBottom: 12,
                borderRadius: 12,
                elevation: 2,
            },
            detail: { marginLeft: 6, fontSize: 12, color: DarkMode ? "#6d6d6dff" : "#555" },
            diagnosis: { marginTop: 6, fontSize: 13, fontStyle: "italic", color: DarkMode ? "#f8f9fa" : "#000" },
            name: { fontSize: 16, fontWeight: "bold", color: DarkMode ? "#e2e8f0" : "#2c3e50" },
            age: { fontSize: 12, color: DarkMode ? "#e2e8f0" : "#555" },
            button: {
                width: "48%",
                backgroundColor: DarkMode ? "#1e1e1e" : "#fff",
                padding: 16,
                borderRadius: 12,
                alignItems: "center",
                marginBottom: 12,
                elevation: 2,
            },
            text: {
                fontSize: 12,
                color: DarkMode ? "#e2e8f0" : "#2c3e50",
                fontWeight: "500",
                textAlign: "center",
            },
            cardEst: {
                alignItems: "center",
                margin: 8,
                flex: 0.48,
                backgroundColor: DarkMode ? "#1e1e1e" : "#fff",
                borderRadius: 12,
                padding: 16,
                elevation: 2,
            },
            numberEst: { fontSize: 18, fontWeight: "bold", color: DarkMode ? "#f8f9fa" : "#2c3e50" },
            labelEst: { fontSize: 12, color: DarkMode ? "#6d6d6dff" : "#555", textAlign: "center" },

            // inicio
            sub_title_card: {
                fontSize: 16,
                fontWeight: "bold",
                color: DarkMode ? "#f8f9fa" : "#797979ff",
                marginBottom: 16,
                textAlign: "center",
            },
            // inicio sesion
            titleIS: {
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "center",
                marginBottom: 8,
                color: DarkMode ? "#4592e6ff" : "#0057b5",
            },
            input: {
                height: 46,
                backgroundColor: DarkMode ? "#1e1e1e" : "#F3F5FF", // consistente con infoCard y botones
                borderRadius: 10,
                paddingHorizontal: 16,
                marginVertical: 8,
                fontSize: 16,
                color: DarkMode ? "#e2e8f0" : "#222831", // texto claro en oscuro, oscuro en claro
                shadowColor: DarkMode ? "#adadadff" : "#000", // sombra gris clara en modo oscuro
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 4,
                elevation: 2,
            },
        });
    }, [DarkMode]);

    return <ThemeContext.Provider value={{ DarkMode, setDarkMode, theme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
