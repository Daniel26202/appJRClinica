import { useState, useEffect } from "react";
import { citaService } from "../services/citaService";

export function useCitas() {
    const [citas, setCitas] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const cargarCitas = async () => {
        setCargando(true);
        setError(null);
        try {
            const datos = await citaService.obtenerHoy();
            // Mapeamos los campos de la BD a los que usa CitaCard
            const citasMapeadas = datos.map((c) => ({
                id_cita:   c.id_cita,
                paciente:  `${c.nombre_p} ${c.apellido_p}`,
                cedula:    c.cedula,
                telefono:  c.telefono_p,
                hora:      c.hora,
                estado:    c.estado,
                doctor:    `${c.nombre_d} ${c.apellido_d}`,
                especialidad: c.especialidad,
                categoria: c.categoria,
            }));
            setCitas(citasMapeadas);
        } catch (err) {
            setError("No se pudieron cargar las citas."+ err);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarCitas();
    }, []);

    return { citas, cargando, error, recargar: cargarCitas };
}