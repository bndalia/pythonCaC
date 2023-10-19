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
}

function eliminarItemCarrito(event){
    var buttonClicked=event.target;
    buttonClicked.parentElement.remove()
    actualizaTotalCarrito();
}

function actualizaTotalCarrito(){
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
    document.getElementsByClassName('carrito-precio-total')[0].innerText='$'+total.toLocaleString("es")

}
