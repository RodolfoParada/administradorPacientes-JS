import { contenedorCitas } from "../selectores.js"
import { cargarEdicion } from "../funciones.js"


export class AdminCitas{
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
