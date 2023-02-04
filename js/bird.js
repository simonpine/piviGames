const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const jump = document.querySelector('#jump')
const today = new Date().getHours();
const bird = new Image();
let birdPosition = 250;
let up = 0;
let game = false
const sprites = {
    one: "https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/sprites/yellowbird-downflap.png",
    two: "https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/sprites/yellowbird-midflap.png",
    tree: "https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/sprites/yellowbird-upflap.png"
}
const background = new Image();
background.src = today < 18 ? "https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/sprites/background-day.png" : "https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/sprites/background-night.png";
bird.src = sprites.tree
function drawGame() {
    clear()
    position()
    drawBird()
    requestAnimationFrame(drawGame)
}
function clear() {
    ctx.drawImage(background, 0, 0);
}
function drawBird() {
    ctx.drawImage(bird, 100, birdPosition);
    // ctx.translate(150, 75);
    // ctx.rotate(Math.PI / 2);
    // ctx.translate(-150, -75);

}
function position() {
    // birdPosition += 1
    if (game) {
        if (birdPosition <= 490) {
            birdPosition = birdPosition + 3 - up
            if (up > 0) {
                up = up - 0.6
            }
        }
    }


}

setInterval(() => {
    if (bird.src === sprites.tree) {
        bird.src = sprites.two
    }
    else if (bird.src === sprites.two) {
        bird.src = sprites.one
    }
    else {
        bird.src = sprites.tree
    }
}, 150)
jump.addEventListener('click', () => {
    up = 12
    game = true
})
requestAnimationFrame(drawGame)
