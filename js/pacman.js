const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const ghost = document.getElementById("ghosts");
const pacman = document.getElementById("animation");
const pacman2 = document.getElementById("animation2");
document.onkeydown = checkKey;

let fps = 30

function createRect(x, y, width, hight, color) {
    ctx.fillRect(x, y, width, hight);
    ctx.fillStyle = color;
}

function drawGame() {
    createRect(0, 0, canvas.width, canvas.height, 'black')
    clear()
    drawPlayer()
    requestAnimationFrame(drawGame)
}

//==============================================WALLS
let oneBlockSize = 25
const wallSpaceWidth = oneBlockSize / 1.6
const wallOffset = (oneBlockSize - wallSpaceWidth) / 2
const wallInnerColor = 'black'

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const imp = []
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === 1) {
            imp.push({
                x: j * oneBlockSize,
                y: i * oneBlockSize
            })
        }
    }
}

function clear() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == 1) {
                ctx.fillStyle = "#342DCA";
                createRect(
                    j * oneBlockSize,
                    i * oneBlockSize,
                    oneBlockSize,
                    oneBlockSize,
                    "#342DCA"
                );
                if (j > 0 && map[i][j - 1] == 1) {
                    ctx.fillStyle = wallInnerColor;
                    createRect(
                        j * oneBlockSize,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth + wallOffset,
                        wallSpaceWidth,
                        wallInnerColor
                    );
                }

                if (j < map[0].length - 1 && map[i][j + 1] == 1) {
                    ctx.fillStyle = wallInnerColor;
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth + wallOffset,
                        wallSpaceWidth,
                        wallInnerColor
                    );
                }

                if (i < map.length - 1 && map[i + 1][j] == 1) {
                    ctx.fillStyle = wallInnerColor;
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth,
                        wallSpaceWidth + wallOffset,
                        wallInnerColor
                    );
                }

                if (i > 0 && map[i - 1][j] == 1) {
                    ctx.fillStyle = wallInnerColor
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize,
                        wallSpaceWidth,
                        wallSpaceWidth + wallOffset,
                        wallInnerColor
                    );
                }
            }
        }
    }
}
//===============================================PacMan
let direction = 'none'
let playerX = 25
let playerY = 25
let frame = 1
let rot = 0
function drawPlayer() {
    let po = playerX
    let pa = playerY
    if (direction === 'left') po += 25
    if (direction === 'up') pa += 25
    ctx.save();
    ctx.translate(po, pa)
    if (direction === 'right') {
        playerX += 1.5
        if (playerX > 525) {
            playerX = -10
        }
        ctx.drawImage(pacman, 20 * frame, 0, 20, 20, 0 + 2.5, 0 + 2.5, 20, 20);
    }
    else if (direction === 'down') {
        // po = playerX + 25
        playerY += 1.5
        ctx.drawImage(pacman2, 0, 20 * frame, 20, 20, 0 + 2.5, 0 + 2.5, 20, 20);
    }
    else if (direction === 'left') {
        ctx.scale(-1, 1);

        playerX -= 1.5
        if (playerX < -25) {
            playerX = 535
        }
        ctx.drawImage(pacman, 20 * frame, 0, 20, 20, 0 + 2.5, 0 + 2.5, 20, 20);
    }
    else if (direction === 'up') {
        ctx.scale(1, -1);
        playerY -= 1.5
        ctx.drawImage(pacman2, 0, 20 * frame, 20, 20, 0 + 2.5, 0 + 2.5, 20, 20);
    }
    else if (direction === 'none') {
        ctx.drawImage(pacman, 20 * frame, 0, 20, 20, 0 + 2.5, 0 + 2.5, 20, 20);
    }


    // ctx.rotate(rot*Math.PI/180);
    // ctx.drawImage(pacman, 20 * frame, 0, 20, 20, 0 + 2.5, 0 + 2.5, 20, 20);
    // ctx.drawImage(pacman2, 0, 20 * frame, 20, 20, 0 + 2.5, 0 + 2.5, 20, 20);
    ctx.restore();
}










//===============================================Game
function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '38' || e.innerText === 'Up') {
        // up arrow
        direction = 'up'
    }
    else if (e.keyCode == '40' || e.innerText === 'Down') {
        // down arrow
        direction = 'down'
    }
    else if (e.keyCode == '37' || e.innerText === 'Left') {
        // left arrow
        direction = 'left'
    }
    else if (e.keyCode == '39' || e.innerText === 'Right') {
        // right arrow
        direction = 'right'
    }
}
setInterval(() => {
    if (frame < 6) frame++
    else frame = 0
}, 200)
requestAnimationFrame(drawGame)
// setInterval(drawGame, 1000 / fps)

