// hooks/useCitas.js
import { useState, useEffect } from "react";
import { citasService } from "../services/citaService"; // Conectamos con el servicio

export function useCitas() {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener las citas
  const cargarCitas = async () => {
    setCargando(true);
    setError(null);
    try {
      const datos = await citasService.obtenerTodas();
      setCitas(datos);
    } catch (err) {
      setError("No se pudieron cargar las citas.");
    } finally {
      setCargando(false);
    }
  };

  // // Función para guardar una cita y refrescar la lista en pantalla
  // const guardarCita = async (nuevaCita) => {
  //   try {
  //     const resultado = await citasService.agendar(nuevaCita);
  //     // Si tu backend PHP responde con un success: true, recargamos la lista
  //     if (resultado.success) {
  //       await cargarCitas();
  //     }
  //     return resultado;
  //   } catch (err) {
  //     setError("Error al guardar la cita.");
  //   }
  // };

  // Esto hace que las citas se carguen solas apenas entres a la vista
  useEffect(() => {
    cargarCitas();
  }, []);

  // Devolvemos todo masticadito para la interfaz de usuario
  return {
    citas,
    cargando,
    error,
    recargar: cargarCitas,
    // guardarCita,
  };
}
