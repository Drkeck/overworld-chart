// imports
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
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
    console.error(error);
})

const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );
controls.update();

// current positoning given the 3d model subject to change.
camera.position.z = 4;
camera.position.y = 1.25;

function animate() {
	requestAnimationFrame( animate );
    // required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
	renderer.render( scene, camera );
}
animate(); //gotta call animate to have it loop properly.
