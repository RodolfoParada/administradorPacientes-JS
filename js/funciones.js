import {citaObjeto, editando} from './variables.js'
import Notificacion from './clases/Notificaciones.js';
import { AdminCitas } from './clases/AdminCitas.js';
import { formulario, formularioInput, pacienteInput, propietarioInput, 
      emailInput, fechaInput, sintomasInput } from './selectores.js';

const citas = new AdminCitas()

export function datosCitas(e){
    citaObjeto[e.target.name] = e.target.value;
    
}

export function submitCita(e){
    e.preventDefault();
  
    
  //   const {mascota, propietario, email, fecha, sintomas} = citaObjeto;
  //   if(mascota.trim() === '' || propietario.trim() === ''
  //     || email.trim() === '' || fecha.trim() === ''
  //     || sintomas.trim() === ''){
  //     console.log('Todols los campos son obligatorios');
  //     return;
  //   }
  
  if(Object.values(citaObjeto).some(valor => valor.trim() === '')){
    const notification = new Notificacion({
      texto: 'Todos los campos son obligatorios',
      tipo: 'error'
    })
      return; 
  }
  
  if(editando.value){
     citas.editar({...citaObjeto});
     new Notificacion({
      texto: 'Guardado Correctamente',
      tipo: 'exito'
  })
  }else{
      citas.agregar({...citaObjeto});
      new Notificacion({
          texto: 'Paciente Registrado',
          tipo: 'exito'
      })
      
  }
  formulario.reset();
  reiniciarObjetoCita();
  formularioInput.value = 'Registrar Mascota'; 
   editando.value = false;
  
  }

  export function reiniciarObjetoCita(){
    //Reiniciar el objeto
    // objeto de cita
    citaObjeto.id = generarId(),
    citaObjeto.mascota = '';
    citaObjeto.propietario = '';
    citaObjeto.email = '';
    citaObjeto.fecha = '';
    citaObjeto.sintomas = '';

    //otra forma de hacer lo mismo
    // Object.assign(citaObjeto,{
    //     id: generarId(),
    //     mascota: '',
    //     propietario: '',
    //     email: '',
    //     fecha: '',
    //     sintomas: ''
    // })
  
}
  
export function generarId(){
      return Math.random().toString(36).substring(2) + Date.now()
  }
  
export function cargarEdicion(cita){
      Object.assign(citaObjeto, cita)
  
      pacienteInput.value = cita.mascota;
      propietarioInput.value = cita.propietario;
      emailInput.value = cita.propietario;
      fechaInput.value = cita.fecha;
      sintomasInput.value = cita.sintomas;
  
      editando.value = true;
  
      formularioInput.value = 'Guardar Cambios'
  }