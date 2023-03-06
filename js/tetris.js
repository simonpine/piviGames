let canvas = document.querySelector("#tetris");
const startButton = document.getElementById("startTetris");
let scoreboard = document.querySelector("h2");
let ctx = canvas.getContext("2d");
document.onkeydown = checkKey;
const fps = 30
let x = 0
let y = 0
const shapes = [
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ],
    [
        [1, 1],
        [1, 1],
    ]
]
let form = shapes[Math.floor(Math.random() * 7)]
const mapCords = []
for (let i = 0; i < 24; i++) {
    const item = []
    for (let x = 0; x < 12; x++) {
        item.push({
            positionX: x * 50,
            positionY: i * 40,
            fill: false
        })
    }
    mapCords.push(item)
}

function drawGame() {
    clear()
    newPosition()
}
function clear() {
    for (let i = 0; i < mapCords.length; i++) {
        for (let j = 0; j < mapCords[i].length; j++) {

            ctx.fillStyle = mapCords[i][j].fill ? "#004b00" : "#CCFFCC";
            ctx.fillRect(j * 25, i * 25, 25, 25);
        }
    }
}
function newRandomForm() {
    form = shapes[Math.floor(Math.random() * 7)]
    // mapCords[0][0].fill = form[0][0] === 1
    // for (let i = 0; i < form.length; i++) {
    //     for (let j = 0; j < form[i].length; j++) {
    //         mapCords[j][i].fill = form[j][i] === 1
    //     }
    // }

}
function newPosition() {
    if (y < 21) y++
    // for (let i = 0; i < form.length; i++) {
    //     for (let j = 0; j < form[i].length; j++) {
    //         mapCords[j][i].fill = false

    //     }
    // }
    mapCords.map(item => {
        item.map(item => {
            return item.fill = false
        })
    })
    for (let i = 0; i < form.length; i++) {
        for (let j = 0; j < form[i].length; j++) {

            mapCords[y + j][x + i].fill = form[j][i] === 1
        }
    }
}
function rotate() {
    for (let i = 0; i < form.length; i++) {
        for (let j = 0; j < form[i].length; j++) {
            // console.log(form[2][0])
            a = [
                [form[2][0], form[1][0], form[0][0]],
                [form[2][1], form[1][1], form[0][1]],
                [form[2][2], form[1][2], form[0][2]]
            ]
            // a[0][0] = form[2][0]
            // a[0][1] = form[1][0]
            // a[0][2] = form[0][0]
            // a[1][0] = form[2][1]
            // // form[1][1] = form[2][0]
            // a[1][2] = form[0][1]
            // a[2][0] = form[2][2]
            // a[2][1] = form[1][2]
            // a[2][2] = form[0][2]
            form = a
        }
    }
}


setInterval(drawGame, 1000 / fps)
startButton.addEventListener('click', () => {
    newRandomForm()
})
function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '38' || e.innerText === 'Up') {
        rotate()
    }
    else if (e.keyCode == '40' || e.innerText === 'Down') {

    }
    else if (e.keyCode == '37' || e.innerText === 'Left') {
        // left arrow
        x -= 1
    }
    else if (e.keyCode == '39' || e.innerText === 'Right') {
        // right arrow
        x += 1
    }
}