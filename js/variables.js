import {generarId}  from "./funciones.js";

let editando = {
    value: false
}

// objeto de cita
const citaObjeto = {
    id: generarId(),
    mascota: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}

export {
    editando,
    citaObjeto
};