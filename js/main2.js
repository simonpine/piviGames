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

const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})
var radius
var height
let geometry = new THREE.BoxGeometry()
let cube = new THREE.Mesh(geometry, material)
cube.material.color.setHex(255255255)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}
renderer.setClearColor(0x000000, 0)

function render() {
    renderer.render(scene, camera)
}
setInterval(() => {
    cube.rotation.x += 0.001
    cube.rotation.y += 0.003
    camera.lookAt(cube.position)
    renderer.render(scene, camera)
}, 1000 / 60)
scene.add(cube)
let x = 1
// setInterval(() => {
//     scene.clear()
//     if (x === 1) {
//         radius = 0.3;
//         height = 0.8;
//         geometry = new THREE.CylinderGeometry(1, radius, height, 4, 1)
//         cube = new THREE.Mesh(geometry, material)
//         x++
//     }
//     else if (x === 2) {
//         radius = 0.8;
//         height = 1.2;
//         geometry = new THREE.CylinderGeometry(0, radius, height, 4, 1)
//         cube = new THREE.Mesh(geometry, material)
//         x++
//     }
//     else {
//         geometry = new THREE.BoxGeometry()
//         cube = new THREE.Mesh(geometry, material)
//         x = 1
//     }
//     scene.add(cube)
// }, 5000);
render()

snake.addEventListener("mouseover", (event) => {
    scene.clear()
    geometry = new THREE.CylinderGeometry(0.7, 0.5, 0.5, 10)
    cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    body.classList = 'bg snake'
})
snake.addEventListener("mouseout", (event) => {
    body.classList = 'bg'
})
flapy.addEventListener("mouseover", (event) => {
    scene.clear()
    geometry = new THREE.ConeGeometry(0.6, 0.9, 10)
    cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    body.classList = 'bg bird'
})
flapy.addEventListener("mouseout", (event) => {
    body.classList = 'bg'
})
space.addEventListener("mouseover", (event) => {
    scene.clear()
    geometry = new THREE.TorusGeometry(0.6, 0.2, 5, 20)
    cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    body.classList = 'bg space'
})
space.addEventListener("mouseout", (event) => {
    body.classList = 'bg'
})
pong.addEventListener("mouseover", (event) => {
    scene.clear()
    geometry = new THREE.SphereGeometry(0.6, 10, 5);
    cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    body.classList = 'bg pong'
})
pong.addEventListener("mouseout", (event) => {
    body.classList = 'bg'
})
pac.addEventListener("mouseover", (event) => {
    scene.clear()
    geometry = new THREE.SphereGeometry(0.6, 10, 2);
    cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    body.classList = 'bg pac'

})
pac.addEventListener("mouseout", (event) => {
    body.classList = 'bg'
})
te.addEventListener("mouseover", (event) => {
    scene.clear()
    geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 100, 3);
    cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    body.classList = 'bg te'
})
te.addEventListener("mouseout", (event) => {
    body.classList = 'bg'
})