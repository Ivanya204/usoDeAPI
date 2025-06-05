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
