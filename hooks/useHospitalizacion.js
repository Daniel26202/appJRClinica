import { useState, useEffect } from "react";
import { hospitalizacionService } from "../services/hospitalizacionService";

function mapearSeveridad(severidad) {
    switch (severidad) {
        case "GRAVE":    return "crítico";
        case "MODERADA": return "mejorando";
        case "LEVE":     return "estable";
        default:         return "estable";
    }
}

export function useHospitalizacion() {
    const [pacientes, setPacientes]   = useState([]);
    const [stats, setStats]           = useState({
        total_camas: 2, ocupadas: 0, disponibles: 2,
        ingresos_hoy: 0, altas_hoy: 0,
    });
    const [cargando, setCargando]     = useState(false);
    const [error, setError]           = useState(null);

    const cargar = async () => {
        setCargando(true);
        setError(null);
        try {
            const { pacientes: datos, stats: s } =
                await hospitalizacionService.obtenerResumen();

            const mapeados = datos.map((h) => ({
                id:          h.id_hospitalizacion,
                paciente:    `${h.nombre_p} ${h.apellido_p}`,
                cedula:      h.cedula,
                edad:        h.edad,
                ingreso:     h.fecha_hora_inicio,
                diagnostico: h.diagnostico    ?? "Sin diagnóstico",
                historial:   h.historiaclinica ?? "Sin historial",
                doctor:      `${h.nombre_d} ${h.apellido_d}`,
                status:      mapearSeveridad(h.severidad),
            }));

            setPacientes(mapeados);
            setStats(s);
        } catch (err) {
            setError("No se pudieron cargar las hospitalizaciones. " + err);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => { cargar(); }, []);

    return { pacientes, stats, cargando, error, recargar: cargar };
}