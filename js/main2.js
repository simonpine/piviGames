import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.125.0/examples/jsm/controls/OrbitControls.js';
const snake = document.querySelector('#snakeButton')
const flapy = document.querySelector('#flapyButton')
const space = document.querySelector('#spaceButton')
const pong = document.querySelector('#pongButton')
const pac = document.querySelector('#pacButton')
const te = document.querySelector('#teButton')
const body = document.querySelector('body')

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    85,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', render)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
cube.material.color.setHex( 255255255 )
scene.add(cube)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}
renderer.setClearColor(0x000000, 0 )

function render() {
    renderer.render(scene, camera)
}
setInterval(() => {
    cube.rotation.x += 0.001
    cube.rotation.y += 0.003
    camera.lookAt(cube.position)
    renderer.render(scene, camera)
}, 1000 / 60)

//animate()
render()

snake.addEventListener("mouseover", (event) => {
    body.classList = 'bg snake'
})
snake.addEventListener("mouseout", (event) => {
    body.classList = 'bg'
})
flapy.addEventListener("mouseover", (event) => {
    body.classList = 'bg bird'
})
flapy.addEventListener("mouseout", (event) => {
    body.classList = 'bg'
})
space.addEventListener("mouseover", (event) => {
    body.classList = 'bg space'
})
space.addEventListener("mouseout", (event) => {
    body.classList = 'bg'
})
pong.addEventListener("mouseover", (event) => {
    body.classList = 'bg pong'
})
pong.addEventListener("mouseout", (event) => {
    body.classList = 'bg'
})
pac.addEventListener("mouseover", (event) => {
    body.classList = 'bg pac'
})
pac.addEventListener("mouseout", (event) => {
    body.classList = 'bg'
})
te.addEventListener("mouseover", (event) => {
    body.classList = 'bg te'
})
te.addEventListener("mouseout", (event) => {
    body.classList = 'bg'
})