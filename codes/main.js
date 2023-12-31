// import * as TJS from "./Three JS/build/three.module.js"
import * as TJS from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js"
import { OrbitControls } from "./Three JS/examples/jsm/controls/OrbitControls.js"
import { earth_moon, makeOrbit, planet_earth, planet_jupiter, planet_mars, planet_mercury, planet_saturn, planet_uranus, planet_venus, saturn_ring, spaceTexture, sun, uranus_ring } from "./obj.js"

//Windows height and width
const winH = window.innerHeight
const winW = window.innerWidth

//make scene
const main_scene = new TJS.Scene()

//make camera PerspectiveCamera(fov, aspect ratio, near, far)
const cam = new TJS.PerspectiveCamera(70, winW/winH, 0.1, 100000)

cam.position.setZ(1000)
cam.position.setY(400)
cam.lookAt(0, 0, 0)

//make objects
const mercuryObj = new TJS.Object3D()
mercuryObj.add(planet_mercury)

const venusObj = new TJS.Object3D()
venusObj.add(planet_venus)

const earthObj = new TJS.Object3D()
earthObj.add(planet_earth)
const moonObj = new TJS.Object3D()
moonObj.add(earth_moon)
planet_earth.add(moonObj)

const marsObj = new TJS.Object3D()
marsObj.add(planet_mars)

const jupiterObj = new TJS.Object3D()
jupiterObj.add(planet_jupiter)

const saturnObj = new TJS.Object3D()
saturnObj.add(planet_saturn, saturn_ring)

const uranusObj = new TJS.Object3D()
uranusObj.add(planet_uranus, uranus_ring)

// const mercury_orbit = makeOrbit(249.6,250.4)
// main_scene.add(mercury_orbit)

//set planet position
saturn_ring.rotateX(Math.PI * 0.4)

//set background texture
main_scene.background = spaceTexture
main_scene.add(sun, mercuryObj, venusObj, earthObj, marsObj, jupiterObj, saturnObj, uranusObj)

//set sun light
const pointLight = new TJS.PointLight(0xffffff, 2, 3000)
main_scene.add(pointLight)

//make renderer
const renderer = new TJS.WebGLRenderer()
renderer.setSize(winW, winH)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)
const orbit = new OrbitControls(cam, renderer.domElement)
orbit.update()

//animate objects
function animate() {
    requestAnimationFrame(animate)

    sun.rotateY(0.0004)

    planet_mercury.rotateY(0.0004)
    mercuryObj.rotateY(0.004)  

    planet_venus.rotateY(0.0002)
    venusObj.rotateY(0.0015)

    planet_earth.rotateY(0.007)
    earthObj.rotateY(0.001)
    moonObj.rotateY(0.009)

    planet_mars.rotateY(0.008)
    marsObj.rotateY(0.0008)

    planet_jupiter.rotateY(0.0004)
    jupiterObj.rotateY(0.0002)

    planet_saturn.rotateY(0.0038)
    saturnObj.rotateY(0.00009)

    planet_uranus.rotateY(0.003)
    uranusObj.rotateY(0.00004)

    // composer.render()

    renderer.render(main_scene, cam)
}

animate()

