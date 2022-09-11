var inicio = document.querySelector(".principal"), newword = document.querySelector(".nueva-palabra"),
    newgame = document.querySelector(".juego");

let btnNewgame = document.querySelector(".boton--primario"), btnNewword = document.querySelector(".boton--secundario"),
    btnCancelar = document.querySelector(".form__button__submit--back"), 
    btnSalir = document.querySelector(".juego__button__submit--back");

btnNewword.onclick = SeccionNuevaPalabra;
btnNewgame.onclick = SeccionJuego;
btnCancelar.onclick = SeccionInicio;
btnSalir.onclick = SeccionInicio;

function SeccionNuevaPalabra() {
    inicio.classList.add("none");
    newword.classList.remove("none");
}

function SeccionJuego() {
    inicio.classList.add("none");
    newgame.classList.remove("none");
}

function SeccionInicio() {
    inicio.classList.remove("none");
    newword.classList.add("none");
    newgame.classList.add("none");
}