import * as THREE from "three";

import ThreeModel from "./ThreeModel";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  constructor() {
    this.threeModel = new ThreeModel();
    this.sizes = this.threeModel.sizes;
    this.scene = this.threeModel.scene;
    this.canvas = this.threeModel.canvas;

    this.createOrthographicCamera();
    this.setOrbitControls();
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 1.8,
      -this.sizes.frustrum / 2,
      -20,
      20
    );
    this.orthographicCamera.position.y = 1;
    this.orthographicCamera.position.z = 7;
    this.orthographicCamera.rotation.x = -Math.PI / 4;
    this.orthographicCamera.receiveShadow = true;
    this.orthographicCamera.scale.set(1.6, 1.6, 1.6);

    const size = 20;
    const divisions = 20;
  }
  setOrbitControls() {
    this.controls = new OrbitControls(this.orthographicCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;
  }
  resize() {
    // updating orthographic on resize
    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.top = this.sizes.frustrum / 2;
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
