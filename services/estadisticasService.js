import { api } from "./api";

export const estadisticasService = {
    obtenerEspecialidades: async (fechaInicio = null, fechaFinal = null) => {
        const query = fechaInicio && fechaFinal ? `?inicio=${fechaInicio}&final=${fechaFinal}` : "";
        return await api.get(`Inicio/especialidadesApk${query}`);
    },
    obtenerSintomas: async (fechaInicio = null, fechaFinal = null) => {
        const query = fechaInicio && fechaFinal ? `?inicio=${fechaInicio}&final=${fechaFinal}` : "";
        return await api.get(`Inicio/sintomasApk${query}`);
    },
};