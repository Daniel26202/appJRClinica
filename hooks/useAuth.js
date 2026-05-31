// hooks/useAuth.js
import { useState } from "react";
import { Alert } from "react-native";
import { loginService } from "../services/loginService";

export const useAuth = (navigation) => {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const login = async (username, password) => {
        if (username.trim() === "" || password.trim() === "") {
            Alert.alert("Campos vacíos", "Por favor, ingresa tu usuario y contraseña.");
            return;
        }

        setCargando(true);
        setError(null);

        try {
            const data = await loginService.autenticar(username, password);
            navigation.navigate("Main");
        } catch (err) {
            const mensaje = err.message || "";
            setError(mensaje);

            // Distinguimos cada tipo de error que viene del PHP
            if (mensaje === "Bloqueado") {
                Alert.alert(
                    "🔒 Acceso bloqueado",
                    "Demasiados intentos fallidos. Tu acceso está restringido por 15 minutos.",
                    [{ text: "Entendido" }]
                );
            } else if (
                mensaje.includes("contraseña") ||
                mensaje.includes("incorrectas")
            ) {
                Alert.alert(
                    "❌ Credenciales incorrectas",
                    "El usuario o la contraseña son incorrectos. Verifica tus datos.",
                    [{ text: "Intentar de nuevo" }]
                );
            } else if (mensaje.includes("buits") || mensaje.includes("vacíos")) {
                Alert.alert(
                    "⚠️ Campos vacíos",
                    "Por favor completa todos los campos.",
                    [{ text: "OK" }]
                );
            } else {
                Alert.alert(
                    "Error de conexión",
                    "No se pudo conectar con el servidor. Verifica tu red.",
                    [{ text: "OK" }]
                );
            }
        } finally {
            setCargando(false);
        }
    };

    return { login, cargando, error };
};