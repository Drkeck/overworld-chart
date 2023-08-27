import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const display = document.getElementById("overlay")

let objects = [];
let cities = []
let selected
// scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color('#FFEECC')
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
);

// ambient light
const amlight = new THREE.AmbientLight(0x404041); // soft white light
scene.add(amlight);
// hemisphere light
const hemlight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(hemlight);
// render set up
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// append to dom~<3
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
//  3D model input
loader.load('/test.glb', function (gltf) {
    const glb = gltf.scene
    scene.add(glb);
    objects.push(glb)
    cities.push({
        uuid: glb.uuid,
        name: "test"
    })
}, undefined, function (error) {
    console.error(error);
})

loader.load('/waypoint.glb', function(gltf) {
    const glb = gltf.scene
    scene.add(glb)
    glb.position.set(0,0,3)
    objects.push(glb)
    cities.push({
        uuid: glb.uuid,
        name: "waypoint"
    })
})

function appendSelected(selection) {
    const ui = document.createElement('h1');
    ui.innerText = selection.uuid + " \n " + selection.name
    display.replaceChildren(ui)
}

function findUuid(uuid) {
    const selected = cities.find(city => city.uuid === uuid)
    appendSelected(selected)
}

const controls = new OrbitControls(camera, renderer.domElement);

function onPointerClick(event) {
    event.preventDefault();
    if (selected) {
        selected.material.color.setHex( 0xffffff );
    }
    const mouse3D = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5)
    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse3D, camera)
    let intersects = raycaster.intersectObjects( objects )
    if ( intersects.length > 0) {
        selected = intersects[ 0 ].object;
        selected.material.color.setHex( 0xfff700 );
        findUuid(intersects[0].object.parent.uuid)
    } else {
        if (!selected) {
            return
        }
        display.replaceChildren()
        selected = null;
    }
}


document.addEventListener('mousedown', onPointerClick);

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 20, 100);

//current positoning given the 3d model subject to change.
camera.position.z = 4;
camera.position.y = 1.25;

function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    render()
}
animate();
