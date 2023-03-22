const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
document.onkeydown = checkKey;
const start = document.querySelector('#startPong')
let ballX = 450;
let ballY = 250;
let velocity = 2;
let velocityUsers = 4;
let color = 'white'
let direction = 'nop';
let user1Y = 10;
let user2Y = 10;
let moveUser1;
let moveUser2;

let points1 = 0
let points2 = 0

start.addEventListener('click', () => {
    velocity = 2;
    color = 'white'
    ballX = 450;
    ballY = 250;
    const sta = Math.round(Math.random() * 4)
    sta >= 2 ? direction = 'ld' : direction = 'ru'
})
function drawGame() {
    if(direction !== 'nop'){
        start.classList = 'none'
    }
    else{
        start.classList = ''
    }
    clear()
    drawPoints()
    ballDirect()
    ball()
    drawUser1()
    drawUser2()
    usersMove()
    topButtonColision()

    requestAnimationFrame(drawGame)
}
function clear() {
    ctx.fillStyle = "#1b181c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function ball() {
    ctx.beginPath();
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.arc(ballX, ballY, 10, 0, 2 * Math.PI, false);
    ctx.fill();
}
function usersMove() {
    if (moveUser1 === 'down') {
        if (user1Y !== 390) {
            user1Y = user1Y + velocityUsers
        }
    }
    else if (moveUser1 === 'up') {
        if (user1Y !== 10) {
            user1Y = user1Y - velocityUsers
        }
    }
    if (moveUser2 === 'down') {
        if (user2Y !== 390) {
            user2Y = user2Y + velocityUsers
        }
    }
    else if (moveUser2 === 'up') {
        if (user2Y !== 10) {
            user2Y = user2Y - velocityUsers
        }
    }
}
function drawPoints() {
    ctx.font = "90px arial";
    ctx.fillStyle = "#29252b";
    ctx.textAlign = "center";
    ctx.fillText(`${points1} | ${points2}`, canvas.width/2, 270);
}
function ballDirect() {
    if (direction === 'ld') {
        ballY = ballY + velocity
        ballX = ballX - velocity
    }
    else if (direction === 'lu') {
        ballY = ballY - velocity
        ballX = ballX - velocity
    }
    else if (direction === 'ru') {
        ballY = ballY - velocity
        ballX = ballX + velocity
    }
    else if (direction === 'rd') {
        ballY = ballY + velocity
        ballX = ballX + velocity
    }
}
function topButtonColision() {
    if (ballY <= 10 && ballY >= 0) {
        direction === 'ru' ? direction = 'rd' : direction = 'ld'
    }
    else if (ballY >= 490 && ballY <= 500) {
        direction === 'rd' ? direction = 'ru' : direction = 'lu'
    }
    else if ((ballX <= 30 && ballX >= 20) && (ballY >= user1Y && ballY <= user1Y + 100)) {
        velocity = velocity + 0.3
        direction === 'ld' ? direction = 'rd' : direction = 'ru'
    }
    else if ((ballX >= 870 && ballX <= 880) && (ballY >= user2Y && ballY <= user2Y + 100)) {
        velocity = velocity + 0.3
        direction === 'rd' ? direction = 'ld' : direction = 'lu'
    }
    else if (ballX >= 890) {
        color = 'red'
        direction = 'nop'
        points1 += 1
        ballX = ballX - 5
    }
    else if (ballX <= 10) {
        color = 'red'
        direction = 'nop'
        points2 += 1
        ballX = ballX + 5
    }
}
function drawUser1() {
    ctx.fillStyle = 'white';
    ctx.fillRect(10, user1Y, 10, 100);
}
function drawUser2() {
    ctx.fillStyle = 'white';
    ctx.fillRect(880, user2Y, 10, 100);
}
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode === 38) {
        // up arrow
        moveUser2 = 'up'
    }
    else if (e.keyCode === 40) {
        // down arrow
        moveUser2 = 'down'
    }
    else if (e.keyCode === 87) {
        // left arrow
        moveUser1 = 'up'
    }
    else if (e.keyCode === 83) {
        // right arrow
        moveUser1 = 'down'
    }
}
requestAnimationFrame(drawGame)