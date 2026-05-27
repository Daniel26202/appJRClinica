// services/citasService.js
import { api } from "./api"; // Importamos la configuración base

export const citasService = {
  // Obtener la lista de citas desde PHP
  obtenerTodas: async () => {
    return await api.get("/Citas/citasAjax");
  },

  // Registrar una nueva cita mandando los datos por POST
  agendar: async (datosCita) => {
    return await api.post("/crear_cita.php", datosCita);
  },
};
