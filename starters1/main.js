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
// scene.background = textureLoader.load(img2)
// scene.background = cubeTextureLoader.load(
// 	[
// 	img2,
// 	img2,
// 	img2,
// 	img2,
// 	img2,
// 	img2]
// )
// there is a problem with image sizes
// scene.background = new THREE.CubeTextureLoader()
// 	.setPath( '/imgs/' )
// 	.load( [
// 				'try.jpg',
// 				'try.jpg',
// 				'try.jpg',
// 				'try.jpg',
// 				'try.jpg',
// 				'try.jpg'
			
// 			] );
const controls = new OrbitControls( perspectiveCamera, renderer.domElement );
perspectiveCamera.position.z =5
perspectiveCamera.position.y = 5
// perspectiveCamera.lookAt(0,0,0)
controls.update();
scene.fog = new THREE.Fog(0xcccccc, 10, 15)
const plane = new THREE.Mesh(
	new THREE.PlaneGeometry(5,5,20,20),
	new THREE.MeshStandardMaterial({color:0xffffff,side:THREE.DoubleSide})
)
plane.rotation.x = -0.5 * Math.PI
scene.add(plane)
const ambiateLight = new THREE.AmbientLight(0xffffff,0.5)
scene.add(ambiateLight)
function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, perspectiveCamera );
}

animate();
// learn vectors,[vector2,vector3]
// learn about objects,[Object2d,object3d]