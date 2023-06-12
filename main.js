import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

const loader = new GLTFLoader();

loader.load('./public/test.glb', function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error)
})

camera.position.z = 5;


function animate() {
	requestAnimationFrame( animate );
    camera.position.y = 1.92
    camera.position.x = -1
	renderer.render( scene, camera );
}
animate();