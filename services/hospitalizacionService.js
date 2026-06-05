import { api } from "./api";

export const hospitalizacionService = {
    obtenerResumen: async () => {
        return await api.get("Hospitalizacion/hospitalizacionApk");
    },
};