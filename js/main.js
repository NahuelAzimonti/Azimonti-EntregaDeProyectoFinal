/*
Selecciono los elementos requeridos del html y los convierto en constantes 
*/
const email = document.querySelector("#emailRegis"),
    contrasena = document.querySelector("#contraseñaRegis"),
    nombre = document.querySelector("#nombreRegis"),
    guardar = document.querySelector("#guardarRegis");


/* 
Creo una variable y le indico dos acciones a tomar ante dos diferentes casos 
*/
let usu;

usu = JSON.parse(localStorage.getItem(`usu`)) || []

/* 
Creo una función constructora la cual proporcionara diferentes valores
*/
class Usua {
    constructor(usuario, email, password) {
        this.usuario = usuario;
        this.email = email;
        this.password = password;
    }
}
/* 
Creo una función para guardar la información 
*/
function guardarIaInformacionDelUsuario(usua) {
    return usu.push(usua)

}
/* 
Creo una función para guardar la información en el Storage
*/
function guardarEnElStorge(elemento) {
    return localStorage.setItem("usu", JSON.stringify(elemento))
}
/* 
Esta función me limpia los campos de mi formulario
*/
function limpiarLosCaposDelUsuario() {
    nombre.value = "";
    email.value = "";
    contrasena.value = "";
}
/* 
Llamo a la constante guardar y le indico que reacción va atener ante los sucesos anteriores
*/
guardar.addEventListener("click", (e) => {
    e.preventDefault();
    let newUser = new Usua(
        nombre.value,
        email.value,
        contrasena.value
    );
    guardarIaInformacionDelUsuario(newUser);
    limpiarLosCaposDelUsuario();
    guardarEnElStorge(usu)
    Toastify({
        text: "Sus datos han sido guardos con exito",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { }
    }).showToast();
})



