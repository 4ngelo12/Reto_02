let PalabrasLista = ["HTML", "GITHUB", "JAVA", "ALURA", "LINKEDIN", "PALABRA", "SECRETO", "IDIOMA", "CODIGO", "DISCORD", "ARCHIVO"],
    containword = document.querySelector(".juego__cl"), usedlettergame = document.querySelector(".juego__lu"),
    btnStartGame = document.querySelector(".juego__button--main"), btnNuevaPalabra = document.querySelector(".form__button--main"),
    caracteresValidos = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U",
        "V", "W", "X", "Y", "Z"];

let color = "#0a3871"
let pantalla = document.querySelector(".hangman");
let pincel = pantalla.getContext("2d");
let selectedword, usedletter, hits, error, word;

btnStartGame.onclick = Reset;
btnNuevaPalabra.onclick = nuevaPalabra;

/*Dibujo de ahorcado*/

function drawHangmang() {

    //dibujo del muñeco
    //piso
    if (error == 1) {
        pincel.lineWidth = 3;
        pincel.strokeStyle = color;
        pincel.beginPath();
        pincel.moveTo(50, 150);
        pincel.lineTo(250, 150);
        pincel.stroke();
    }
    //palo
    if (error == 2) {
        pincel.lineWidth = 3;
        pincel.strokeStyle = color;
        pincel.beginPath();
        pincel.moveTo(65, 45);
        pincel.lineTo(65, 200);
        pincel.stroke();
    }
    //techo
    if (error == 3) {
        pincel.lineWidth = 2;
        pincel.strokeStyle = color;
        pincel.beginPath();
        pincel.moveTo(220, 45);
        pincel.lineTo(63, 45);
        pincel.stroke();
    }
    //cuerda
    if (error == 4) {
        pincel.lineWidth = 3;
        pincel.strokeStyle = color;
        pincel.beginPath();
        pincel.moveTo(200, 45);
        pincel.lineTo(200, 60);
        pincel.stroke();
    }

    //muñeco cabeza
    if (error == 5) {
        pincel.lineWidth = 3;
        pincel.strokeStyle = color;
        pincel.lineWidth = 3;
        pincel.beginPath();
        pincel.arc(200, 70, 10, 0, 2 * 3.14);
        pincel.stroke();
    }
    //muñecho cuerpo
    if (error == 6) {
        pincel.lineWidth = 3;
        pincel.strokeStyle = color;
        pincel.beginPath();
        pincel.moveTo(200, 80);
        pincel.lineTo(200, 110);
        pincel.stroke();
    }
    //muñecho pie 1
    if (error == 7) {
        pincel.lineWidth = 3;
        pincel.strokeStyle = color;
        pincel.beginPath();
        pincel.moveTo(200, 110);
        pincel.lineTo(180, 130);
        pincel.stroke();
    }
    //muñeco pie2
    if (error == 8) {
        pincel.lineWidth = 3;
        pincel.strokeStyle = color;
        pincel.beginPath();
        pincel.moveTo(200, 110);
        pincel.lineTo(220, 130);
        pincel.stroke();
    }
    //muñecho brazo 1
    if (error == 9) {
        pincel.lineWidth = 3;
        pincel.strokeStyle = color;
        pincel.beginPath();
        pincel.moveTo(200, 85);
        pincel.lineTo(215, 100);
        pincel.stroke();
    }
    //muñecho brazo 2
    if (error == 10) {
        pincel.lineWidth = 3;
        pincel.strokeStyle = color;
        pincel.beginPath();
        pincel.moveTo(200, 85);
        pincel.lineTo(185, 100);
        pincel.stroke();
    }
}

/*Insertar Palabras*/

function limpiarTexto() {
    var texto = document.querySelector(".form__input");
    texto.value = "";
}

function insertarPalabra(palabra) {
    PalabrasLista.push(palabra);
}

function nuevaPalabra() {
    var palabra = document.querySelector(".form__input");

    if (palabra.value.length == 0) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            text: 'No ha ingresado ningún caracter',
            title: 'Error!!!',
            showConfirmButton: true,
        })
        return;
    }

    for (var i = 0; i < palabra.value.length; i++) {
        if (!caracteresValidos.includes(palabra.value.toUpperCase()[i])) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: 'Solo debe ingresar letras, no número o caracteres especiales',
                title: 'Espere',
                showConfirmButton: true,
            })
            return;
        }
    }

    if (palabra.value.length >= 9) {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            text: 'Su palabra tiene más de 8 letras, por favor lea la advertencia',
            title: 'Espere',
            showConfirmButton: true,
        })
        return;
    }
    if (PalabrasLista.includes(palabra.value.toUpperCase())) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            text: 'La palabra que ha ingresado ya esta registrada',
            title: 'Cuidado',
            showConfirmButton: true,
        })
        return;
    }

    if (!PalabrasLista.includes(palabra.value.toUpperCase())) {
        insertarPalabra(palabra.value.toUpperCase());
        limpiarTexto;
        Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'La palabra que ha ingresado se ha registrado correctamente',
            title: 'Listo',
            showConfirmButton: true,
        })
        limpiarTexto();
        return;
    }
}

/* Funciones del juego */

function Start() {
    usedletter = [];
    error = 0;
    hits = 0;
    usedlettergame.innerHTML = "";
    containword.innerHTML = "";

    randomWord();
    document.addEventListener("keydown", letterEvent);
}
function randomWord() {
    word = PalabrasLista[Math.floor((Math.random() * PalabrasLista.length))].toUpperCase();
    selectedword = word.split('');

    useWord();
}

function useWord() {
    selectedword.forEach(letter => {
        var letras = document.createElement('div');
        letras.innerHTML = letter.toUpperCase();
        letras.classList.add('letter');
        letras.classList.add('hidden');
        containword.appendChild(letras);
    });
}

function letterEvent(event) {
    let newLetter = event.key.toUpperCase();

    if (newLetter.match(/^[a-zñ]$/i) && !usedletter.includes(newLetter)) {
        letterInput(newLetter);
    }
}

function letterInput(letter) {
    if (selectedword.includes(letter)) {
        correctLetter(letter);
    } else {
        error++;
        viewLetter(letter);
        usedletter.push(letter);
        letterFalse();
    }
    usedletter.push(letter)
}

function viewLetter(letter) {
    const letterElement = document.createElement("span");
    letterElement.classList.add('juego__lu__span')
    letterElement.innerHTML = letter;
    usedlettergame.appendChild(letterElement);
}

function letterFalse() {
    drawHangmang();

    if (error == 11) {
        let pantalla = document.querySelector(".hangman");

        Derrota();
        Reset();
    }
}

const correctLetter = (letter) => {
    const { children } = containword;
    for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML == letter) {
            children[i].classList.toggle("hidden");
            hits++;
        }
        if (hits == selectedword.length) {
            GameOver();
        }
    }
}

function GameOver() {
    document.removeEventListener("keydown", letterEvent);
    Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Has ganado!!',
        title: '¡¡¡Felidcidades!!!',
        showConfirmButton: true,
    })
}

function Derrota() {
    document.removeEventListener("keydown", letterEvent);
    Swal.fire({
        position: 'center',
        icon: 'error',
        text: 'Se te han acabado las vidas, la palabra era ' + word,
        title: 'Derrota',
        showConfirmButton: true,
    })
}

function Reset() {
    pincel.clearRect(0, 0, 350, 450);
    Start();
}

