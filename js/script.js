//Direccion del EndPoint generado en Retool
const API_URL = "https://retoolapi.dev/bCZ50M/integrantes"

//Funcion que llama a la API y realiza una solicitud GET. Obtiene u  Json
async function ObtenerRegistros() {
    //Hacemos GET al servidor y obtenemos su respuesta(response)
    const respuesta = await fetch(API_URL)

    //Obtenemos la respuesta
    const data = await respuesta.json();//Esto ya es un JSON 

    //Llamamos a MostrarRegistros y le enviamos el JSON
    MostrarRegistros(data);
    
}
//Funcion para generar las filas de la tabla
//datos representa al JSON
function MostrarRegistros(datos){
    //Se llama al elemento tbody dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody")

    //Para inyectar codigo HTML usamos innerHTML
    tabla.innerHTML = "",//Vaciamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
        <tr>
            <td>${persona.id}</td>
            <td>${persona.nombre}</td>
            <td>${persona.apellido}</td>
            <td>${persona.correo}</td>
            <td>
                <button>Editar</button>
                <button>Eliminar</button>
            </td>
        </tr>
        `
    }); 

}

ObtenerRegistros();

//Proceso para agregar resgitros
const modal = document.getElementById("mdAgregar"); //Cuadro de dialogo
const btnAgregar = document.getElementById("btnAgregar"); //Boton para abrir
const btnCerrar = document.getElementById("btnCerrarModal"); //Boton cerrar

btnAgregar.addEventListener("click", ()=>{
    modal.showModal();//Abre el modal cuando a btnAgregar se le hace clic
});

btnCerrar.addEventListener("click", ()=>{
    modal.close();
});

//Agregar un nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e=> {
    e.preventDefault();//Evita que los datos se envien por defecto
    //Capturar los valores del form
    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtEmail").value.trim();

    //Validacion basica 
    if (!nombre || !apellido || !correo){
        alert("Complete todos los campos")
        return; //Evita que el codigo se siga ejecutando
    }

    //Llamar a la API para enviat los datos
    const respuesta = await fetch(API_URL, {
        method : "POST" , 
        headers : {'Content-Type' : 'application/json'}, //EL tipo de contenido : JSON
        body : JSON.stringify({nombre,apellido,correo}) //Quiere decir que un JSON va a ser convertido a una Strinf
    });

    if(respuesta.ok){
        //Mensaje de confirmacion
        alert("El registro fue agregado correctamente")
        //Limpiar el formulario
        document.getElementById("frmAgregar").reset();
        //Cerrar el modal 
        modal.close();

        //Recargar la tabla
        ObtenerRegistros();
    }
    else{
        alert("Hubo un error a la hora de guardar el registro")
    }
});

