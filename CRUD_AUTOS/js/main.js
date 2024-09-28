let idAuto = 101;
class Auto{
    constructor(marca, modelo, anio, precio){
        this.id = idAuto;
        idAuto++;
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.precio = precio;
    }
}

let a1 = new Auto("Audi", "A3", 2020, 50000);
let a2 = new Auto("Audi", "A6", 2022, 75000);
let a3 = new Auto("Suzuki", "Swift", 2023, 24000);
let a4 = new Auto("Chevrolet", "Captiva 2", 2023, 41000);

let autos = [];
autos.push(a1);
autos.push(a2);
autos.push(a3);
autos.push(a4);

/**************************************************************************** */

let tabla = document.querySelector("#tabla");
let form = document.querySelector("#formulario");
let formActualizar = document.querySelector("#formActualizar");

document.addEventListener("DOMContentLoaded", inicio);

function inicio(){
    console.log("Iniciando app...");

    //Eventos
    tabla.addEventListener("click", edicion);
    form.addEventListener("submit", agregar);
    formActualizar.addEventListener("submit", actualizar);

    //Completar la tabla
    listar();
}

/***************   FUNCIONES   *********************************************** */

function edicion(e){
    if(e.target.classList.contains("editar")){
        editar(e.target.getAttribute("data-id"));
    }else if(e.target.classList.contains("eliminar")){
        eliminar(e.target.getAttribute("data-id"));
    }    
}

function editar(id){
    const data = autos.filter(auto => auto.id == id)[0];
    //Completo el formulario, mostrando los campos
    for(let clave in data){
        if(data.hasOwnProperty(clave)){
            formActualizar.elements[clave].value = data[clave];
        }
    }
    $("#myModal").modal("show");
}

function actualizar(e){
    e.preventDefault();
    //Datos del formulario
    const data = Object.fromEntries(
        new FormData(e.target)
    );

    if(data.marca.length < 1 || data.modelo.length < 1 || data.anio.length < 1 || data.precio.length < 1){
        mensaje(true, "Todos los campos son obligatorios.", formActualizar);
        return;
    }
    const buscarID = parseInt(data.id);
    //Actualizar los campos
    for(let a of autos){
        if(a.id == buscarID){
            a.marca = data.marca;
            a.modelo = data.modelo;
            a.anio = data.anio;
            a.precio = data.precio;
        }
    }
    $("#myModal").modal("hide");
    mensaje(false, "Datos actualizados con éxito.", form);
    listar();
}

function eliminar(id){
    console.log("Eliminar ID: " + id);
    //Filtramos el array y nos quedamos únicamente con los resultados que sean distintos del ID recibido
    autos = autos.filter(auto => auto.id != id);
    listar();
}

function agregar(e){
    e.preventDefault();

    //Datos del formulario
    const data = Object.fromEntries(
        new FormData(e.target)
    );
    
    if(data.marca.length < 1 || data.modelo.length < 1 || data.anio.length < 1 || data.precio.length < 1){
        mensaje(true, "Todos los campos son obligatorios.", form);
        return;
    }

    autos.push(new Auto(data.marca, data.modelo, parseInt(data.anio), parseInt(data.precio)));
    mensaje(false, "Datos registrados con éxito.", form);
    listar();

    //Limpiar el formulario
    form.reset();
}

function listar(){
    tabla.innerHTML = "";
    for(let a of autos){
        tabla.innerHTML += `
        <tr>
            <td>${a.marca}</td>
            <td>${a.modelo}</td>
            <td>${a.anio}</td>
            <td>${a.precio}</td>
            <td>
                <button type="button" class="btn btn-success btn-sm editar" data-id="${a.id}">EDITAR</button>
                <button type="button" class="btn btn-danger btn-sm eliminar" data-id="${a.id}">ELIMINAR</button>
            </td>
        </tr>`;
    }
}

function mensaje(error, mensaje, ubicacion){
    let err = document.querySelector(".error");

    if(!err){
        let parrafo = document.createElement("P");
        parrafo.textContent = mensaje;
        if(error){
            parrafo.classList.add("alert", "alert-danger", "text-uppercase", "text-center", "mt-3", "mx-auto", "error");
        }else{
            parrafo.classList.add("alert", "alert-success", "text-uppercase", "text-center", "mt-3", "mx-auto", "error");
        }

        ubicacion.appendChild(parrafo);
        
        setTimeout(() => {
            parrafo.remove();
        }, 2400);
    }    
}