import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class BasicWorldDemo {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._threejs.shadowMap.enabled = true;
    // n
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this._threejs.domElement);

    window.addEventListener('resize', () => {
      this._OnWindowResize();
    }, false);

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(75, 20, 0);

    this._scene = new THREE.Scene();
// light
    // let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    // light.position.set(20, 100, 10);
    // light.target.position.set(0, 0, 0);
    // light.castShadow = true;
    // light.shadow.bias = -0.001;
    // light.shadow.mapSize.width = 2048;
    // light.shadow.mapSize.height = 2048;
    // light.shadow.camera.near = 0.1;
    // light.shadow.camera.far = 500.0;
    // light.shadow.camera.near = 0.5;
    // light.shadow.camera.far = 500.0;
    // light.shadow.camera.left = 100;
    // light.shadow.camera.right = -100;
    // light.shadow.camera.top = 100;
    // light.shadow.camera.bottom = -100;
    // this._scene.add(light);

  let  light = new THREE.AmbientLight(0xffffff);
    this._scene.add(light);

    const controls = new OrbitControls(
      this._camera, this._threejs.domElement);
    controls.target.set(0, 20, 0);
    controls.update();

    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        '/resources/posx.jpg',
        '/resources/negx.jpg',
        '/resources/posy.jpg',
        '/resources/negy.jpg',
        '/resources/posz.jpg',
        '/resources/negz.jpg',
    ]);
    this._scene.background = texture;

    // const plane = new THREE.Mesh(
    //     new THREE.PlaneGeometry(100, 100, 10, 10),
    //     new THREE.MeshStandardMaterial({
    //         color: 0xFFFFFF,
    //         side: THREE.DoubleSide
    //       }));
    // plane.castShadow = false;
    // plane.receiveShadow = true;
    // plane.rotation.x = -Math.PI / 2;
    // this._scene.add(plane);


//   3d model
const Gloader = new GLTFLoader()
// console.log(this._scene)
// Optional: Provide a DRACOLoader instance to decode compressed mesh data
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
// loader.setDRACOLoader( dracoLoader )
Gloader.load(
	// resource URL
	'/models/alien_animal_re-texture-baked/scene.gltf',
	// called when the resource is loaded
 ( gltf )=>{

    this._scene.add( gltf.scene );
    gltf.scene.scale.set(9,9,9)
   console.log(this._scene)
    // console.log(gltf.scene)

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
  }

  _RAF() {
    requestAnimationFrame(() => {
      this._threejs.render(this._scene, this._camera);
      this._RAF();
    });
  }
}


let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new BasicWorldDemo();
});