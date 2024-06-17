import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from "dat.gui"

class BasicWorldDemo {
    // mising part:
    // I did not add the textures
  constructor() {
    this._Initialize();
  }
  _Initialize() {
    // debug
    this._gui = new dat.GUI()
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
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
    this._camera.position.z = 70

    this._scene = new THREE.Scene();

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

// ===============================



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
  
      this._RAF();
    });
  }
}


let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new BasicWorldDemo();
});