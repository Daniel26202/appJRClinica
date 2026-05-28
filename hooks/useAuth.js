// hooks/useAuth.js
import { useState } from "react";
import { Alert } from "react-native";
import { loginService } from "../services/loginService";

export const useAuth = (navigation) => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    // Validación inicial
    if (username.trim() === "" || password.trim() === "") {
      Alert.alert(
        "Campos vacíos",
        "Por favor, ingresa tu usuario y contraseña.",
      );
      return;
    }

    setCargando(true);
    setError(null);

    try {
      const data = await loginService.autenticar(username, password);

      Alert.alert(
        "¡Éxito!",
        `Bienvenido al CEM: ${data.usuario.nombre} ${data.usuario.apellido}`,
      );

      // Redirigimos al flujo principal del sistema clínico
      navigation.navigate("Main");
    } catch (err) {
      // Capturamos el error personalizado del servicio
      setError(err.message);
      Alert.alert(
        "Fallo de autenticación",
        err.message || "No se pudo iniciar sesión.",
      );
    } finally {
      setCargando(false);
    }
  };

  return {
    login,
    cargando,
    error,
  };
};
