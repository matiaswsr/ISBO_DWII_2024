
const URL = "http://151.106.108.193:3000";

let formulario = document.querySelector("#formulario");

let nombre = document.querySelector("#nombre");
let cedula = document.querySelector("#cedula");
let fecha = document.querySelector("#fecha");
let email = document.querySelector("#email");
let pais = document.querySelector("#pais");

document.addEventListener("DOMContentLoaded", inicio);
function inicio(){
    formulario.addEventListener("submit", validarForm);
}

function validarForm(e){
    e.preventDefault();

    let un_nombre = nombre.value.trim();
    let una_ci = cedula.value.trim();
    let una_fecha = fecha.value;
    let un_email = email.value.trim();
    let un_pais = pais.value.trim();

    // Validar los campos
    if(un_nombre.length < 3 || una_ci.length < 6 || una_fecha.length < 6 || un_email.length < 6 || un_pais.length < 2){
        mensaje("TODOS LOS CAMPOS SON OBLIGATORIOS", true);
        return;
    }

    // Formateo la fecha para evitar errores
    const [year, month, day] = una_fecha.split("-");
    let fecha_formateada = `${day}/${month}/${year}`;

    // Crear objeto Persona
    let obj = {
        "nombre_completo": un_nombre,
        "fecha_de_nacimiento": fecha_formateada,
        "email": un_email,
        "pais": un_pais,
        "cedula": una_ci
    }

    consultarAPI(obj);
    formulario.reset();
}

async function consultarAPI(obj){
    try{
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        };

        const respuesta = await fetch(`${URL}/registrar_persona`, options);
        const data = await respuesta.json();

        if(data.status_code != 201){
            mensaje("ERROR EN PROCESAR EL REGISTRO", true);
        }
        mensaje("PERSONA REGISTRADA", false);
    }catch(error){
        mensaje(error, true);
    }
}

function mensaje(msg, hay_error){
    let error = document.querySelector(".error");

    if(!error){
        let p = document.createElement("p");
        p.textContent = msg;

        if(hay_error){
            p.classList.add("alert", "alert-danger", "text-center", "fw-bold", "mt-3", "error");
        }else{
            p.classList.add("alert", "alert-success", "text-center", "fw-bold", "mt-3", "error");
        }

        formulario.appendChild(p);
        setTimeout(() => {
            p.remove();
        }, 3000);
    }
}