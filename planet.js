import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// init
const textureLoader =new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()


const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth,innerHeight)
document.body.appendChild(renderer.domElement)

const perspectiveCamera =  new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000)
const scene = new THREE.Scene()
const control = new OrbitControls(perspectiveCamera,renderer.domElement)
scene.background = cubeTextureLoader.setPath("/imgs/").load(
   [ "stars.jpg",
    "stars.jpg",
    "stars.jpg",
    "stars.jpg",
    "stars.jpg",
    "stars.jpg",]
)

perspectiveCamera.position.set(-2,5,5)
control.update()
// test box
const sun = new THREE.Mesh(
    new THREE.SphereGeometry(0.7),
    new THREE.MeshBasicMaterial({color:"0xFF0000",map:textureLoader.load("/imgs/sun.jpg")})
)
scene.add(sun)

// ambiant light look at the light later
const ambiateLight = new THREE.AmbientLight(0x333333,1)
scene.add(ambiateLight)
//  const pointLight =new THREE.PointLight( 0xffffff, 1, 100 );
// //  pointLight.position.y = 5
//  const pointlightHelper = new THREE.PointLightHelper(pointLight)
//  scene.add(pointlightHelper)
//  scene.add(pointLight)





 const createPlanet = function(radius,xPosition,texture,ring){
    const obj = new THREE.Object3D()
    const planete = new THREE.Mesh(
        new THREE.SphereGeometry(radius),
        new THREE.MeshBasicMaterial({
           
            map:textureLoader.load(texture)
        })
     )
     planete.position.x = xPosition
     obj.add(planete)
     scene.add(obj)
     if(ring){
        const planeteRing = new THREE.Mesh(
           new THREE.RingGeometry( ring.innerRing, ring.outerRing, ring.secment ),
           new THREE.MeshStandardMaterial( { map:textureLoader.load(ring.texture), side: THREE.DoubleSide } )
        )
        planete.add(planeteRing)
        planeteRing.rotation.x= 5
     }
     return {obj,planete}
 }
 const venus = createPlanet(0.2,2,"/imgs/venus.jpg")
 const earth = createPlanet(0.4,4,"/imgs/earth.jpg")
 const jupiter = createPlanet(0.5,5,"/imgs/jupiter.jpg",{innerRing:0.2,outerRing:0.8,secment:30,texture:"/imgs/jupiter.jpg"})
 const uranus = createPlanet(0.7,10,"/imgs/uranus.jpg",{innerRing:0.2,outerRing:1,secment:30,texture:"/imgs/uranus ring.png"})
function animate(){
    requestAnimationFrame(animate)
    // obj rotation
    sun.rotateY(0.005)
    venus.obj.rotateY(0.01)
    earth.obj.rotateY(0.008)
    jupiter.obj.rotateY(0.005)
    uranus.obj.rotateY(0.007)
   
    // planete rotation
    venus.planete.rotateY(0.01)
    earth.planete.rotateY(0.01)
    jupiter.planete.rotateY(0.01)
    uranus.planete.rotateY(0.005)
    renderer.render(scene,perspectiveCamera)
}
animate()