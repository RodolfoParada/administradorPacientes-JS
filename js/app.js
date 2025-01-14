// Selectores
const pacienteInput = document.querySelector('#mascota'); 
const propietarioInput = document.querySelector('#propietario'); 
const emailInput = document.querySelector('#email'); 
const fechaInput = document.querySelector('#fecha'); 
const sintomasInput = document.querySelector('#sintomas'); 

const formulario = document.querySelector('#formulario-cita')
const formularioInput = document.querySelector('#formulario-cita button[type="submit"]')
const contenedorCitas = document.querySelector('#citas')

// Eventos
pacienteInput.addEventListener('change', datosCitas)
propietarioInput.addEventListener('change', datosCitas)
emailInput.addEventListener('change', datosCitas)
fechaInput.addEventListener('change', datosCitas)
sintomasInput.addEventListener('change', datosCitas)

formulario.addEventListener('submit', submitCita)

let editando = false;

// objeto de cita
const citaObjeto = {
    id: generarId(),
    mascota: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}


console.log(citaObjeto);


class Notificacion {
    constructor({texto, tipo}){
        this.texto = texto; 
        this.tipo = tipo; 

        this.mostrar()
    }
    mostrar(){
        //crear notificación
        const alerta = document.createElement('div'); 
        alerta.classList.add( 'text-center', 'w-100', 'p-3', 'my-3', 'alert', 'fw-bold', 'text-uppercase', 'fs-6'
        );

        // Eliminar alertas duplicadas.
        const alertaPrevia = document.querySelector('.alert')
        alertaPrevia?.remove(); 
        // if(alertaPrevia){
        //     alertaPrevia.remove()
        // }

       // Si es de tipo error, agrega una clase
       this.tipo === 'error' ? alerta.classList.add('alert-danger') : alerta.classList.add('alert-success')
       
       // Mensaje de error
       alerta.textContent = this.texto
    
       //Insertar en el dom
       formulario.parentElement.insertBefore(alerta, formulario)

        // Quitar después de 5 segundos
        setTimeout(() => {
            alerta.remove();
        }, 3000);

    }
}



class AdminCitas{
    constructor(){
        this.citas = []
}
agregar(cita){
    this.citas = [...this.citas, cita]
    this.mostrar()
    
}
 editar(citaActualizada){
    this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita)
    this.mostrar()
 }
 eliminar(id){
    console.log(id)
    this.citas = this.citas.filter(cita => cita.id !== id)
    this.mostrar()
 }
mostrar(cita){
    //Limpiar el HTML
    while(contenedorCitas.firstChild){
        contenedorCitas.removeChild(contenedorCitas.firstChild)
    }

    // Si hay citas
    if(this.citas.length === 0){
      contenedorCitas.innerHTML  = `<p class="display-4 mt-5 mb-5 text-center">No Hay Pacientes</p> `
      return;
    }

    //Generando las citas 
    this.citas.forEach(cita => {
        const divCita = document.createElement('div')
        divCita.classList.add('mx-auto', 'my-4', 'bg-white', 'shadow', 'p-4', 'rounded-3');

        const mascota =  document.createElement('p')
        mascota.classList.add('fw-normal', 'mb-3', 'text-secondary', 'text-lowercase');
        mascota.innerHTML = `<span class="fw-bold text-uppercase">Mascota: </span> ${cita.mascota}`

        const propietario = document.createElement('p');
        propietario.classList.add('fw-normal', 'mb-3', 'text-secondary', 'text-lowercase')
        propietario.innerHTML = `<span class="fw-bold text-uppercase">Propietario: </span> ${cita.propietario}`;

        const email = document.createElement('p');
        email.classList.add('fw-normal', 'mb-3', 'text-secondary', 'text-lowercase')
        email.innerHTML = `<span class="fw-bold text-uppercase">E-mail: </span> ${cita.email}`;

        const fecha = document.createElement('p');
        fecha.classList.add('fw-normal', 'mb-3', 'text-secondary', 'text-lowercase')
        fecha.innerHTML = `<span class="fw-bold text-uppercase">Fecha: </span> ${cita.fecha}`;

        const sintomas = document.createElement('p');
        sintomas.classList.add('fw-normal', 'mb-3', 'text-secondary', 'text-lowercase')
        sintomas.innerHTML = `<span class="fw-bold text-uppercase">Síntomas: </span> ${cita.sintomas}`;

        const btnEditar = document.createElement('button');
        btnEditar.classList.add('btn', 'btn-indigo', 'btn-lg', 'd-flex', 'align-items-center', 'gap-2', 'btn-primary','btn-editar');
        btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
        const clone = structuredClone(cita)
        btnEditar.onclick = () => cargarEdicion(clone)

        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn', 'btn-danger', 'btn-lg', 'd-flex', 'align-items-center', 'gap-2', 'mt-3');
        btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        btnEliminar.onclick = () => this.eliminar(cita.id)

        
        const contenedorBotones = document.createElement('div');
        contenedorBotones.classList.add('flex', 'justify-between', 'mt-10')

        contenedorBotones.appendChild(btnEditar);
        contenedorBotones.appendChild(btnEliminar)
        
        //Inyectar al HTML
        divCita.appendChild(mascota)
        divCita.appendChild(propietario);
        divCita.appendChild(email);
        divCita.appendChild(fecha);
        divCita.appendChild(sintomas); 
        divCita.appendChild(contenedorBotones)

        contenedorCitas.appendChild(divCita)


    })

}
}




function datosCitas(e){
    citaObjeto[e.target.name] = e.target.value;
    
}

const citas = new AdminCitas()

function submitCita(e){
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

if(editando){
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
 editando = false;


function reiniciarObjetoCita(){
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


}

function generarId(){
    return Math.random().toString(36).substring(2) + Date.now()
}

function cargarEdicion(cita){
    Object.assign(citaObjeto, cita)

    pacienteInput.value = cita.mascota;
    propietarioInput.value = cita.propietario;
    emailInput.value = cita.propietario;
    fechaInput.value = cita.fecha;
    sintomasInput.value = cita.sintomas;

    editando = true;

    formularioInput.value = 'Guardar Cambios'
}