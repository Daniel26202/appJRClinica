import { useState, useEffect, useRef, useCallback } from "react";
import { recuperarService } from "../services/recuperarService";

const REGEX_PASSWORD = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,12}$/;
const DURACION_CODIGO_SEG = 5 * 60;

export function useRecuperarPassword(navigation) {
    const [paso, setPaso] = useState("datos");
    const [cargando, setCargando] = useState(false);

    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [codigo, setCodigo] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [passwordConf, setPasswordConf] = useState("");

    const [resetToken, setResetToken] = useState(null);
    const [verifiedToken, setVerifiedToken] = useState(null);

    const [segundosRestantes, setSegundosRestantes] = useState(DURACION_CODIGO_SEG);
    const intervalRef = useRef(null);

    const iniciarContador = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setSegundosRestantes(DURACION_CODIGO_SEG);
        intervalRef.current = setInterval(() => {
            setSegundosRestantes((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, []);

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const formatearTiempo = (segundos) => {
        const min = Math.floor(segundos / 60);
        const seg = segundos % 60;
        return `${min}:${String(seg).padStart(2, "0")}`;
    };

    const solicitarCodigo = async () => {
        if (usuario.trim() === "" || correo.trim() === "") {
            return { ok: false, error: "Ingresa tu usuario y correo." };
        }
        setCargando(true);
        try {
            const res = await recuperarService.solicitarCodigo(usuario, correo);
            setResetToken(res.resetToken);
            setCodigo("");
            iniciarContador();
            setPaso("codigo");
            return { ok: true };
        } catch (err) {
            return { ok: false, error: err.message || "Usuario o correo incorrectos." };
        } finally {
            setCargando(false);
        }
    };

    const reenviarCodigo = async () => {
        setCargando(true);
        try {
            const res = await recuperarService.solicitarCodigo(usuario, correo);
            setResetToken(res.resetToken);
            setCodigo("");
            iniciarContador();
            return { ok: true };
        } catch (err) {
            return { ok: false, error: err.message || "No se pudo reenviar el código." };
        } finally {
            setCargando(false);
        }
    };

    const verificarCodigo = async () => {
        if (codigo.trim() === "") {
            return { ok: false, error: "Ingresa el código recibido." };
        }
        if (segundosRestantes === 0) {
            return { ok: false, error: "Solicita un nuevo código." };
        }
        setCargando(true);
        try {
            const res = await recuperarService.verificarCodigo(codigo, resetToken);
            setVerifiedToken(res.verifiedToken);
            if (intervalRef.current) clearInterval(intervalRef.current);
            setPaso("password");
            return { ok: true };
        } catch (err) {
            return { ok: false, error: err.message || "Código incorrecto o expirado." };
        } finally {
            setCargando(false);
        }
    };

    const cambiarPassword = async () => {
        if (!REGEX_PASSWORD.test(passwordNew)) {
            return {
                ok: false,
                error: "Debe tener entre 8 y 12 caracteres, incluir una mayúscula, un número y un carácter especial.",
            };
        }
        if (passwordNew !== passwordConf) {
            return { ok: false, error: "Las contraseñas no coinciden." };
        }
        setCargando(true);
        try {
            await recuperarService.cambiarPassword(verifiedToken, passwordNew);
            navigation.navigate("Login");
            return { ok: true };
        } catch (err) {
            return { ok: false, error: err.message || "No se pudo actualizar la contraseña." };
        } finally {
            setCargando(false);
        }
    };

    return {
        paso,
        cargando,
        usuario,
        setUsuario,
        correo,
        setCorreo,
        codigo,
        setCodigo,
        passwordNew,
        setPasswordNew,
        passwordConf,
        setPasswordConf,
        segundosRestantes,
        formatearTiempo,
        solicitarCodigo,
        reenviarCodigo,
        verificarCodigo,
        cambiarPassword,
    };
}
