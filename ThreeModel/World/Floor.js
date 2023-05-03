import * as THREE from "three";
import ThreeModel from "../ThreeModel";

export default class Floor {
  constructor() {
    this.threeModel = new ThreeModel();
    this.scene = this.threeModel.scene;
    this.setFloor();
  }
  setFloor() {
    this.geometry = new THREE.PlaneGeometry(150, 150);
    this.material = new THREE.MeshStandardMaterial({
      color: 0x23523c,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.plane.rotation.x = -Math.PI / 2;
    this.plane.position.y = -1.3;
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);
  }

  resize() {}

  update() {}
}
