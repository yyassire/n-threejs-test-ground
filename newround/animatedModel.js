import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from "dat.gui"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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
    this.clock = new THREE.Clock()
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

    this._scene = new THREE.Scene();
    this._scene.background = new THREE.Color(0x808080)

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

// import and animate a 3d model
const gltfLoader = new GLTFLoader();

gltfLoader.load(
	// resource URL
	'/models/labrador_dog/scene.gltf',
	// called when the resource is loaded
	 ( gltf ) =>{

        this._scene.add( gltf.scene );
      

	const animations =	gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
        this.mixer = new THREE.AnimationMixer(gltf.scene)
        animations.forEach(animation => {
            const action = this.mixer.clipAction(animation)
            action.play()
        });
        // for only on individual action


	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened',error );

	}
);

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