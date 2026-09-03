// services/loginService.js
import { api } from "./api";
import * as SecureStore from "expo-secure-store";

export const loginService = {
  /**Envía las credenciales al backend y guarda el JWT si es válido
   * @param {string} username
   * @param {string} password
   */
  async autenticar(username, password) {
    try {
      // Usamos el método POST de tu api.js apuntando al método de tu controlador
      const data = await api.post("IniciarSesion/iniciarSesionMovilApk", {
        username: username,
        password: password,
      });

      // Si el backend responde con ok: true y trae el token
      if (data && data.ok && data.token) {
        // Guardamos el token encriptado en el llavero del teléfono
        await SecureStore.setItemAsync("token_jwt_cem", data.token);
        return data; // Retornamos toda la data (usuario, rol, nombre, etc.)
      } else {
        // Lanzamos un error con el mensaje que venga de MariaDB/PHP
        throw new Error(data.error || "Credenciales inválidas");
      }
    } catch (error) {
      // Captura tanto errores de red de api.js como errores de credenciales
      throw error;
    }
  },

    // Elimina el token del dispositivo para cerrar la sesión
  async cerrarSesion() {
    await SecureStore.deleteItemAsync("token_jwt_cem");
  },
};
