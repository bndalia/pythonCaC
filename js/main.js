
window.onload = () => {


    //Click events para las categorías
    // $(".section_inicio").click(()=>{window.open("index.html");})
    $(".section_productos").click(() => { requestAllProducts("/category/electronics"); })
    $(".section_pc").click(() => { window.open("agregarProducto.html",'_self'); })
    $(".section_ayuda").click(() => { window.open("ayuda.html",'_self'); })
    $(".section_contacto").click(() => { window.open("contacto.html",'_self'); })

    //Click event del carrito
    //$("#carro").click(() => { showCart(); });

    //Click events de registro e inicio de sesión
    //$("#registro").click(() => { showRegistro(); });
    $("#iniciarSesion").click(() => { showLogin(); });

}