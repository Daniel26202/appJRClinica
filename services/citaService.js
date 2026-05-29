// services/citasService.js
import { api } from "./api";

export const citasService = {
  obtenerTodas: async () => {
    // ✅ Este endpoint sí está preparado para JWT
    return await api.get("Citas/retornarTodasLasCitas");
  },
  
  // Registrar una nueva cita mandando los datos por POST
  agendar: async (datosCita) => {
    return await api.post("Citas/guardarCita", datosCita);
  },
};
