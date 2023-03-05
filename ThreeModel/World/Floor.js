import * as THREE from "three";
import ThreeModel from "../ThreeModel";

export default class Floor {
  constructor() {
    this.threeModel = new ThreeModel();
    this.scene = this.threeModel.scene;

    this.setFloor();
    // this.setCircles();
  }
  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      // color: 0x6DAEB0,
      // color: 0xf7e092,
      color: 0xc7c22e,
      // color: 0xfdf2c9,
      side: THREE.DoubleSide,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.plane.rotation.x = -Math.PI / 2;
    this.plane.position.y = -1;
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);
  }

  // setCircles() {
  //   const geometry = new THREE.CircleGeometry(5, 64);
  //   const material = new THREE.MeshStandardMaterial({ color: 0xfdf2c9 });
  //   this.circleFirst = new THREE.Mesh(geometry, material);
  //   this.circleFirst.position.y = -0.23;
  //   this.circleFirst.position.x = 1;
  //   this.circleFirst.scale.set(0, 0, 0);
  //   this.circleFirst.rotation.x = -Math.PI / 2;
  //   this.circleFirst.receiveShadow = true;
  //   this.scene.add(this.circleFirst);
  // }

  resize() {}

  update() {}
}
