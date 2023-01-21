const canvas = document.getElementById("game");
const startButton = document.getElementById("startSnake");
const direction = document.querySelectorAll(".directionButtons");
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
  drawHead()
  appleCatch()
  
  if (((positionY > 480) || positionY < 0) || (positionX > 580 || positionX < 0)) {
    stopGame()
  }
  else if (colision) {
    stopGame()
  }
  else {
    setTimeout(drawGame, 60);
  }
  rePlay()
}
//-------------------------------------------------Game Function (brack)----------------------------------------

function bodyBreak() {
  for (let i = 0; i < body.length - 2; i++) {
    let part = body[i];
    if (part.x === positionX && part.y === positionY) {
      colision = true
      break;
    }
  }
}
function appleCatch() {
  if (appleX === positionX && appleY === positionY) {
    tailLength = tailLength + 1
    appleX = 20 * Math.floor(Math.random() * 29)
    appleY = 20 * Math.floor(Math.random() * 24)
    for (let i = 4; i < body.length; i++) {
      let part = body[i];
      if (appleX === part.x && appleY === part.y) {
        appleX = 20 * Math.floor(Math.random() * 29)
        appleY = 20 * Math.floor(Math.random() * 24)
        break
      }
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
function rePlay(){
  if (move !== false || (positionX === 160 && positionY === 160)) {
    startButton.classList = 'none'
  }
  else {
    startButton.classList = ''
  }
}
//-------------------------------------------------Draw script----------------------------------------
function clear() {
  ctx.fillStyle = "#CCFFCC";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function drawHead() {
  ctx.lineWidth = 5;
  ctx.fillStyle = "#004b00";
  ctx.fillRect(positionX, positionY, 20, 20);
}
function drawApple() {
  ctx.beginPath();
  ctx.stroke();
  ctx.fillStyle = "red";
  ctx.arc(appleX + 10, appleY + 10, 10, 0, 2 * Math.PI, false);
  ctx.fill();

}
function printTail() {
  for (let i = 0; i < body.length; i++) {
    let part = body[i];
    createCube(part.x, part.y, i)
  }
  body.push({ x: positionX, y: positionY });
  while (body.length > tailLength) {
    body.shift();
  }
}
function createCube(x, y, i) {
  const dot = i % 2;
  if (dot === 0) {
    ctx.fillStyle = "#004b00";
  }
  else {
    ctx.fillStyle = "#008000";
  }
  ctx.fillRect(x, y, 20, 20);
}
//-------------------------------------------------Move script----------------------------------------
function checkKey(e) {
  e = e || window.event;

  if (e.keyCode == '38' || e.innerText === 'Up') {
    // up arrow
    if (move !== 'down') {

      move = 'up'
    }
  }
  else if (e.keyCode == '40' || e.innerText === 'Down') {
    // down arrow
    if (move !== 'up') {

      move = 'down'
    }
  }
  else if (e.keyCode == '37' || e.innerText === 'Left') {
    // left arrow
    if (move !== 'right') {

      move = 'left'
    }
  }
  else if (e.keyCode == '39' || e.innerText === 'Right') {
    // right arrow
    if (move !== 'left') {

      move = 'right'
    }
  }
}
startButton.addEventListener('click', () => {
  move = null
  positionX = 160
  positionY = 160
  drawGame()
})
direction.forEach(item => {
  item.addEventListener('click', () => {
    checkKey(item)
  }
  )
})
drawGame()