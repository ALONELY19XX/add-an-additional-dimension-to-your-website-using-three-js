import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvas = document.getElementById('render-target')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 4
scene.add(camera)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
const pointLight = new THREE.PointLight(0xffffff, 0.8, 100)
pointLight.position.set(1, 5, 10)
pointLight.rotateX(45)

scene.add(ambientLight, pointLight)

const createTextGeometry = (text, font) => {
   const textGeometry = new TextGeometry(text, {
      font,
      size: 0.5,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4,
   })
   textGeometry.computeBoundingBox()
   textGeometry.center()
   return textGeometry
}

const fontLoader = new FontLoader()

fontLoader.load('fonts/helvetiker_bold.typeface.json', function (font) {
   const textGeometry1 = createTextGeometry('I', font)
   const textGeometry2 = createTextGeometry('Three.js', font)
   const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.5,
      roughness: 0.5,
   })
   const text1 = new THREE.Mesh(textGeometry1, material)
   const text2 = new THREE.Mesh(textGeometry2, material)
   text1.position.y = 1.2
   text2.position.y = -1.3
   scene.add(text1, text2)
})

const gltfLoader = new GLTFLoader()
let model
gltfLoader.load('/Heart.gltf', (gltf) => {
   model = gltf.scene
   model.rotation.y = Math.PI * 0.5
   model.scale.set(0.4, 0.4, 0.4)
   scene.add(gltf.scene)
})

const renderer = new THREE.WebGLRenderer({ canvas })
console.log(window.innerHeight)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

window.addEventListener('resize', () => {
   camera.aspect = window.innerWidth / window.innerHeight
   camera.updateProjectionMatrix()
   renderer.setSize(window.innerWidth, window.innerHeight)
   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const clock = new THREE.Clock()

const update = () => {
   controls.update()

   if (model) {
      const elapsedTime = clock.getElapsedTime()
      model.rotation.y = 0.4 * elapsedTime
      model.position.y = Math.sin(elapsedTime) * 0.1
   }

   renderer.render(scene, camera)
   window.requestAnimationFrame(update)
}

update()
