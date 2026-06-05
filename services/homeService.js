// services/homeService.js
import { api } from "./api";

export const homeService = {

    obtenerHoy: async () => {
        return await api.get("Inicio/citasHoyCompletasApk");
    },

};