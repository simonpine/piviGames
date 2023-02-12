const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const jump = document.querySelector('#jump')
const restart = document.querySelector('#restart')
const background = new Image();
background.src = "../img/spaceBg.jpg"
const ship = new Image();
ship.src = "../img/spaceShip.png"
document.onkeydown = move;
document.onkeyup = move2;
let vel = 0
let shipX = 70
const shots = []
let points = 0
function drawGame() {
    moveAuot()
    colision()
    clear()
    drawShots()
    drawSpaceShip()
    requestAnimationFrame(drawGame)
}
requestAnimationFrame(drawGame)

function clear() {
    ctx.drawImage(background, -240, 0, canvas.width + 360, canvas.height);
}
function drawSpaceShip() {
    ctx.drawImage(ship, shipX, 530, 50, 50);
}
function move2(e) {
    e = e || window.event
    if (e.key === 'ArrowRight') {
        vel = 0
    }
    else if (e.key === 'ArrowLeft') {
        vel = 0
    }

}
function moveAuot() {
    if (!(shipX < 531 && shipX > 19)) {
        vel = 0
    }
    if (shipX >= 531) {
        shipX = 530
    }
    else if (shipX <= 19) {
        shipX = 20
    }
    shipX += vel
}
function colision(){
    shots.map((shot) => {
        if(shot.positionY < 0){
            shots.shift()
        }
    })
}
function drawShots(){
    shots.map((shot) => {
        ctx.fillStyle = "red";
        ctx.fillRect(shot.positionX, shot.positionY, 7, 15);
        return shot.positionY -= 5
    })
}
function move(e) {
    e = e || window.event
    if (e.key === 'ArrowRight') {
        vel = 5
    }
    else if (e.key === 'ArrowLeft') {
        vel = -5
    }
    if (e.key === ' ') {
        
        shots.length < 10 && shots.push({positionX: shipX + 22, positionY: 520})
    }
}
