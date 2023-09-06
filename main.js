import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { onPointerClick } from './src/events';
import loadCities from './src/models';

export let objects = [];
export let cities = []
// scene setup
export const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
export const scene = new THREE.Scene();

//current positoning given the 3d model subject to change.
camera.position.z = 14;
camera.position.y = 1.25;

// background color
scene.background = new THREE.Color('#FFEECC');

// lighting 
const amlight = new THREE.AmbientLight(0x404041); // soft white light, ambient light
const hemlight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1); // hemisphere light
scene.add(amlight);
scene.add(hemlight);

// render set up
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);// append to dom~<3

const controls = new OrbitControls(camera, renderer.domElement);

document.addEventListener('mousedown', onPointerClick);

function render() {
    controls.update()
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    render()
}

loadCities() // how i had to sepperate the 3d models from main.js
animate(); //gotta call animate to have it loop properly.
