import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import img1 from "/imgs/Screenshot (8).png"
import img2 from "/imgs/forfigma.png"


const createBox = (x,y,z)=>{
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(.5,0.5,0.5),
        new THREE.MeshBasicMaterial({color:0x00ffff})
    )
    box.position.set(x,y,z)
    scene.add(box)
}
// lo0xaders
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
// const box = new THREE.Mesh(
//     new THREE.BoxGeometry(2,2),
//     new THREE.MeshStandardMaterial({color:0x00ffff})
// )
// scene.add(box)
createBox(0,0,0)
createBox(0,1,0)
createBox(0,2,0)
createBox(0,-1,0)
createBox(1,0,0)
const ambiateLight = new THREE.AmbientLight(0xffffff,0.5)
scene.add(ambiateLight)
// raycaster
const pointer = new THREE.Vector2()
const raycaster = new THREE.Raycaster()
function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}
// window.addEventListener("mousemove",(e)=>{
//     onPointerMove(e) 
//     // update the picking ray with the camera and pointer position
// 	raycaster.setFromCamera( pointer, perspectiveCamera );

// 	// calculate objects intersecting the picking ray
// 	const intersects = raycaster.intersectObjects( scene.children );

// 	for ( let i = 0; i < intersects.length; i ++ ) {

// 		intersects[ i ].object.material.color.set( 0xff0000 );

// 	}
// })
window.addEventListener("click",(e)=>{
   onPointerMove(e)
   raycaster.setFromCamera(pointer,perspectiveCamera)
   createBox(pointer.x,pointer.y,1)
})
function animate() {
    controls.update();
    
	requestAnimationFrame( animate );
	renderer.render( scene, perspectiveCamera );
}

animate();




