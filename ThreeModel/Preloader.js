import EventEmitter from "events";
import ThreeModel from "./ThreeModel";
import GSAP from "gsap";
import convertSpan from "./Utils/convertDivsToSpans.js";

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.threeModel = new ThreeModel();
    this.scene = this.threeModel.scene;
    this.sizes = this.threeModel.sizes;
    this.resources = this.threeModel.resources;
    this.camera = this.threeModel.camera;
    this.world = this.threeModel.world;
    this.device = this.sizes.device;

    this.sizes.on("switchdevice", (device) => {
      this.device = device;
    });

    this.world.on("worldready", () => {
      this.setAssets();
      this.playIntro();
    });
  }
  setAssets() {
    convertSpan(document.querySelector(".intro-text"));
    this.characterWave = this.threeModel.world.character.characterWave;
    this.characterRun = this.threeModel.world.character.characterRun;
    this.characterSit = this.threeModel.world.character.characterSit;
    this.character = this.threeModel.world.character.character;
    this.character.scale.set(0, 0, 0);
    this.characterWave.scale.set(0, 0, 0);
    this.characterRun.scale.set(0, 0, 0);
    this.characterSit.scale.set(0, 0, 0);
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();
      this.timeline.set(".animate-this", { y: 0, yPercent: 100 });
      this.timeline
        .to(".preloader", {
          opacity: 0,
          delay: 1,
          onComplete: () => {
            document.querySelector(".preloader").classList.add("hidden");
          },
        })
        .to(".intro-text .animate-this", {
          yPercent: 0,
          stagger: 0.1,
          ease: "back.out(1.8)",
        })
        .to(
          ".arrow-svg-wrapper",
          {
            opacity: 1,
          },
          "toggles"
        )
        .to(
          ".toggle-bar",
          {
            opacity: 1,
            onComplete: resolve,
          },
          "toggles"
        );
    });
  }

  secondIntro() {
    if (this.device === "mobile") {
      //  Change the Opening animation in case of mobile device

      this.characterWave.position.set(0, 0.8, 3);
      return new Promise((resolve) => {
        this.secondTimeline = new GSAP.timeline();
        this.secondTimeline
          .to(
            ".intro-text .animate-this",
            {
              yPercent: 100,
              stagger: 0.05,
              ease: "back.in(1.8)",
            },
            "fadeout"
          )
          .to(
            ".arrow-svg-wrapper",
            {
              opacity: 0,
            },
            "fadeout"
          )
          .to(".firstLine", {
            opacity: 1,
            transform: "translateX(0) translateY(0)",
            stagger: 0.07,
            ease: "back.out(1.8)",
          })
          .to(".secondLine", {
            opacity: 1,
            transform: "translateX(0) translateY(0)",
            stagger: 0.07,
            ease: "back.out(1.8)",
          })
          .to(".title-sub", {
            opacity: 1,
            transform: "translateX(0) translateY(0)",
            stagger: 0.01,
            ease: "back.out(1.8)",
            onComplete: resolve,
          })
          .to(this.characterWave.scale, {
            x: 0.8,
            y: 0.8,
            z: 0.8,
          })
          .to(".arrow-svg-wrapper", {
            opacity: 1,
            onComplete: resolve,
          });
      });
    } else {
      return new Promise((resolve) => {
        this.secondTimeline = new GSAP.timeline();
        this.secondTimeline
          .to(
            ".intro-text .animate-this",
            {
              yPercent: 100,
              stagger: 0.05,
              ease: "back.in(1.8)",
            },
            "fadeout"
          )
          .to(
            ".arrow-svg-wrapper",
            {
              opacity: 0,
            },
            "fadeout"
          )
          .to(".firstLine", {
            opacity: 1,
            transform: "translateX(0) translateY(0)",
            stagger: 0.07,
            ease: "back.out(1.8)",
          })
          .to(".secondLine", {
            opacity: 1,
            transform: "translateX(0) translateY(0)",
            stagger: 0.07,
            ease: "back.out(1.8)",
          })
          .to(".title-sub", {
            opacity: 1,
            transform: "translateX(0) translateY(0)",
            stagger: 0.01,
            ease: "back.out(1.8)",
            onComplete: resolve,
          })
          .to(this.characterWave.scale, {
            x: 1.3,
            y: 1.3,
            z: 1.3,
          })
          .to(".arrow-svg-wrapper", {
            opacity: 1,
            onComplete: resolve,
          });
      });
    }
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  onTouch(e) {
    this.initalY = e.touches[0].clientY;
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let difference = this.initalY - currentY;
    if (difference > 0) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
    this.initalY = null;
  }

  removeEventListeners() {
    window.removeEventListener("wheel", this.scrollOnceEvent);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.touchMove);
  }

  async playIntro() {
    await this.firstIntro();
    this.moveFlag = true;
    this.scrollOnceEvent = this.onScroll.bind(this);
    this.touchStart = this.onTouch.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.touchMove);
  }

  async playSecondIntro() {
    this.moveFlag = false;
    this.scaleFlag = true;
    await this.secondIntro();
    this.scaleFlag = false;
    this.emit("enablecontrols");
  }

  //   move() {
  //     if (this.device === "desktop") {
  //       this.room.position.set(-1, 0, 0);
  //     } else {
  //       this.room.position.set(0, 0, -1);
  //     }
  //   }

  scale() {
    if (this.device === "desktop") {
      this.character.scale.set(1.3, 1.3, 1.3);
    } else if (this.device === "tablet") {
      this.character.scale.set(1.3, 1.3, 1.3);
    } else if (this.device === "mobile") {
      this.character.scale.set(0.8, 0.8, 0.8);
    }
  }

  update() {
    if (this.moveFlag) this.move();
    if (this.scaleFlag) this.scale();
  }
}
