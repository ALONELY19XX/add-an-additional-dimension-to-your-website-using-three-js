import './style.css'
import * as THREE from 'three'

const canvas = document.getElementById('render-target')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 4
scene.add(camera)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
const pointLight = new THREE.PointLight(0xffffff, 1, 100)
pointLight.position.set(10, 10, 10)
scene.add(ambientLight, pointLight)

const material = new THREE.MeshStandardMaterial({
   color: 0xff0000,
   metalness: 0.5,
   roughness: 0.5,
})
const geometry = new THREE.BoxGeometry(2, 2, 2, 10, 10, 10)
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
cube.rotation.x = Math.PI * 0.18
cube.rotation.y = Math.PI * 0.25

const renderer = new THREE.WebGLRenderer({ canvas })
console.log(window.innerHeight)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

window.addEventListener('resize', () => {
   camera.aspect = window.innerWidth / window.innerHeight
   camera.updateProjectionMatrix()
   renderer.setSize(window.innerWidth, window.innerHeight)
   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const update = () => {
   renderer.render(scene, camera)
   window.requestAnimationFrame(update)
}

update()
