const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const jump = document.querySelector('#jump')
const today = new Date().getHours();
const bird = new Image();
let birdPosition = 200;
let up = 0;
let gameStop = false
let basePosition = 0
let game = false
const sprites = {
    one: "../img/one.png",
    two: "../img/two.png",
    tree: "../img/tree.png"
}
let spritesPo = 1
const background = new Image();
const base = new Image();
base.src = '../img/base.png'
background.src = today < 18 ? "../img/background-day.png" : "https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/sprites/background-night.png";
bird.src = sprites.one
function drawGame() {
    clear()
    position()
    baseDraw()
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
            birdPosition = birdPosition + 3 - up
            if (up > 0) {
                up = up - 0.6
            }
        }
        else {
            gameStop = true
        }
    }
    if (!gameStop) {
        basePosition -= 1
        if (basePosition === -48) {
            basePosition = 0
        }
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
}, 150)
jump.addEventListener('click', () => {
    up = 10
    game = true
})
requestAnimationFrame(drawGame)
