const canvas = document.getElementById("game");
const startButton = document.getElementById("startSnake");
const mode = document.getElementById("mode");
const ctx = canvas.getContext("2d");
document.onkeydown = checkKey;
let move = null
const body = []
let tailLength = 2
let positionX = 160
let positionY = 160
let modeGame = 'normal'
let appleX = 40
let appleY = 60
let colision = false

function drawGame() {
  clear()
  if (move === 'right') {
    positionX = positionX + 20
  }
  else if (move === 'left') {
    positionX = positionX - 20
  }
  else if (move === 'up') {
    positionY = positionY - 20
  }
  else if (move === 'down') {
    positionY = positionY + 20
  }
  printTail()
  drawApple()
  bodyBreak()
  
  ctx.lineWidth = 5;
  ctx.fillStyle = "#008000";
  ctx.fillRect(positionX, positionY, 20, 20);

  if (((positionY > 480) || positionY < 0) || (positionX > 580 || positionX < 0)) {
    stopGame()
  }
  else if(colision){
    stopGame()
  }
  else {
    setTimeout(drawGame, 60);
  }
  if (appleX === positionX && appleY === positionY) {
    tailLength = tailLength + 1

    appleX = 20 * Math.floor(Math.random() * 29)
    appleY = 20 * Math.floor(Math.random() * 24)
  }
  if (move !== false || (positionX === 160 && positionY === 160)) {
    startButton.classList = 'none'
  }
  else {
    startButton.classList = ''
  }
}
function bodyBreak() {
  for (let i = 0; i < body.length - 2; i++) {
    let part = body[i];
    if (part.x === positionX && part.y === positionY) {
      colision = true
      break;
    }
  }
}
function stopGame() {
  colision = false
  move = false
  appleX = 40
  tailLength = 2
  appleY = 60
}
function clear() {
  ctx.fillStyle = "#CCFFCC";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function createCube(x, y) {
  ctx.fillStyle = "#008000";
  ctx.fillRect(x, y, 20, 20);
}
function printTail() {
  for (let i = 0; i < body.length; i++) {
    let part = body[i];
    createCube(part.x, part.y)
  }
  body.push({ x: positionX, y: positionY });
  while (body.length > tailLength) {
    body.shift();
  }
}
startButton.addEventListener('click', () => {
  move = null
  positionX = 160
  positionY = 160
  drawGame()
})
function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX, appleY, 20, 20);
}
drawGame()

function checkKey(e) {

  e = e || window.event;

  if (e.keyCode == '38') {
    // up arrow
    if (move !== 'down') {

      move = 'up'
    }
  }
  else if (e.keyCode == '40') {
    // down arrow
    if (move !== 'up') {

      move = 'down'
    }
  }
  else if (e.keyCode == '37') {
    // left arrow
    if (move !== 'right') {

      move = 'left'
    }
  }
  else if (e.keyCode == '39') {
    // right arrow
    if (move !== 'left') {

      move = 'right'
    }
  }
}