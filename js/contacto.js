const form =document.getElementById('form');
const nombre=document.getElementById('nombre');
const email=document.getElementById('email');
const cel=document.getElementById('cel');
const motivo=document.getElementById('motivo');
const mensaje=document.getElementById('mensaje');

form.addEventListener('submit',e =>{
    e.preventDefault();
    validateInputs();
});

const setError=(element,message)=>{
    const inputControl=element.parentElement;
    const errorDisplay=inputControl.querySelector('.error');

    errorDisplay.innerText=message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
    
}

const setSuccess=element=>{
    const inputControl=element.parentElement;
    const errorDisplay=inputControl.querySelector('.error');

    errorDisplay.innerText='';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');

};

const ValidarEmail=email=>{
    const re =/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return re.test(String(email).toLowerCase());

}

const validateInputs=()=>{
    const nombreValue=nombre.value.trim();
    const emailValue=email.value.trim();
    const celValue=cel.value.trim();
    const motivoValue=motivo.value.trim();
    const mensajeValue=mensaje.value.trim();

    if (nombreValue===''){
        setError(nombre, 'Ingrese Nombre Completo');

    } else{
        setSuccess(nombre);

    }

    if(emailValue===''){
        setError(email,'Ingrese Email válido');
    }else if (!ValidarEmail(emailValue)){
        setError(email,'Ingrese un Email válido');
    }else{
        setSuccess(email);
    };

    if(celValue===''){
        setError(cel,'Ingrese número de celular');

    }else if(celValue.length<10){
        setError(cel,'Debe contener al menos 10 números');

    }else{
        setSuccess(cel);
    };

    if(motivoValue===''){
        setError(motivo,'Ingrese un motivo');

    }else{
        setSuccess(motivo);
    };

    if(mensajeValue===''){
        setError(mensaje,'Ingrese un mensaje');
    }else{
        setSuccess(mensaje);
    };
}