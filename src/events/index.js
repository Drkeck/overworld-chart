import * as THREE from 'three';
import { camera, objects, cities } from '../../main';

const display = document.getElementById("overlay") // to build overlay in appendSelected function

// selection needed to be overwritten on "off" clicks or other models
let selected

function appendSelected(selection) {
  const ui = document.createElement('h1');
  ui.innerText = selection.uuid + " \n " + selection.name
  display.replaceChildren(ui)
}

function findUuid(uuid) {
  const selected = cities.find(city => city.uuid === uuid)
  appendSelected(selected)
}

export function onPointerClick(event) {
  event.preventDefault();
  if (selected) {
      selected.material.color.setHex( 0xffffff );
  }
  const mouse3D = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5)
  const raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(mouse3D, camera)
  let intersects = raycaster.intersectObjects( objects )
  if ( intersects.length > 0) {
      selected = intersects[ 0 ].object;
      selected.material.color.setHex( 0xfff700 );
      findUuid(intersects[0].object.parent.uuid)
  } else {
      if (!selected) {
          return
      }
      display.replaceChildren()
      selected = null;
  }
}