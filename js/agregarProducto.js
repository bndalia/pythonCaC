var carritoVisible=false;

if (document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready();
}

function ready(){
    //agregamos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem=document.getElementsByClassName('btn-eliminar');

    for(var i=0; i < botonesEliminarItem.length;i++){
        var button=botonesEliminarItem[i]
        button.addEventListener('click',eliminarItemCarrito);
    }

    //agrego funcionalidad al botón sumar cantidad
    var botonesSumarCantidad=document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i < botonesSumarCantidad.length;i++){
        var button=botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

      //agrego funcionalidad al botón restar cantidad
      var botonesRestarCantidad=document.getElementsByClassName('restar-cantidad');
      for(var i=0;i < botonesRestarCantidad.length;i++){
          var button=botonesRestarCantidad[i];
          button.addEventListener('click',restarCantidad);
      }

      //agrego funcionalidad a los botones agregar al carrito
      var botonesAgregarCarrito=document.getElementsByClassName('boton-item');
      for(var i=0; i<botonesAgregarCarrito.length;i++){
        var button=botonesAgregarCarrito[i];
        button.addEventListener('click',agregarAlCarritoClicked);
      }

      //agrego funcionalidad al botón pagar
      document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked);

}

function eliminarItemCarrito(event){
    var buttonClicked=event.target;
    buttonClicked.parentElement.parentElement.remove()
    

    //actualizamos total del carrito 
    actualizarTotalCarrito();

    // La siguiente funcion controla si hay elementos en el carrito , si no hay lo oculta
    ocultarCarrito();
}

function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor=document.getElementsByClassName('carrito')[0];
    var carritoItems=carritoContenedor.getElementsByClassName('carrito-item')
    var total=0;
    //recorremos cada elemento del carrito para actualizar
    for(var i=0;i< carritoItems.length;i++){
        var item=carritoItems[i];
        var precioElemento=item.getElementsByClassName('carrito-item-precio')[0]
        console.log(precioElemento);
        //quitamos simbolos
        var precio=parseFloat(precioElemento.innerText.replace('$','').replace('.','').replace(',',''))
        console.log(precio);
        var cantidadItem=item.getElementsByClassName('carrito-item-cantidad')[0]
        var cantidad=cantidadItem.value;
        console.log(cantidad);
        total=total+(precio*cantidad)   
    }
    total=Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText='$'+total.toLocaleString("es")+',00'

}

function ocultarCarrito(){
    var carritoItems=document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito=document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight='-100%';
        carrito.style.opacity='0';
        carritoVisible=false;

        //maximizo el contenedor de los elementos
        var items=document.getElementsByClassName('contenedor-items')[0];
        items.style.width='100%';

    }
}

//Aumento en uno la cantidad del elemento 
function sumarCantidad(event){
    var buttonClicked=event.target;
    var selector=buttonClicked.parentElement;
    var cantidadActual=selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value= cantidadActual;

    //actualizo total
    actualizarTotalCarrito();
}

//Disminuyo en uno la cantidad del elemento

function restarCantidad(event){
    var buttonClicked=event.target;
    var selector=buttonClicked.parentElement;
    var cantidadActual=selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;
    //controlamos que no sea menor que 1
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value= cantidadActual;

        //actualizo total
        actualizarTotalCarrito();
    }
   
}

function agregarAlCarritoClicked(event){
    var button=event.target;
    var item=button.parentElement;
    var titulo=item.getElementsByClassName('titulo-item')[0].innerText;
    var precio=item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc=item.getElementsByClassName('img-item')[0].src;
    // console.log(titulo,precio,imagenSrc);
    
    // La sig función agrega el elemento seleccionado al carrito, se ingresa por parametros los valores
    agregaItemAlCarrito(titulo,precio,imagenSrc);

    //Hacemos visible el carrito cuando agregamos por primera vez
    hacerVisibleCarrito();

}

function agregaItemAlCarrito(titulo,precio,imagenSrc){
    var item=document.createElement('div');
    item.classList.add='item';
    var itemsCarrito=document.getElementsByClassName('carrito-items')[0];

    // controla que el item que está ingresando no se encuentra en el carrito
    var nombresItemsCarrito=itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0; i< nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El artículo ya se encuentra en el carrito")
            return;
        }
    }

    var itemCarritoContenido=`

        <div class="carrito-item">
            <img src="${imagenSrc}" alt="" width="80px">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>

            </div>
            <span class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </span>
     
    `

    item.innerHTML=itemCarritoContenido;
    itemsCarrito.append(item);

    //agregamos la funcionalidad eliminar del nuevo item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click',eliminarItemCarrito);

    //agregamos la funcionalidad sumar el nuevo elemento
    var botonSumarCantidad=item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //agregamos la funcionalidad restar el nuevo elemento
    var botonRestarCantidad=item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

}

function pagarClicked(event){
    alert("Gracias por su compra");
    //Elimino todos los elementos del carrito
    var carritoItems=document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();

    //funcion que oculta el carrito
    ocultarCarrito();
}

function hacerVisibleCarrito(){
    carritoVisible=true;
    var carrito=document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight='0';
    carrito.style.opacity='1';

    var items=document.getElementsByClassName('contenedor-items')[0];
    items.style.width='60%';


}

