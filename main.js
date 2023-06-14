import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
// ambient light
const amlight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( amlight );
// hemisphere light
const hemlight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( hemlight );
// render set up
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// append to dom~
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
// 3D model input
loader.load('/test.glb', function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error)
})

// current positoning given the 3d model subject to change.
camera.position.z = 4;
camera.position.y = 1.25;


function animate() {
	requestAnimationFrame( animate );
    scene.rotation.y += 0.01 // cute
	renderer.render( scene, camera );
}
animate();