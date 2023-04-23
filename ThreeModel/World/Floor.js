import * as THREE from "three";
import ThreeModel from "../ThreeModel";

export default class Floor {
  constructor() {
    this.threeModel = new ThreeModel();
    this.scene = this.threeModel.scene;
    this.setFloor();
  }
  setFloor() {
    this.geometry = new THREE.PlaneGeometry(50, 50);
    this.material = new THREE.MeshStandardMaterial({
      // color: 0x6DAEB0,
      // color: 0xf7e092,
      // color: 0xffe120,
      // color: 0x011222cd,
      color: 0x23523c,
      // color: 0xfdf2c9,
      // side: THREE.DoubleSide,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.plane.rotation.x = -Math.PI / 2;
    this.plane.position.y = -1;
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);
  }

  resize() {}

  update() {}
}
