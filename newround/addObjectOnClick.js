import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from "dat.gui"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as CANNON from "cannon-es"

class BasicWorldDemo {
    // mising part:
    // I did not add the textures
  constructor() {
    this._Initialize();
  }
  _Initialize() {
    // debug
    this.meshAndBodys = []
    this._gui = new dat.GUI()
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.clock = new THREE.Clock()
    // physics
    this.world = new CANNON.World({
        gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
      })
    // this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(Math.min(window.devicePixelRatio,2));
    this._threejs.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this._threejs.domElement);

    window.addEventListener('resize', () => {
      this._OnWindowResize();
    }, false);

    const fov = 60;
    const aspect = innerWidth / innerHeight;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.z = 10
    this._camera.position.y= 10


    this._scene = new THREE.Scene();
    this._scene.background = new THREE.Color(0x808080)
    // =============
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(8,8),
        new THREE.MeshStandardMaterial()
    )
    ground.rotation.x = - Math.PI /2
    this._scene.add(ground)
    const groundBody = new CANNON.Body({
        type: CANNON.Body.STATIC, 
        shape: new CANNON.Box(new CANNON.Vec3(4,4,0.001)),
        position:ground.position
      })
      groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) 
      this.world.addBody(groundBody)
    // ===============

    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(10, 5, 10);
    light.target.position.set(0, 0, 0);
    // light.castShadow = true;
    this._scene.add(light);

    light = new THREE.AmbientLight(0xffffff,0.5);
    this._scene.add(light);

    this.controls = new OrbitControls(
    this._camera, this._threejs.domElement);
    this.controls.update();
    const interseptors = new THREE.Vector3()
    const planeNormal = new THREE.Vector3()
    const plane = new THREE.Plane()
// add object on mouce click

 const raycaster = new THREE.Raycaster()
 const mouse = new THREE.Vector2()
 
 window.addEventListener("mousemove",(event)=>{
 mouse.x = (event.clientX /innerWidth) *2 -1
 mouse.y = -(event.clientY /innerHeight) *2 +1
 planeNormal.copy(this._camera.position).normalize()
 plane.setFromNormalAndCoplanarPoint(planeNormal,this._scene.position)
 raycaster.setFromCamera(mouse,this._camera)
 raycaster.ray.intersectPlane(plane,interseptors)
 })
 const  sphereGeometry = new THREE.SphereGeometry(0.1)
 const  bruteSphereMaterial = new THREE.MeshStandardMaterial({color:0x0000ff})
window.addEventListener("click",(event)=>{
    const sphereMaterial = bruteSphereMaterial.clone()
  const sphere = new THREE.Mesh(
    sphereGeometry ,
    sphereMaterial
  )
  sphere.material.color= new THREE.Color(0xff0000 *Math.random())
  sphere.position.set(interseptors.x,interseptors.y,interseptors.z)
  this._scene.add(sphere)
  const sphereBody = new CANNON.Body({
    mass:1,
    shape: new CANNON.Sphere(0.1),
    position:sphere.position
  })
  this.world.addBody(sphereBody)
  this.meshAndBodys.push({sphere,sphereBody})
})
    this._RAF();
  }
//////

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
    this._threejs.setPixelRatio(Math.min(window.devicePixelRatio,2));
  }


  _RAF() {
    requestAnimationFrame(() => {
      this._threejs.render(this._scene, this._camera);
      this.controls.update();
     
      this.meshAndBodys.forEach((element)=>{
        element.sphere.position.copy(element.sphereBody.position)
        element.sphere.quaternion.copy(element.sphereBody.quaternion)
      })
      this.world.fixedStep()
      if(this.mixer){
        this.mixer.update(this.clock.getDelta())
      }

      this._RAF();
    });
  }
}


let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new BasicWorldDemo();
});