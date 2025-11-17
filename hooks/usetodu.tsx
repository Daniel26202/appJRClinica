// hooks/usetodu.js
import { useState } from "react";

export function UseTodu() {
    // Estado principal: arreglo de objetos con id, nombre y apellido
    const [mostrar, setMostrar] = useState([{ id: 1, nombre: "nombre", apellido: "Perez" }]);

    // CREATE: Agrega un nuevo objeto al array
    function agregar({ nombre, apellido }) {
        const nuevo = {
            id: Date.now(),
            nombre,
            apellido,
        };
        setMostrar([...mostrar, nuevo]);
    }
    function valorAgregar({ valorNombre, valorApellido, setNombre, setApellido }) {
        if (valorNombre.trim() && valorApellido.trim()) {
            agregar({ nombre: valorNombre, apellido: valorApellido });
            // Limpia los campos tras agregar
            setNombre("");
            setApellido("");
        }
    }

    // UPDATE: Reemplaza nombre y apellido en el item cuyo id coincide
    function actualizar(id, { nombre, apellido }) {
        setMostrar(mostrar.map((item) => (item.id === id ? { ...item, nombre, apellido } : item)));
    }

    // DELETE: Filtra el arreglo excluyendo el item con el id dado
    function eliminar(id) {
        setMostrar(mostrar.filter((item) => item.id !== id));
    }

    // Exponemos el array y las funciones CRUD
    return { mostrar, agregar, valorAgregar, actualizar, eliminar };
}
