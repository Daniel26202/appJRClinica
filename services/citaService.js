// services/citasService.js
import { api } from "./api";

export const citasService = {
  obtenerTodas: async () => {
    // este endpoint , preparado para JWT
    return await api.get("Citas/retornarTodasLasCitas");
  },
  
  // Registrar una nueva cita mandando los datos por POST
  agendar: async (datosCita) => {
    return await api.post("Citas/guardarCita", datosCita);
  },
};
