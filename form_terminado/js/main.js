
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

let list = document.querySelector("#lista");
let combo = document.querySelector("#select");
let p = document.querySelector("#parrafo_2");

// Escuchar el evento de carga de la pagina principal
document.addEventListener("DOMContentLoaded", inicio);
function inicio(){
    form.addEventListener("submit", cargar_form);
    combo.addEventListener("change", mostrarDatos);
}

// FUNCIONES asociadas a los eventos
function cargar_form(e){
    e.preventDefault();
    
    // trim(): elimina espacios al principio y fin
    let name = nombre.value.trim(); 
    let mail = email.value.trim();

    // VALIDACIONES simples
    if(name.length < 1 || mail.length < 1){
        mensaje("TODOS LOS CAMPOS SON OBLIGATORIOS", true);
        return
    }

    // Validar formato de email (https://emailregex.com)
    
    const exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(!exp.test(mail)){
        mensaje("EMAIL invalido", true);
        return;
    }
    

    let persona = new Persona(name, mail);
    personas.push(persona);

    mensaje("Persona agregada con éxito", false);

    //LIMPIAR LOS CAMPOS (2 formas diferentes)
    //document.querySelector("#nombre").value = "";
    //document.querySelector("#email").value = "";
    form.reset();

    //cargarLista();
    cargarSelect();
}

function cargarSelect(){
    combo.innerHTML = "";
    for(let persona of personas){
        combo.innerHTML += `
            <option value='${persona.email}'>${persona.nombre}</option>
        `;
    }
}

function mostrarDatos(){
    let mail = combo.value; 
    for(let pe of personas){
        if(mail == pe.email){
            console.log("OK")
            p.textContent = `${pe.nombre} - ${pe.email}`;
            return;
        }
    }
}

function cargarLista(){
    list.innerHTML = "";
    for(let persona of personas){
        list.innerHTML += `
            <li>${persona.nombre}</li>
        `;
    }
}

function mensaje(msg, err){
    let errores = document.querySelector(".error");

    if(!errores){
        let parrafo = document.createElement("p");
        parrafo.textContent = msg;

        if(err){
            parrafo.classList.add("alert", "alert-danger", "text-center", "error");
        }else{
            parrafo.classList.add("alert", "alert-success", "text-center", "error");
        }
        form.appendChild(parrafo);
        setTimeout(()=>{
            parrafo.remove();
        }, 3000)    
    }
}



