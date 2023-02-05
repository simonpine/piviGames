const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const jump = document.querySelector('#jump')
const restart = document.querySelector('#restart')
const today = new Date().getHours();
const bird = new Image();
document.onkeydown = jumpBird;
let birdPosition = 200;
let up = 0;
let gameStop = false
let basePosition = 0
let game = false
let pipe1Position = 290 + 100
let pipe2Position = (290 * 1.6) + 100
let downVel = 3
let hole1 = 200
let hole2 = 200
let jumpAbility = true
let count = 0
const sprites = {
    one: "../img/one.png",
    two: "../img/two.png",
    tree: "../img/tree.png",
    four: "../img/r.png",
}
let spritesPo = 1
const background = new Image();
const base = new Image();
base.src = '../img/base.png'
const pipe = new Image();
pipe.src = '../img/pipe.png'
background.src = today < 18 ? "../img/background-day.png" : "https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/sprites/background-night.png";
bird.src = sprites.one
function drawGame() {
    clear()
    drawPoints()
    position()
    drawPipe11()
    drawPipe12()
    drawPipe21()
    drawPipe22()
    baseDraw()
    coliison()
    drawBird()
    requestAnimationFrame(drawGame)
}
function clear() {
    ctx.drawImage(background, 0, 0);
}
function drawBird() {
    ctx.drawImage(bird, 100, birdPosition);
}
function baseDraw() {
    ctx.drawImage(base, basePosition, 400);
}
function position() {
    if (game) {
        if (birdPosition <= 380) {
            birdPosition = birdPosition + downVel - up
            if (up > 0) {
                up = up - 0.6
            }
        }
        else {
            stopGame()
        }
    }
    if (!gameStop) {
        basePosition -= 1
        if (basePosition === -48) {
            basePosition = 0
        }
    }
    if (!gameStop && game) {
        if (pipe1Position > - 50) {
            pipe1Position -= 1
        }
        else {
            pipe1Position = 290
            hole1 = Math.random() * (290 - 80) + 80
        }
        if (pipe2Position > - 50) {
            pipe2Position -= 1
        }
        else {
            pipe2Position = 290
            hole2 = Math.random() * (290 - 80) + 80
        }
    }

}
function drawPoints() {
    ctx.font = "50px arial";
    ctx.fillStyle = "#025961";
    ctx.textAlign = "center";
    ctx.fillText(`${count}`, canvas.width / 2, 120);
}
function stopGame() {
    gameStop = true
    jumpAbility = false
    downVel = 8
    bird.src = sprites.four
}
function drawPipe11() {
    ctx.save();
    ctx.translate(0, hole1 - 50);
    ctx.scale(1, -1);
    ctx.drawImage(pipe, pipe1Position, 0, 50, 350);
    ctx.restore();
}
function drawPipe12() {
    ctx.save();
    ctx.translate(0, hole1 + 50);
    ctx.drawImage(pipe, pipe1Position, 0, 50, 350);
    ctx.restore();
}
function drawPipe21() {
    ctx.save();
    ctx.translate(0, hole2 - 50);
    ctx.scale(1, -1);
    ctx.drawImage(pipe, pipe2Position, 0, 50, 350);
    ctx.restore();
}
function drawPipe22() {
    ctx.save();
    ctx.translate(0, hole2 + 50);
    ctx.drawImage(pipe, pipe2Position, 0, 50, 350);
    ctx.restore();
}
function coliison() {
    if ((pipe1Position < 130 && pipe1Position > 60) && (birdPosition > (hole1 + 30) || birdPosition < (hole1 - 50)) || (pipe2Position < 130 && pipe2Position > 60) && (birdPosition > (hole2 + 30) || birdPosition < (hole2 - 50))) {
        stopGame()
    }
    else if (pipe1Position === 95 || pipe2Position === 95) {
        count += 1
    }
}
setInterval(() => {
    if (!gameStop) {
        if (spritesPo === 1) {
            bird.src = sprites.two
            spritesPo = 2
        }
        else if (spritesPo === 2) {
            bird.src = sprites.tree
            spritesPo = 3
        }
        else {
            bird.src = sprites.one
            spritesPo = 1
        }
    }
}, 200)
function jumpBird(e) {
    e = e || window.event
    if (e.key === ' ' && jumpAbility) {
        up = 10
        game = true
    }
}
restart.addEventListener('click', () => {
    birdPosition = 200;
    up = 0;
    gameStop = false
    basePosition = 0
    game = false
    pipe1Position = 290
    pipe2Position = 290 * 1.6
    downVel = 3
    hole1 = 200
    hole2 = 200
    jumpAbility = true
    count = 0
})
jump.addEventListener('click', () => jumpBird({ key: ' ' }))
requestAnimationFrame(drawGame)
