const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startSpace");
const againButton = document.getElementById("playAgain");
const nextLevel = document.getElementById("nextLevel");

const background = new Image();
background.src = "../img/spaceBg.jpg"
const ship = new Image();
ship.src = "../img/spaceShip.png"
const al = new Image();
al.src = "../img/alien.png"
document.onkeydown = move;
document.onkeyup = move2;
let aliensPositionX = 10
let aliensPositionY = 10
let vel = 0
let gameStop = true
let loose = false
let alVel = 1
let shipX = 220
let moveAliens = 'right'
const shots = []
const alienShots = []
const aliens = []
for (let i = 0; i < 6; i++) {
    const item = []
    for (let x = 0; x < 10; x++) {
        item.push({
            positionX: x * 50,
            positionY: i * 40,
            alive: true
        })
    }
    aliens.push(item)
}
let points = 0
function drawGame() {
    moveAuot()
    colision()
    rePlay()
    clear()
    drawPoints()
    drawAliens()
    drawShots()
    drawSpaceShip()
    lose()
    requestAnimationFrame(drawGame)
}
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
function rePlay() {
    if (points === 0) {
        startButton.classList = ''
    }
    else {
        startButton.classList = 'none'
    }
    if (loose) {
        againButton.classList = ''
    }
    else {
        againButton.classList = 'none'
    }
    if (points === 6000 || points === 12001 || points === 18002 || points === 24003) {
        nextLevel.classList = ''
    }
    else {
        nextLevel.classList = 'none'
    }
}
function drawAliens() {
    aliens.map((line) => {
        line.map((alien) => {
            if (alien.alive) {
                ctx.drawImage(al, alien.positionX + aliensPositionX, alien.positionY + aliensPositionY, 40, 30);
                if (!gameStop) {
                    if (alienShots.length < 10) {
                        if (Math.floor(Math.random() * 3000) === 50) {
                            alienShots.push({ positionX: alien.positionX + aliensPositionX, positionY: alien.positionY + aliensPositionY })
                        }
                    }
                }
            }
        })
    })
}
function drawPoints() {
    ctx.font = "90px arial";
    ctx.fillStyle = "#1d1d1d";
    ctx.textAlign = "center";
    ctx.fillText(`${points}`, canvas.width / 2, 270);
}
function lose() {
    if (loose) {
        dark()
        ctx.font = "90px arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(`You lose`, canvas.width / 2, 270);
    }
    aliens.map((line) => {
        line.map((alien) => {
            if (alien.alive) {
                if (alien.positionY + aliensPositionY > 528) {
                    gameStop = true
                    loose = true
                }
            }
        })
    })
    if (points === 6000 || points === 12001 || points === 18002 || points === 24003) {
        dark()
        ctx.font = "90px arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(`You Win`, canvas.width / 2, 270);
        gameStop = true
    }
}
function moveAuot() {
    if (!gameStop) {
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

        if (moveAliens === 'right') {
            aliensPositionX += alVel
        }
        else if (moveAliens === 'left') {
            aliensPositionX -= alVel
        }
        else if (moveAliens === 'down') {
            aliensPositionY += alVel
        }
        if (aliensPositionX > 100) {
            moveAliens = 'down'
            aliensPositionX -= alVel
        }
        else if (aliensPositionX < 10) {
            moveAliens = 'down'
            aliensPositionX += alVel
        }
        else if (aliensPositionY === 30 || aliensPositionY === 70 || aliensPositionY === 110 || aliensPositionY === 150 || aliensPositionY === 190 || aliensPositionY === 230 || aliensPositionY === 270 || aliensPositionY === 310 || aliensPositionY === 350 || aliensPositionY === 390 || aliensPositionY === 430 || aliensPositionY === 470 || aliensPositionY === 510) {
            moveAliens = 'left'
        }
        else if (aliensPositionY === 50 || aliensPositionY === 90 || aliensPositionY === 130 || aliensPositionY === 170 || aliensPositionY === 210 || aliensPositionY === 250 || aliensPositionY === 290 || aliensPositionY === 330 || aliensPositionY === 370 || aliensPositionY === 410 || aliensPositionY === 450 || aliensPositionY === 490 || aliensPositionY === 530) {
            moveAliens = 'right'
        }
    }
}
function dark() {
    ctx.fillStyle = '#1d1d1d83';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function colision() {
    if (shots.length > 0) {
        shots.map((shot, index) => {
            if (shot.positionY < 0) {
                shots.splice(index, 1)
            }
            aliens.map((line) => {
                line.map(alien => {
                    if (alien.alive) {
                        if ((alien.positionX + aliensPositionX - 10 < shot.positionX && alien.positionX + 50 + aliensPositionX > shot.positionX) && alien.positionY + aliensPositionY === shot.positionY) {
                            shots.splice(index, 1)
                            points += 100
                            return alien.alive = false
                        }
                    }
                })
            })
        })
    }
    if (alienShots.length > 0){
        alienShots.map((shot, index) => {
            if (shot.positionY > 600) {
                alienShots.splice(index, 1)
                console.log('uy')
            }
            else if(shot.positionY > 530 && shot.positionY < 580){
                if(shot.positionX > shipX && shot.positionX < shipX + 50){
                    gameStop = true
                    loose = true
                }
            }
        })
    }
}
function drawShots() {
    shots.map((shot) => {
        ctx.fillStyle = "red";
        ctx.fillRect(shot.positionX, shot.positionY, 7, 15);
        return shot.positionY -= 5
    })
    alienShots.map((shot) => {
        ctx.fillStyle = "white";
        ctx.fillRect(shot.positionX, shot.positionY, 7, 15);
        return shot.positionY += 3
    })
}
function move(e) {
    e = e || window.event
    if (!gameStop) {
        if (e.key === 'ArrowRight') {
            vel = 5
        }
        else if (e.key === 'ArrowLeft') {
            vel = -5
        }
        if (e.key === ' ') {
            shots.length < 10 && shots.push({ positionX: shipX + 22, positionY: 520 })
        }
    }
}
startButton.addEventListener('click', () => {
    gameStop = false
})
againButton.addEventListener('click', () => {
    aliens.length = 0
    points = 0
    for (let i = 0; i < 6; i++) {
        const item = []
        for (let x = 0; x < 10; x++) {
            item.push({
                positionX: x * 50,
                positionY: i * 40,
                alive: true
            })
        }
        aliens.push(item)
    }
    aliensPositionX = 10
    aliensPositionY = 10
    alVel = 1
    gameStop = false
    loose = false
})
nextLevel.addEventListener('click', () => {
    aliens.length = 0
    points += 1
    for (let i = 0; i < 6; i++) {
        const item = []
        for (let x = 0; x < 10; x++) {
            item.push({
                positionX: x * 50,
                positionY: i * 40,
                alive: true
            })
        }
        aliens.push(item)
    }
    aliensPositionX = 10
    aliensPositionY = 10
    alVel *= 2
    gameStop = false
    loose = false
})
requestAnimationFrame(drawGame)