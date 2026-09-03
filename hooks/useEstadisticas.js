import { useState, useEffect, useCallback } from "react";
import { estadisticasService } from "../services/estadisticasService";

export function useEstadisticas() {
    const [especialidades, setEspecialidades] = useState([]);
    const [totalEspecialidades, setTotalEspecialidades] = useState(0);
    const [cargandoEspecialidades, setCargandoEspecialidades] = useState(false);
    const [errorEspecialidades, setErrorEspecialidades] = useState(null);

    const [sintomas, setSintomas] = useState([]);
    const [totalSintomas, setTotalSintomas] = useState(0);
    const [cargandoSintomas, setCargandoSintomas] = useState(false);
    const [errorSintomas, setErrorSintomas] = useState(null);

    const cargarEspecialidades = useCallback(async (fechaInicio = null, fechaFinal = null) => {
        setCargandoEspecialidades(true);
        setErrorEspecialidades(null);
        try {
            const datos = await estadisticasService.obtenerEspecialidades(fechaInicio, fechaFinal);
            setEspecialidades(datos.especialidades ?? []);
            setTotalEspecialidades(datos.totalEspecialidades?.total_servicios_por_cita ?? 0);
        } catch (err) {
            setErrorEspecialidades(err.message || "No se pudieron cargar las especialidades.");
        } finally {
            setCargandoEspecialidades(false);
        }
    }, []);

    const cargarSintomas = useCallback(async (fechaInicio = null, fechaFinal = null) => {
        setCargandoSintomas(true);
        setErrorSintomas(null);
        try {
            const datos = await estadisticasService.obtenerSintomas(fechaInicio, fechaFinal);
            setSintomas(datos.sintomas ?? []);
            setTotalSintomas(datos.totalSintomas?.total ?? 0);
        } catch (err) {
            setErrorSintomas(err.message || "No se pudieron cargar los síntomas.");
        } finally {
            setCargandoSintomas(false);
        }
    }, []);

    useEffect(() => {
        cargarEspecialidades();
        cargarSintomas();
    }, [cargarEspecialidades, cargarSintomas]);

    return {
        especialidades,
        totalEspecialidades,
        cargandoEspecialidades,
        errorEspecialidades,
        cargarEspecialidades,
        sintomas,
        totalSintomas,
        cargandoSintomas,
        errorSintomas,
        cargarSintomas,
    };
}
