import { useState, useEffect, useRef, useCallback } from "react";
import { AppState } from "react-native";
import { citaService } from "../services/citaService";

// 15 seg
const INTERVALO_REFRESH_MS = 15000;

export function useCitas() {
    const [citas, setCitas] = useState([]);
    // loader de pantalla completa (solo 1ra carga)
    const [cargando, setCargando] = useState(false);
    // loader del pull-to-refresh
    const [refrescando, setRefrescando] = useState(false);
    const [error, setError] = useState(null);

    // Para saber si ya hubo una carga inicial exitosa y no repetir el loader grande
    const yaCargoUnaVez = useRef(false);
    const intervalRef = useRef(null);

    const mapearCitas = (datos) =>
        datos.map((c) => ({
            id_cita: c.id_cita,
            paciente: `${c.nombre_p} ${c.apellido_p}`,
            cedula: c.cedula,
            telefono: c.telefono_p,
            hora: c.hora,
            estado: c.estado,
            doctor: `${c.nombre_d} ${c.apellido_d}`,
            especialidad: c.especialidad,
            categoria: c.categoria,
        }));

    // silencioso = true -> no muestra loader de pantalla completa (se usa en el polling)
    const cargarCitas = useCallback(async ({ silencioso = false } = {}) => {
        if (!silencioso) {
            setCargando(true);
        }
        setError(null);
        try {
            const datos = await citaService.obtenerHoy();
            setCitas(mapearCitas(datos));
            yaCargoUnaVez.current = true;
        } catch (err) {
            // Solo mostramos el error a pantalla completa si fue la carga inicial.
            // Si es un refresh en segundo plano que falló, no tapamos los datos que ya tenía el usuario.
            if (!yaCargoUnaVez.current) {
                setError("No se pudieron cargar las citas. Verifica tu conexión.");
            } else {
                console.warn("[useCitas] Falló un refresh en segundo plano:", err.message);
            }
        } finally {
            setCargando(false);
        }
    }, []);

    // Lo que usa el pull-to-refresh (RefreshControl)
    const onPullToRefresh = useCallback(async () => {
        setRefrescando(true);
        await cargarCitas({ silencioso: true });
        setRefrescando(false);
    }, [cargarCitas]);

    // Maneja el ciclo de vida del polling: arranca, se detiene en background, se reanuda en foreground
    useEffect(() => {
        // carga inicial (con loader grande)
        cargarCitas();

        const iniciarPolling = () => {
            // ya está corriendo
            if (intervalRef.current) return;
            intervalRef.current = setInterval(() => {
                cargarCitas({ silencioso: true });
            }, INTERVALO_REFRESH_MS);
        };

        const detenerPolling = () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

        iniciarPolling();

        const subscription = AppState.addEventListener("change", (estado) => {
            if (estado === "active") {
                // refresca de inmediato al volver
                cargarCitas({ silencioso: true });
                iniciarPolling();
            } else {
                // pausa en background para no gastar batería/datos
                detenerPolling();
            }
        });

        return () => {
            detenerPolling();
            subscription.remove();
        };
    }, [cargarCitas]);

    return {
        citas,
        cargando,
        refrescando,
        error,
        recargar: () => cargarCitas({ silencioso: true }),
        onPullToRefresh,
    };
}
