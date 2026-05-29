
// services/api.js
import * as SecureStore from "expo-secure-store";
// URL base de tu backend PHP.
const BASE_URL = "http://192.168.110.100/Sistema-del--CEM--JEHOVA-RAFA/";

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
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                headers: { ...authHeaders },
            });
            if (!response.ok) throw new Error(`Error del servidor: ${response.status}`);
            return await response.json();
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
            if (!response.ok) throw new Error(`Error del servidor: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`[API POST ERROR] ${endpoint}:`, error);
            throw error;
        }
    },
};
