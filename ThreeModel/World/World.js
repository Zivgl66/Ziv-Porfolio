import * as THREE from "three";
import EventEmitter from "events";

import ThreeModel from "../ThreeModel";
import Character from "./Character.js";
import Floor from "./Floor.js";
import Environment from "./Environment.js";

export default class World extends EventEmitter {
  constructor() {
    super();
    this.threeModel = new ThreeModel();
    this.sizes = this.threeModel.sizes;
    this.scene = this.threeModel.scene;
    this.canvas = this.threeModel.canvas;
    this.camera = this.threeModel.camera;
    this.resources = this.threeModel.resources;
    this.theme = this.threeModel.theme;

    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.floor = new Floor();
      this.character = new Character();
      this.emit("worldready");
    });

    this.theme.on("switch", (theme) => {
      this.switchTheme(theme);
    });
  }

  switchTheme(theme) {
    if (this.environment) {
      this.environment.switchTheme(theme);
    }
  }

  resize() {}

  update() {
    if (this.character) {
      this.character.update();
    }
    if (this.controls) {
      this.controls.update();
    }
  }
}
