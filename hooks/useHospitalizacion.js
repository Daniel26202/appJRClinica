import { useState, useEffect, useRef, useCallback } from "react";
import { AppState } from "react-native";
import { hospitalizacionService } from "../services/hospitalizacionService";

const INTERVALO_REFRESH_MS = 15000; // 15 segundos

function mapearSeveridad(severidad) {
    switch (severidad) {
        case "GRAVE":
            return "crítico";
        case "MODERADA":
            return "mejorando";
        case "LEVE":
            return "estable";
        default:
            return "estable";
    }
}

export function useHospitalizacion() {
    const [pacientes, setPacientes] = useState([]);
    const [stats, setStats] = useState({
        total_camas: 2,
        ocupadas: 0,
        disponibles: 2,
        ingresos_hoy: 0,
        altas_hoy: 0,
    });
    const [cargando, setCargando] = useState(false);
    const [refrescando, setRefrescando] = useState(false);
    const [error, setError] = useState(null);

    const yaCargoUnaVez = useRef(false);
    const intervalRef = useRef(null);

    const cargar = useCallback(async ({ silencioso = false } = {}) => {
        if (!silencioso) {
            setCargando(true);
        }
        setError(null);
        try {
            const { pacientes: datos, stats: s } = await hospitalizacionService.obtenerResumen();

            const mapeados = datos.map((h) => ({
                id: h.id_hospitalizacion,
                paciente: `${h.nombre_p} ${h.apellido_p}`,
                cedula: h.cedula,
                edad: h.edad,
                ingreso: h.fecha_hora_inicio,
                diagnostico: h.diagnostico ?? "Sin diagnóstico",
                historial: h.historiaclinica ?? "Sin historial",
                doctor: `${h.nombre_d} ${h.apellido_d}`,
                status: mapearSeveridad(h.severidad),
            }));

            setPacientes(mapeados);
            setStats(s);
            yaCargoUnaVez.current = true;
        } catch (err) {
            if (!yaCargoUnaVez.current) {
                setError("No se pudieron cargar las hospitalizaciones. Verifica tu conexión.");
            } else {
                console.warn("[useHospitalizacion] Falló un refresh en segundo plano:", err.message);
            }
        } finally {
            setCargando(false);
        }
    }, []);

    const onPullToRefresh = useCallback(async () => {
        setRefrescando(true);
        await cargar({ silencioso: true });
        setRefrescando(false);
    }, [cargar]);

    useEffect(() => {
        cargar();

        const iniciarPolling = () => {
            if (intervalRef.current) return;
            intervalRef.current = setInterval(() => {
                cargar({ silencioso: true });
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
                cargar({ silencioso: true });
                iniciarPolling();
            } else {
                detenerPolling();
            }
        });

        return () => {
            detenerPolling();
            subscription.remove();
        };
    }, [cargar]);

    return {
        pacientes,
        stats,
        cargando,
        refrescando,
        error,
        recargar: () => cargar({ silencioso: true }),
        onPullToRefresh,
    };
}