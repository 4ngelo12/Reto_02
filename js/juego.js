var PalabrasLista = ["HTML", "GITHUB", "JAVA", "ALURA", "LINKEDIN", "PALABRA", "SECRETO", "IDIOMA", "CODIGO", "DISCORD", "ARCHIVO"],
    containword = document.querySelector(".juego__lc"), usedlettergame = document.querySelector(".juego_lu"), 
    btnStartGame = document.querySelector(".juego__button__submit--main");

let selectedword, usedletter, error, hits; 

btnStartGame.onclick = Start;

function generarNumeroAleatorio(maximo){
    var numero = Math.floor(Math.random()*maximo - 0);
    return numero;
}

function Start() {
    usedletter = [];
    error = 0;
    hits = 0;
    containword.innerHTML = "";
    usedlettergame.innerHTML = "";
}

