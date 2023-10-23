
var lastRequest;

/**
 * Realiza la llamada a la api para la categoría indicada
 * @param  {String} category Categoría a buscar, puede estar vacío
 * @param  {String} sort Parámetros de orden, puede estar vacío
 */
function requestAllProducts(category = "", sort = "") {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = tratarRespuesta;

    //Si se ordena se coge la última petición y se añade el orden, si no se hace la nueva petición
    sort ? newRequest = lastRequest + category + sort : newRequest = "https://fakestoreapi.com/products" + category

    httpRequest.open("GET", newRequest);///category/men's clothing
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

    /*Sección*/
    let catalogo = $("<section>")
        .addClass("catalogo")
        .appendTo(main);

 
    /*Contenedor de productos*/
    let container = $("<div>")
        .addClass("item-container")
        .appendTo(catalogo);

    //Se cargan los artículos
    datos.forEach(item => {
        let divItem = $('<div>')
            .addClass('item')
            .appendTo(container);

        let img = $('<img>')
            .attr("src", item.image)
            .appendTo(divItem);
        let nomb = $('<h3>' + item.title + '</h3>')
            .appendTo(divItem);
        let preci = $('<h4>' + item.price + '$</h4>')
            .appendTo(divItem);

        divItem.click(function (event) { requestProductoSeleccionado(item.id);});
    });
}
