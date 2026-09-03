import { api } from "./api";

export const recuperarService = {
    solicitarCodigo: async (usuario, correo) => {
        return await api.post("RecuperarContr/verificarUCApk", { usuario, correo });
    },
    verificarCodigo: async (codigo, resetToken) => {
        return await api.post("RecuperarContr/verificarCodigoApk", { codigo, resetToken });
    },
    cambiarPassword: async (verifiedToken, passwordNew) => {
        return await api.post("RecuperarContr/cambiarCApk", { verifiedToken, passwordNew });
    },
};
