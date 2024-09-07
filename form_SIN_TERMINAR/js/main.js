
class Persona{
    constructor(nombre, email){
        this.nombre = nombre;
        this.email = email;
    }
}
// Lista para guardar los objetos Persona
let personas = [];

// Variables asociadas a las etiquetas HTML
let nombre = document.querySelector("#nombre");
let email = document.querySelector("#email");
let form = document.querySelector("#formulario");

// Escuchar el evento de carga de la pagina principal
document.addEventListener("DOMContentLoaded", inicio);
function inicio(){
    form.addEventListener("submit", cargar_form);
}

// FUNCIONES asociadas a los eventos
function cargar_form(e){
    e.preventDefault();
    
    // trim(): elimina espacios al principio y fin
    let name = nombre.value.trim(); 
    let mail = email.value.trim();

    // VALIDACIONES simples
    if(name.length < 1 || mail.length < 1){
        console.log("TODOS LOS CAMPOS SON OBLIGATORIOS");
        return
    }

    // Validar formato de email

    let persona = new Persona(name, mail);
    personas.push(persona);

    console.log("Persona agregada con éxito");

    //LIMPIAR LOS CAMPOS (2 formas diferentes)
    //document.querySelector("#nombre").value = "";
    //document.querySelector("#email").value = "";
    form.reset();
}



