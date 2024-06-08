import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import img1 from "/imgs/Screenshot (8).png"
import img2 from "/imgs/forfigma.png"



// loaders
// const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth,innerHeight)
renderer.setClearColor(0xffffff)

document.body.appendChild(renderer.domElement)

const perspectiveCamera = new THREE.PerspectiveCamera(75,innerWidth / innerHeight,0.1,100)
const scene = new THREE.Scene()

const controls = new OrbitControls( perspectiveCamera, renderer.domElement );
perspectiveCamera.position.z =5
perspectiveCamera.position.y = 5
controls.update();

// scene.add(plane)
const box = new THREE.Mesh(
    new THREE.BoxGeometry(2,2),
    new THREE.MeshStandardMaterial({color:0x00ffff})
)
scene.add(box)
const ambiateLight = new THREE.AmbientLight(0xffffff,0.5)
scene.add(ambiateLight)
function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, perspectiveCamera );
}

animate();
