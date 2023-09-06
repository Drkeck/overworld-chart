import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { scene, cities, objects } from '../../main'

export default async function loadCities() {
  const loader = new GLTFLoader()
  loader.load('/test.glb', function (gltf) {
    const glb = gltf.scene
    scene.add(glb);
    objects.push(glb)
    cities.push({
      uuid: glb.uuid,
      name: "test"
    })
  }, undefined, function (error) {
    console.error(error);
  })

  loader.load('/waypoint.glb', function (gltf) {
    const glb = gltf.scene
    scene.add(glb)
    glb.position.set(0, 0, -3)
    objects.push(glb)
    cities.push({
      uuid: glb.uuid,
      name: "waypoint"
    })
  }, undefined, function (error) {
    console.log(error);
  })
}