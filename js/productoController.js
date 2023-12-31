const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;


imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage(){
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);

/**
 * Lanza una petición a la api para obtener los datos de un producto dado su id
 * @param {Number} id 
 */
function requestProductoSeleccionado(id) {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = respuestaProducto;

    httpRequest.open("GET", 'https://fakestoreapi.com/products/'+id);
    httpRequest.send();
}

/**
 * Recibe la respuesta del producto buscado por la api y llama al método para mostrarlo
 * @see mostrarProducto
 */
function respuestaProducto() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            var datos = JSON.parse(httpRequest.responseText);
            mostrarProducto(datos);
        } else {
            alert("There was a problem with the request.");
        }
    }
}

/**
 * Coloca un producto en el html
 * @param {JSON} item 
 * @see respuestaProducto
 */
function mostrarProducto(item){
    let main = $("main");
    main.empty();

    /*Sección*/
    let container = $("<section>")
        .addClass("detalle")
        .appendTo(main);

    /*    
    let images = $("<div>")
        .addClass("detalle-images")
        .appendTo(container);

    let img = $('<img>')
        .attr("src", item.image)
        .appendTo(images);*/

    let imagesProduct = $(
        `
            <div class = "product-imgs">
            <div class = "img-display">
            <div class = "img-showcase">
                <img src = "${item.image}" alt = "shoe image">
            </div>
            </div>
            <div class = "img-select">
            <div class = "img-item">
                <a href = "#" data-id = "1">
                <img src = "${item.image}" alt = "shoe image">
                </a>
            </div>
            <div class = "img-item">
                <a href = "#" data-id = "2">
                <img src = "${item.image}" alt = "shoe image">
                </a>
            </div>
            <div class = "img-item">
                <a href = "#" data-id = "3">
                <img src = "${item.image}" alt = "shoe image">
                </a>
            </div>
            <div class = "img-item">
                <a href = "#" data-id = "4">
                <img src = "${item.image}" alt = "shoe image">
                </a>
            </div>
            </div>
        </div>
        `
    ).appendTo(container);    

    let info = $("<div>")
        .addClass("info")
        .appendTo(container);

    let nomb = $('<h1>' + item.title + '</h1>')
        .appendTo(info);


    let rating = $(
        `
        <div class = "product-rating">
            <i class = "fas fa-star"></i>
            <i class = "fas fa-star"></i>
            <i class = "fas fa-star"></i>
            <i class = "fas fa-star"></i>
            <i class = "fas fa-star-half-alt"></i>
            <span>${item.rating.rate} Stock: ${item.rating.count}</span>
        </div>
        `
    ).appendTo(info)


    let preci = $('<h2>Precio: USD ' + item.price + '</h2>')
        .appendTo(info);

    let about = $('<h3> Sobre Este Producto: </h3>')
        .appendTo(info);

    let descripcion = item.description

    let desc = $( `<p> ${
            descripcion.length > 160
          ? descripcion.substring(0, 160).concat(' ... ver mas')
          : descripcion }</p> `)
        .appendTo(info);



    let add = $('<button> Agregar al Carrito </button>')
    .click(function (){
        if(usu!=""){
        //Se añade el artículo al carrito
        let talla=$( ".tallaProduct option:selected" ).text();
        carrito.addToCart(item,talla,1);

        //Se añade a local storage
        localStorage.setItem('carrito',  JSON.stringify(carrito.getCarrito()));
        sustituirUsuario(usu.id);
        }else{
            alert("Debes iniciar sesión para añadir un artículo al carrito");
        }
    })
    .appendTo(info);
}

/**
 * Sustituye un usuario dado en localStorage por el mismo usuario con el carrito actualizado
 * @param {String} id id del usuario a actualizar
 */
function sustituirUsuario(id){
    //Se sustituye el carrito por el actual
    usu.carrito=JSON.stringify(carrito.getCarrito());

    listaUsuarios = JSON.parse(localStorage.getItem('usuarios'));

    for (let i = 0; i < listaUsuarios.length; i++) {
        const usuario = listaUsuarios[i];
        if (usuario.id == id) {
            //Se elimina el usuario desactualizado
            listaUsuarios.splice(i, 1);
            //Se añade el usuario con el nuevo carrito
            listaUsuarios.push(usu);
            //Se devuelve al localStorage
            localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
        } 
    }
}