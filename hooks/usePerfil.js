import { useState, useEffect } from "react";
import { perfilService } from "../services/perfilService";

export function usePerfil() {
    const [perfil, setPerfil]   = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError]     = useState(null);

    const cargar = async () => {
        setCargando(true);
        setError(null);
        try {
            const res = await perfilService.obtener();
            if (res.ok) {
                setPerfil(res.data);
            } else {
                throw new Error(res.error);
            }
        } catch (err) {
            setError("No se pudo cargar el perfil. " + err);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => { cargar(); }, []);

    return { perfil, cargando, error, recargar: cargar };
}