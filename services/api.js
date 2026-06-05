// services/api.js
import * as SecureStore from "expo-secure-store";
// URL base de tu backend PHP.
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// Función privada que obtiene el token guardado
async function getAuthHeaders() {
    const token = await SecureStore.getItemAsync("token_jwt_cem");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
    // Petición GET genérica
    async get(endpoint) {
        try {
            const authHeaders = await getAuthHeaders();
            // console.log("Cabeceras enviadas al backend:", authHeaders);
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                headers: { ...authHeaders },
            });

            if (!response.ok) throw new Error(`Error del servidor: ${response.status}`);

            const textResponse = await response.text();

            try {
                return JSON.parse(textResponse);
            } catch (jsonError) {
                // console.log("------- ¡ERROR DE PHP DETECTADO! -------");
                // console.log(textResponse);
                // console.log("----------------------------------------");
                throw new Error("El servidor no devolvió un JSON válido.");
            }
        } catch (error) {
            console.error(`[API GET ERROR] ${endpoint}:`, error);
            throw error;
        }
    },
    
    // Petición POST genérica

    async post(endpoint, data) {
        try {
            const authHeaders = await getAuthHeaders();
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeaders,
                },
                body: JSON.stringify(data),
            });

            const json = await response.json();
            if (!response.ok || json.ok === false) {
                throw new Error(json.error || `Error del servidor: ${response.status}`);
            }
            return json;
        } catch (error) {
            console.error(`[API POST ERROR] ${endpoint}:`, error);
            throw error;
        }
    },
};
