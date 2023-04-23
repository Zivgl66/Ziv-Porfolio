import * as THREE from "three";

//Utils
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";
import assets from "./Utils/assets";

//Class
import Preloader from "./Preloader.js";
import Camera from "./Camera.js";
import Theme from "./Theme.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Controls from "./World/Controls.js";

export default class ThreeModel {
  static instance;
  constructor(canvas) {
    if (ThreeModel.instance) {
      return ThreeModel.instance;
    }
    ThreeModel.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.theme = new Theme();
    this.world = new World();
    this.preloader = new Preloader();
    this.preloader.on("enablecontrols", () => {
      this.controls = new Controls();
    });

    this.time.on("update", () => {
      this.update();
    });
    this.sizes.on("resize", () => {
      this.resize();
    });
  }

  resize() {
    this.camera.resize();
    this.world.resize();
    this.renderer.resize();
  }
  update() {
    this.preloader.update() ;
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }
}
