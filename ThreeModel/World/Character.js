import * as THREE from "three";
import GSAP from "gsap";
import ThreeModel from "../ThreeModel";

export default class Character {
  constructor() {
    this.threeModel = new ThreeModel();
    this.scene = this.threeModel.scene;
    this.resources = this.threeModel.resources;
    this.time = this.threeModel.time;
    this.characterAnimation = this.resources.items.character;
    this.character = this.characterAnimation.scene;
    this.characterWaveAnimation = this.resources.items.characterWave;
    this.characterWave = this.characterWaveAnimation.scene;
    this.characterRunAnimation = this.resources.items.characterRun;
    this.characterRun = this.characterRunAnimation.scene;
    this.characterSitAnimation = this.resources.items.characterSit;
    this.characterSit = this.characterSitAnimation.scene;
    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.setAnimation();
    this.onMouseMove();
  }
  setModel() {
    this.character.castShadow = true;
    this.characterWave.castShadow = true;
    this.characterRun.castShadow = true;
    this.characterSit.castShadow = true;
    this.character.receiveShadow = true;
    this.characterWave.receiveShadow = true;
    this.characterRun.receiveShadow = true;
    this.characterSit.receiveShadow = true;
    this.scene.add(this.character);
    this.scene.add(this.characterWave);
    this.scene.add(this.characterRun);
    this.scene.add(this.characterSit);
    this.character.scale.set(1.3, 1.3, 1.3);
    this.characterWave.scale.set(1.3, 1.3, 1.3);
    this.characterRun.scale.set(0.5, 0.5, 0.5);
    this.characterRun.scale.set(1, 1, 1);
    this.character.position.set(2.2, -0.8, 3.2);
    this.characterWave.position.set(2, 0.2, 3.2);
    this.characterRun.position.set(4.2, 0.2, 3.2);
    this.characterSit.position.set(0, -0.5, 3.2);
    this.characterRun.rotation.y = -1.2;
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.character);
    this.mixerWave = new THREE.AnimationMixer(this.characterWave);
    this.mixerRun = new THREE.AnimationMixer(this.characterRun);
    this.mixerSit = new THREE.AnimationMixer(this.characterSit);
    this.thanks = this.mixer.clipAction(this.characterAnimation.animations[0]);
    this.wave = this.mixerWave.clipAction(
      this.characterWaveAnimation.animations[0]
    );
    this.run = this.mixerRun.clipAction(
      this.characterRunAnimation.animations[0]
    );
    this.sit = this.mixerSit.clipAction(
      this.characterSitAnimation.animations[0]
    );
    this.thanks.play();
    this.wave.play();
    this.run.play();
    this.sit.play();
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.3;
    });
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    this.character.rotation.y = this.lerp.current;
    this.characterWave.rotation.y = this.lerp.current;
    // this.characterRun.rotation.y = this.lerp.current;
    this.characterSit.rotation.y = this.lerp.current;
    this.mixer.update(this.time.delta * 0.0012);
    this.mixerWave.update(this.time.delta * 0.0008);
    this.mixerRun.update(this.time.delta * 0.0017);
    this.mixerSit.update(this.time.delta * 0.0010);
  }
}
