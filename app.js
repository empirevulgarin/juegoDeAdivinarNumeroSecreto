//Variables de alcance global
let numeroSecreto = 0;
let intentos = 0;
let listaDeNumerosSorteados = [];
let numeroMaximo = 10;
let maximoIntento = 2;

//Esta función genérica optimiza el código para ingresar a un elemento del DOM y así poder escribir un texto 
function asignarElementoTexto(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

/*Esta función genera un número aleatorio, condiciona la recursividad a través de un límite,
a su vez evalúa o verifica si hay un elemento ya existente en la lista y de no estarlo nos devuelve otro valor */
function generarNumeroSecreto() {
    let generarNumero = Math.floor(Math.random()*numeroMaximo)+1;
    if (listaDeNumerosSorteados.length == numeroMaximo) {
       asignarElementoTexto('p', 'Se han sorteado todos los números disponibles');
    } else {
       if (listaDeNumerosSorteados.includes(generarNumero)) {
       return generarNumeroSecreto();
       } else {
       listaDeNumerosSorteados.push(generarNumero)
       return generarNumero;
       }
    }
}

/*Esta función verifica por medio de la condiciones si hemos logrado acertar, de lo contrario nos
guiará a la solución hasta un límite de intentos*/ 
function evaluarIntento() {
    let numeroIngresado = parseInt(document.getElementById('valorIngresado').value);
    if (numeroIngresado === numeroSecreto) {
        asignarElementoTexto('p', `¡Felicidades! Has acertado después de ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (intentos > maximoIntento) {
            asignarElementoTexto('p', `Has alcando el maximo de ${intentos} intentos`);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            if (numeroIngresado > numeroSecreto) {
                asignarElementoTexto('p', 'El número secreto es menor');
            } else {
                asignarElementoTexto('p', 'El número secreto es mayor');
            }
            intentos++;
            limpiarCaja();
        }
    }
    return;
}

//limpiará o borrará el contenido ingresado en la caja
function limpiarCaja() {
    return document.getElementById('valorIngresado').value = '';
}

//esta funcion contiene las primeras acciones de nuestro juego
function accionesIniciales() {
    asignarElementoTexto('h1', 'Adivina el número secreto');
    asignarElementoTexto('p', `Ingresa un número entre 1 y ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    return;
}
accionesIniciales();

//esta función restablecerá el juego aplicando funciones y habilitando el boton nuevo juego
function reiniciarJuego() {
    limpiarCaja();
    accionesIniciales();
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
    return;
}