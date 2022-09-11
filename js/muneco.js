var pantalla = document.querySelector(".hangman");
var pincel = pantalla.getContext("2d");
var jugar = document.querySelector("#btn-njuego")

pincel.fillStyle = "transparent";
pincel.fillRect(0, 0, 300, 160);
var color = "#0A3871"

crearHorca()

function crearHorca(){
    pincel.lineWidth = 2;
    pincel.strokeStyle = color
    pincel.beginPath()
    pincel.moveTo(40,140);
    pincel.lineTo(280,140);
    pincel.stroke();
}