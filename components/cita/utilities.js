// utils/helpers.js

// Devuelve info visual del estado
export const getEstadoInfo = (estado) => {
    switch (estado) {
        case "pendiente":
            return { color: "#f59e0b", label: "Pendiente", icon: "⏱" };
        case "completada":
            return { color: "#6b7280", label: "Completada", icon: "✅" };
        default:
            return { color: "#9ca3af", label: "Desconocido", icon: "?" };
    }
};

// Devuelve info visual del tipo de cita
export const getTipoInfo = (tipo) => {
    switch (tipo) {
        case "consulta":
            return { color: "#3b82f6", label: "Consulta" };
        case "urgencia":
            return { color: "#ef4444", label: "Urgencia" };
        case "seguimiento":
            return { color: "#8b5cf6", label: "Seguimiento" };
        case "control":
            return { color: "#10b981", label: "Control" };
        case "examen":
            return { color: "#f59e0b", label: "Examen" };
        default:
            return { color: "#9ca3af", label: "General" };
    }
};

// Formatea la fecha en español
export const formatFecha = (fecha) => {
    return fecha.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
