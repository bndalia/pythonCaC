var carrito;
var usu = "";
var listaUsuarios = [];
window.onload = () => {
   /* emailjs.init("9FGoHE7v3zGxA7-gg");

    let cart = JSON.parse(localStorage.getItem('carrito'));
    if (cart != null) {
        carrito = new CarritoCompra(cart);
    } else {
        carrito = new CarritoCompra();
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    if (usuarios != null) {
        listaUsuarios = usuarios;
    } else {
        listaUsuarios = [];
    }*/

    //Click events para las categorías
    $(".section_inicio").click(()=>{window.open("index.html");})
    $(".section_productos").click(() => { requestAllProducts("/category/electronics"); })
    $(".section_pc").click(() => { window.open("agregarProducto.html"); })
    // $(".section_ayuda").click(() => { requestAllProducts("/category/men's clothing"); })
    $(".section_contacto").click(() => { window.open("contacto.html"); })

    //Click event del carrito
    $("#carro").click(() => { showCart(); });

    //Click events de registro e inicio de sesión
    $("#registrarse").click(() => { showRegister(); });
    $("#iniciarSesion").click(() => { showLogin(); });

}