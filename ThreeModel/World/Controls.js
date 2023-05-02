import * as THREE from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { ScrollToPlugin } from "gsap/all";
import ThreeModel from "../ThreeModel";
import ASScroll from "@ashthornton/asscroll";
import CardCarousel from "../Utils/Carousel";

export default class Controls {
  constructor() {
    this.threeModel = new ThreeModel();
    this.scene = this.threeModel.scene;
    this.sizes = this.threeModel.sizes;
    this.device = this.sizes.device;
    this.resources = this.threeModel.resources;
    this.time = this.threeModel.time;
    this.camera = this.threeModel.camera;
    this.characterWave = this.threeModel.world.character.characterWave;
    this.characterThanks = this.threeModel.world.character.character;
    this.characterRun = this.threeModel.world.character.characterRun;
    this.characterSit = this.threeModel.world.character.characterSit;
    this.floor = this.threeModel.world.floor.plane;
    this.secondColor = new THREE.Color("#f7e092");
    this.thirdColor = new THREE.Color("#EAB9B4");
    this.forthColor = new THREE.Color("#C9E1ED");
    this.currentSection = 1;
    GSAP.registerPlugin(ScrollTrigger, ScrollToPlugin);
    if (this.device === "mobile") {
      this.characterRun.position.set(1, -0.5, 3.2);
      this.characterSit.position.set(0.5, -0.1, 3.2);
    }

    //cards carousel
    const cardsContainer = document.querySelector(".card-carousel");
    const carousel = new CardCarousel(cardsContainer);

    document.querySelector(".page").style.overflow = "visible";
    document.querySelector(".page-wrapper").setAttribute("asscroll", "");

    //buttons event listeners
    document.querySelector(".carousel-prev").addEventListener("click", () => {
      document.querySelector(".carousel-prev").className =
        "carousel-prev bounceLeft";
      setTimeout(() => {
        document.querySelector(".carousel-prev").classList.remove("bounceLeft");
      }, 500);
    });
    document.querySelector(".carousel-next").addEventListener("click", () => {
      document.querySelector(".carousel-next").className =
        "carousel-next bounceRight";
      setTimeout(() => {
        document
          .querySelector(".carousel-next")
          .classList.remove("bounceRight");
      }, 500);
    });
    //end buttons

    this.scrollTo();
    this.setSmoothScroll();
    window.addEventListener("wheel", this.setScrollTriger());
  }

  scrollTo() {
    document
      .querySelector(".arrow-svg-wrapper-up")
      .addEventListener("click", () => {
        GSAP.to(window, {
          duration: 1,
          scrollTo: { y: ".section-first", offsetY: 70 },
        });
      });
  }

  setupASScroll() {
    const asscroll = new ASScroll({
      ease: 0.09,
      disableRaf: true,
    });

    GSAP.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          ".gsap-marker-start, .gsap-marker-end, [asscroll]"
        ),
      });
    });
    return asscroll;
  }

  //     Set smooth scroll
  setSmoothScroll() {
    this.asscroll = this.setupASScroll();
  }

  setScrollTriger() {
    ScrollTrigger.matchMedia({
      // Desktop
      "(min-width: 399px) ": () => {
        this.firstTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "+=200px",
            scrub: 0.5,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        })
          .to(this.characterThanks.scale, {
            x: 0,
            y: 0,
            z: 0,
          })
          .to(".arrow-svg-wrapper", {
            opacity: 0,
          })
          .to(this.characterRun.scale, {
            x: 0,
            y: 0,
            z: 0,
          })
          .to(this.characterSit.scale, {
            x: 0,
            y: 0,
            z: 0,
          })
          .to(this.characterWave.scale, {
            x: 0,
            y: 0,
            z: 0,
          });

        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".section-second",
            start: "-250px",
            end: "bottom bottom",
            scrub: 3,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        });
        this.secondMoveTimeline
          .to(this.floor.material.color, 1, {
            r: 0.111111,
            g: 0.222222,
            b: 0.333333,
          })
          .to(".title2-word1", {
            opacity: 1,
            transform: "translateX(0)",
            stagger: 1,
            ease: "steps.in(3)",
          })
          .to(".title2-word2", {
            opacity: 1,
            transform: "translateX(0)",
            stagger: 1.2,
            ease: "steps.in(3)",
          })
          .to(".title2-word3", {
            opacity: 1,
            transform: "translateX(0)",
            stagger: 1.3,
            ease: "steps.in(3)",
          })
          .to(".title2-word4", {
            opacity: 1,
            transform: "translateX(0)",
            stagger: 1.4,
            ease: "steps.in(3)",
          })
          .to(".summary", {
            opacity: 1,
            transform: "translateX(0)",
            stagger: 1.5,
            ease: "power.in(1)",
          })
          .to(".educational-skills", {
            opacity: 1,
            transform: "translateX(0)",
            stagger: 1.5,
            ease: "power.in(1)",
          });

        this.characterThanksEnterTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".section-second",
            start: "-=250px center",
            end: "bottom bottom",
            scrub: 0.2,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        }).to(this.characterThanks.scale, {
          x: 1.3,
          y: 1.3,
          z: 1.3,
          stagger: 0.5,
          ease: "steps.in(3)",
        });

        this.characterThanksExitTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".section-third",
            start: "-=500px center",
            end: "-=200px bottom",
            scrub: 0.2,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        }).to(this.characterThanks.scale, {
          x: 0,
          y: 0,
          z: 0,
          stagger: 2,
          ease: "steps.in(1)",
        });

        this.thirdTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".section-third",
            start: "-=200px center",
            end: "+=300px top",
            scrub: 0.5,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        })
          .to(this.floor.material.color, 1, {
            r: 0.811111,
            g: 0.522222,
            b: 0.733333,
          })
          .to(".title3", {
            opacity: 1,
            transform: "translateX(0)",
            stagger: 1,
            ease: "sine.in(1)",
          })
          .to(".card-carousel", {
            opacity: 1,
            transform: "translateX(0)",
            stagger: 1,
            ease: "sine.in(1)",
          });

        this.characterRunEnterTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".section-third",
            start: "-=200px center",
            end: "+=300px top",
            scrub: 0,
            stagger: 1,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        }).to(this.characterRun.scale, {
          x: 0.5,
          y: 0.5,
          z: 0.5,
          ease: "circ.in",
        });

        this.characterRunExitTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".section-third",
            start: "bottom bottom",
            end: "bottom +10px",
            scrub: 0.2,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        }).to(this.characterRun.scale, {
          x: 0,
          y: 0,
          z: 0,
        });

        this.forthTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".section-forth",
            start: "-=200px center",
            end: "+=300px top",
            scrub: 0.2,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        })
          .to(this.floor.material.color, 1, {
            r: 0.911111,
            g: 0.422222,
            b: 0.333333,
          })
          .to(".title4", {
            opacity: 1,
            transform: "translateX(0)",
            // stagger: 1,
            duration: 5,
            ease: "slow(1.2, 1.5, true)",
          })
          .to(".link1", {
            opacity: 1,
            transform: "translateY(0)",
            stagger: 2,
            ease: "power.in(1.2)",
          })
          .to(".link2", {
            opacity: 1,
            transform: "translateY(0)",
            stagger: 2,
            ease: "power.in(1.2)",
          })
          .to(".link3", {
            opacity: 1,
            transform: "translateY(0)",
            stagger: 2,
            ease: "power.in(1.2)",
          })
          .to(".link4", {
            opacity: 1,
            transform: "translateY(0)",
            stagger: 2,
            ease: "power.in(1.2)",
          })
          .to(this.characterSit.scale, {
            x: 1,
            y: 1,
            z: 1,
          });
      },

      //  Mobile (Small Screen)

      "(max-width: 399px) ": () => {
        this.firstTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "-=100px",
            scrub: 0.5,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        })
          .to(this.characterThanks.scale, {
            x: 0,
            y: 0,
            z: 0,
          })
          .to(".arrow-svg-wrapper", {
            opacity: 0,
          })
          .to(this.characterRun.scale, {
            x: 0,
            y: 0,
            z: 0,
          })
          .to(this.characterSit.scale, {
            x: 0,
            y: 0,
            z: 0,
          })
          .to(this.characterWave.scale, {
            x: 0,
            y: 0,
            z: 0,
          });

        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".section-second",
            start: "-150px",
            end: "bottom bottom",
            scrub: 3,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        });
        this.secondMoveTimeline
          .to(this.floor.material.color, 1, {
            r: 0.111111,
            g: 0.222222,
            b: 0.333333,
          })
          .to(".title2-word1", {
            opacity: 1,
            transform: "translateX(0)",
            stagger: 1,
            ease: "steps.in(3)",
          })
          .to(".title2-word2", {
            opacity: 1,
            transform: "translateX(0)",
            stagger: 1.2,
            ease: "steps.in(3)",
          })
          .to(".title2-word3", {
            opacity: 1,
            transform: "translateX(0)",
            stagger: 1.3,
            ease: "steps.in(3)",
          })
          .to(".title2-word4", {
            opacity: 1,
            transform: "translateX(0)",
            stagger: 1.4,
            ease: "steps.in(3)",
          })
          .to(".summary", {
            opacity: 1,
            transform: "translateX(0)",
            stagger: 1.5,
            ease: "power.in(1)",
          })
          .to(".educational-skills", {
            opacity: 1,
            transform: "translateX(0)",
            stagger: 1.5,
            ease: "power.in(1)",
          });

        this.characterThanksEnterTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".section-second",
            start: "top center",
            end: "bottom bottom",
            scrub: 0.2,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        }).to(this.characterThanks.scale, {
          x: 0.8,
          y: 0.8,
          z: 0.8,
          stagger: 0.5,
          ease: "steps.in(3)",
        });

        this.characterThanksExitTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".section-third",
            start: "-=50px center",
            end: "-=150px bottom",
            scrub: 0.2,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        }).to(this.characterThanks.scale, {
          x: 0,
          y: 0,
          z: 0,
          stagger: 2,
          ease: "steps.in(1)",
        });

        this.thirdTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".section-third",
            start: "-=100px center",
            end: "+=100px top",
            scrub: 0.5,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        })
          .to(this.floor.material.color, 1, {
            r: 0.811111,
            g: 0.522222,
            b: 0.733333,
          })
          .to(".title3", {
            opacity: 1,
            transform: "translateX(0)",
            stagger: 1,
            ease: "sine.in(1)",
          })
          .to(".card-carousel", {
            opacity: 1,
            transform: "translateX(0)",
            stagger: 1,
            ease: "sine.in(1)",
          });

        this.characterRunEnterTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".section-third",
            start: "top center",
            end: "bottom bottom",
            scrub: 0.2,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        }).to(this.characterRun.scale, {
          x: 0.8,
          y: 0.8,
          z: 0.8,
        });

        this.characterRunExitTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".section-forth",
            start: "-=50px center",
            end: "-=150px bottom",
            scrub: 0.2,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        }).to(this.characterRun.scale, {
          x: 0,
          y: 0,
          z: 0,
        });

        this.forthTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".section-forth",
            start: "-=100px center",
            end: "+=100px top",
            scrub: 0.2,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        })
          .to(this.floor.material.color, 1, {
            r: 0.911111,
            g: 0.422222,
            b: 0.333333,
          })
          .to(".title4", {
            opacity: 1,
            transform: "translateX(0)",
            duration: 5,
            ease: "slow(1.2, 1.5, true)",
          })
          .to(".link1", {
            opacity: 1,
            transform: "translateY(0)",
            stagger: 2,
            ease: "power.in(1.2)",
          })
          .to(".link2", {
            opacity: 1,
            transform: "translateY(0)",
            stagger: 2,
            ease: "power.in(1.2)",
          })
          .to(".link3", {
            opacity: 1,
            transform: "translateY(0)",
            stagger: 2,
            ease: "power.in(1.2)",
          })
          .to(".link4", {
            opacity: 1,
            transform: "translateY(0)",
            stagger: 2,
            ease: "power.in(1.2)",
          })
          .to(this.characterSit.scale, {
            x: 0.8,
            y: 0.8,
            z: 0.8,
          });
      },
    });
  }

  resize() {}

  update() {}
}
