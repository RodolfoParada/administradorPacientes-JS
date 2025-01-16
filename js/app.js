
import {pacienteInput, propietarioInput, emailInput,fechaInput, sintomasInput, 
       formulario} from './selectores.js'
import { datosCitas, submitCita } from './funciones.js'

// Eventos
pacienteInput.addEventListener('change', datosCitas);
propietarioInput.addEventListener('change', datosCitas);
emailInput.addEventListener('change', datosCitas);
fechaInput.addEventListener('change', datosCitas);
sintomasInput.addEventListener('change', datosCitas);
formulario.addEventListener('submit', submitCita);



