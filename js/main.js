
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';
// import backGro from '../img/rm251-aum-01.jpg';
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight) ;
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0x404040)
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5)
directionalLight.position.set(-10,10,10)
light.add(directionalLight)
scene.add(light)
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.name = 'cube'

scene.add(cube);

const orbit = new OrbitControls(camera, renderer.domElement)

camera.position.set(5 , 5  , 5)
orbit.update()






renderer.setClearColor(0x000000, 0 )



setInterval(() => {
    cube.rotation.y += 0.005
    camera.lookAt(cube.position)
    renderer.render(scene, camera)
}, 1000 / 60)
