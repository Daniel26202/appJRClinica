// services/api.js
import * as SecureStore from "expo-secure-store";
import { descifrarRespuesta, cifrarPeticion } from "./cifrado"; // ajusta el nombre si tu archivo se llama distinto
// URL base de tu backend PHP.
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// Función privada que obtiene el token guardado
async function getAuthHeaders() {
    const token = await SecureStore.getItemAsync("token_jwt_cem");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
    // GET genérica
    async get(endpoint) {
        try {
            const authHeaders = await getAuthHeaders();
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                headers: { ...authHeaders },
            });

            const cargaCifrada = await response.json();
            const json = await descifrarRespuesta(cargaCifrada);
            
            if (!response.ok || json.ok === false) {
                throw new Error(json.error || `Error del servidor: ${response.status}`);
            }
            return json;
        } catch (error) {
            console.error(`[API GET ERROR] ${endpoint}:`, error);
            throw error;
        }
    },

    // POST genérica

    async post(endpoint, data) {
        try {
            const authHeaders = await getAuthHeaders();
            const dataCifrada = await cifrarPeticion(data);
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeaders,
                },
                body: JSON.stringify(dataCifrada),
            });
            const cargaCifrada = await response.json();
            // console.log("RESPUESTA CRUDA DEL BACKEND:", JSON.stringify(cargaCifrada));

            const json = await descifrarRespuesta(cargaCifrada);
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
