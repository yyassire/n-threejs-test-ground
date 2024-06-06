import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(innerWidth,innerHeight)
document.body.appendChild(renderer.domElement)
const camera = new THREE.PerspectiveCamera(75,innerWidth /innerHeight,0.1,1000)
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)
const controls =new OrbitControls(camera,renderer.domElement)
const ambiantLight = new THREE.AmbientLight(0xffffff,0.5)
scene.add(ambiantLight)
camera.position.z = 10
controls.update();
// test
// const axesHelper = new THREE.AxesHelper(5)
// // scene.add(axesHelper)
// scene.add(axesHelper)
// const box = new THREE.Mesh(
//     new THREE.BoxGeometry(2,2),
//     new THREE.MeshStandardMaterial({color:0x22ffff})
// )
// scene.add(box)

loader.load(
	// resource URL
	'/models/Donkey.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        
		scene.add( gltf.scene );
        // console.log(gltf.scene)
        const firstMesh =gltf.scene.getObjectByName("Cube")
        console.log(firstMesh)
        firstMesh.material.color = new THREE.Color(0xff0000) 
		// gltf.animations; // Array<THREE.AnimationClip>
		// gltf.scene; // THREE.Group
		// gltf.scenes; // Array<THREE.Group>
		// gltf.cameras; // Array<THREE.Camera>
	g	// gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

const animate =function(){
    requestAnimationFrame(animate)
    controls.update();
    renderer.render(scene,camera)
}
animate()