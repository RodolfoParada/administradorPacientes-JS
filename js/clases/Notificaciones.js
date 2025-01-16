import { formulario } from '../selectores.js';


export default class Notificacion {
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

// export default Notificacion