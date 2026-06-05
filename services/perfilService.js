import { api } from "./api";

export const perfilService = {
    obtener: async () => {
        return await api.get("Perfil/perfilApk");
    },
};