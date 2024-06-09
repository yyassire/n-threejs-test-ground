import * as THREE from "three"

class BasicWorldDemo {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this.distance = 5
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
      alpha:true
    });
    this._threejs.setPixelRatio(Math.min(window.devicePixelRatio,2));
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this._threejs.domElement);

    window.addEventListener('resize', () => {
      this._OnWindowResize();
    }, false);
    window.addEventListener("dblclick",()=>{
     this._OnDblclick()
    })
    window.addEventListener("scroll",()=>{
        this._onScroll()
    })
    const fov = 60;
    const aspect = innerWidth / innerHeight;
    const near = 0.1;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.z = 5

    this._scene = new THREE.Scene();


   let light = new THREE.AmbientLight(0xffffff,1);
    this._scene.add(light);
  this.box = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshStandardMaterial({color:0xffff55})
   )
  this.box2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshStandardMaterial({color:0xffff55})
   )
   this.box2.position.y = -this.distance *2
   this.box2.position.x = 1
   this.box.position.x = 1

this.cone = new THREE.Mesh(new THREE.ConeGeometry( 1, 2, 3 ),new THREE.MeshStandardMaterial({color:0xff5f55}))
this.cone.position.y = -this.distance
this.cone.position.x = 2

//    clock
this.clock = new THREE.Clock()
   this._scene.add(this.box,this.box2,this.cone)
   this.scrollY = window.scrollY
    this._RAF();
  }
  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
    this._threejs.setPixelRatio(Math.min(window.devicePixelRatio,2));
  }
  _OnDblclick(){
    if(!document.fullscreenElement){
      this._threejs.domElement.requestFullscreen()
    }else{
      document.exitFullscreen()
    }
  }
  _onScroll(){
    this.scrollY = window.scrollY
    // console.log(this.scrollY)
  }
// animation
  _RAF() {
    requestAnimationFrame(() => {
      this._threejs.render(this._scene, this._camera);
      const elapsedTim = this.clock.getElapsedTime()
      this.box.rotation.x = elapsedTim *0.1
      this.box.rotation.y = elapsedTim *0.3
      this.cone.rotation.x = elapsedTim *0.1
      this.cone.rotation.y = elapsedTim *0.3
    //   scroll
    this._camera.position.y  = - this.scrollY /(innerHeight / 2) * this.distance *2
     
      this._RAF();
    });
  }
}


let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new BasicWorldDemo();
});