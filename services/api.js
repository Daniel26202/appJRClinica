// services/api.js

// URL base de tu backend PHP.
// TIP: Si pruebas en físico con tu teléfono, usa la IP local de tu laptop (ej: 192.168.1.X)
const BASE_URL = "http://192.168.90.234/Sistema-del--CEM--JEHOVA-RAFA/";

export const api = {
  // Petición GET genérica
  async get(endpoint) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok)
        throw new Error(`Error en el servidor: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`[API GET ERROR] en ${endpoint}:`, error);
      throw error;
    }
  },

  // Petición POST genérica
  async post(endpoint, data) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok)
        throw new Error(`Error en el servidor: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`[API POST ERROR] en ${endpoint}:`, error);
      throw error;
    }
  },
};
