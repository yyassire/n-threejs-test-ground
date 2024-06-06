import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from "three/examples/jsm/Addons.js";

const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth,innerHeight)
document.body.appendChild(renderer.domElement)

const pCamera = new THREE.PerspectiveCamera(75,innerWidth / innerHeight,0.1,1000)
const controls = new OrbitControls(pCamera,renderer.domElement)
pCamera.position.z = 5
controls.update()
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xa39ea0)

const ambiantLight = new THREE.AmbientLight(0xffffff,0.5)
scene.add(ambiantLight)
// 
const box = new THREE.Mesh(
    new THREE.BoxGeometry(2,2),
    new THREE.MeshStandardMaterial({color:0xff0000})
)
scene.add(box)
const animate = function(){
    requestAnimationFrame(animate)
    renderer.render(scene,pCamera)
}
animate()