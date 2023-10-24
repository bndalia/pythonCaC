
var lastRequest;

/**
 * Realiza la llamada a la api para la categoría indicada
 * @param  {String} category Categoría a buscar, puede estar vacío
 * @param  {String} sort Parámetros de orden, puede estar vacío
 */
function requestAllProducts(category = "", sort = "") {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = tratarRespuesta;

    
    sort ? newRequest = lastRequest + category + sort : newRequest = "https://fakestoreapi.com/products" + category

    httpRequest.open("GET", newRequest);
    httpRequest.send();
    lastRequest = newRequest;
}

/**
 * Gestiona la respuesta de la api.
 * @see cargarElementos
 */
function tratarRespuesta() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            var datos = JSON.parse(httpRequest.responseText);
            cargarElementos(datos);
        } else {
            alert("There was a problem with the request.");
        }
    }
}

/**
 * Carga los elementos de un JSON dado en el HTML
 * @param {JSON} datos 
 * @see tratarRespuesta
 */
function cargarElementos(datos) {    
    let main = $("main");
    main.empty();

    document.querySelector(".contenido").style["grid-template-rows"] = "repeat(1, fit-content(5rem))";
    document.querySelector(".contenido").style.background = "#eee";

    /*Sección*/
    let catalogo = $("<section>")
        .addClass("catalogo")
        .appendTo(main);

 
    /*Contenedor de productos*/
    let container = $("<div>")
        .addClass("item-container")
        .appendTo(catalogo);

    //Se cargan los productos
    datos.forEach(item => {
        let divItem = $('<div>')
            .addClass('item')
            .appendTo(container);

        let divImgCon = $('<div>')
            .addClass('image-content')
            .appendTo(divItem);

        let divCardImg = $('<div>')
            .addClass('card-image')
            .appendTo(divImgCon);

        let img = $('<img>')
            .attr("src", item.image)
            .addClass('card-img')
            .appendTo(divCardImg);

        let divTituloCon = $('<div>')
            .addClass('titulo-content')
            .appendTo(divItem);   

        let nomb = $('<h3>' + item.title + '</h3>')
            .appendTo(divTituloCon);

        let divPriceCon = $('<div>')
            .addClass('precio-content')
            .appendTo(divItem);  

        let preci = $('<h4>USD ' + item.price + '</h4>')
            .appendTo(divPriceCon);

        let button = $('<button>' + "Ver Detalles" + '</button>')
            .addClass('button')
            .appendTo(divItem);  

        button.click(function (event) { requestProductoSeleccionado(item.id);});
    });
}
