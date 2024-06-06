import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import img1 from "/imgs/Screenshot (8).png"
import img2 from "/imgs/forfigma.png"

import * as CANNON from 'cannon-es'
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
const ambiantLight = new THREE.AmbientLight(0xffffff,1)
scene.add(ambiantLight)

const controls = new OrbitControls( perspectiveCamera, renderer.domElement );
perspectiveCamera.position.z =5
perspectiveCamera.position.y = 5
controls.update();

// const box = new THREE.Mesh(
//     new THREE.BoxGeometry(2,2),
//     new THREE.MeshStandardMaterial({color:0x00ffff})
// )
// scene.add(box)
const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
  })
//   the ground
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(5,5),
    new THREE.MeshStandardMaterial({color:0x828079,side: THREE.DoubleSide})
)
// the ground body
const groundBody  = new CANNON.Body({
    shape:new CANNON.Plane(),
    // mass:10
    type:CANNON.Body.STATIC
    
})
world.addBody(groundBody)
groundBody.quaternion.setFromEuler(-0.5*Math.PI,0,0)
// bind the threejs object to the cannonjs body
scene.add(ground)
// create a box and add it to the scene with physic body
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1,1),
    new THREE.MeshStandardMaterial({
        color:0xff00ff
    })
)
scene.add(box)
const boxBody = new CANNON.Body({
    shape:new CANNON.Box(new CANNON.Vec3(0.5,0.5)),
    mass:10
})
boxBody.position.y = 5
world.addBody(boxBody)
function animate() {
    
	requestAnimationFrame( animate );
    world.fixedStep()
    controls.update();
    ground.position.copy(groundBody.position)
    ground.quaternion.copy(groundBody.quaternion)
    // box body
    box.position.copy(boxBody.position)
    box.quaternion.copy(boxBody.quaternion)
	renderer.render( scene, perspectiveCamera );
}

animate();
// https://pmndrs.github.io/cannon-es/docs/