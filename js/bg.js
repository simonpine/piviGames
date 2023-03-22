const snake = document.querySelector('#snakeButton')
const flapy = document.querySelector('#flapyButton')
const space = document.querySelector('#spaceButton')
const pong = document.querySelector('#pongButton')
const pac = document.querySelector('#pacButton')
const te = document.querySelector('#teButton')
const bodyBg = document.querySelector('body')

snake.addEventListener("mouseover", (event) => {
    bodyBg.classList = 'bg snake'

})
snake.addEventListener("mouseout", (event) => {
    bodyBg.classList = 'bg'
})
flapy.addEventListener("mouseover", (event) => {
    bodyBg.classList = 'bg bird'
})
flapy.addEventListener("mouseout", (event) => {
    bodyBg.classList = 'bg'
})
space.addEventListener("mouseover", (event) => {
    bodyBg.classList = 'bg space'
})
space.addEventListener("mouseout", (event) => {
    bodyBg.classList = 'bg'
})
pong.addEventListener("mouseover", (event) => {
    bodyBg.classList = 'bg pong'
})
pong.addEventListener("mouseout", (event) => {
    bodyBg.classList = 'bg'
})
pac.addEventListener("mouseover", (event) => {
    bodyBg.classList = 'bg pac'
})
pac.addEventListener("mouseout", (event) => {
    bodyBg.classList = 'bg'
})
te.addEventListener("mouseover", (event) => {
    bodyBg.classList = 'bg te'
})
te.addEventListener("mouseout", (event) => {
    bodyBg.classList = 'bg'
})