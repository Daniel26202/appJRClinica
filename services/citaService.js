// services/citasService.js
import { api } from "./api";

export const citaService = {

    obtenerHoy: async () => {
        return await api.get("Citas/citasHoyCompletasApk");
    },

};

