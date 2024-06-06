import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import Stats from 'three/addons/libs/stats.module.js'

const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth,innerHeight)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)
const loader = new GLTFLoader();
const camera = new THREE.PerspectiveCamera(75,innerWidth /  innerHeight,0.1,1000)
camera.position.z = 5
const controls = new OrbitControls(camera,renderer.domElement)
controls.update()
const scene = new THREE.Scene()
scene.background  = new THREE.Color(0x949999)

// const box = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1),
//     new THREE.MeshBasicMaterial({color:0xffffff})

// )
// scene.add(box)
// ===================
// Load a glTF resource
// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );
loader.load(
	// resource URL
	'/models/cat/scene.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );
        console.log(error)

	}
);
// ===================HDRI
const ambiantLight = new THREE.AmbientLight(0xffffff,1)
scene.add(ambiantLight)
const directionalLigt = new THREE.DirectionalLight(0xffffff,5)
directionalLigt.castShadow =true
// create a plane or object3D to receive the shadow
directionalLigt.position.y = 5
directionalLigt.position.x = 2
scene.add(directionalLigt)
const dHelper = new THREE.DirectionalLightHelper(directionalLigt)
scene.add(dHelper)
// stats
const stats = new Stats()
document.body.appendChild(stats.dom)
const animate = function(){
    requestAnimationFrame(animate)
    controls.update();
	stats.update()
    renderer.render(scene,camera)
}

animate()