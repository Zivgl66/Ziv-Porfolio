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
    this.resources = this.threeModel.resources;
    this.time = this.threeModel.time;
    this.camera = this.threeModel.camera;
    this.characterWave = this.threeModel.world.character.characterWave;
    this.characterThanks = this.threeModel.world.character.character;
    GSAP.registerPlugin(ScrollTrigger);
    GSAP.registerPlugin(ScrollToPlugin);

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
    this.setScrollTriger();

    //cards controll
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
  setSmoothScroll() {
    this.asscroll = this.setupASScroll();
  }

  setScrollTriger() {
    ScrollTrigger.matchMedia({
      // Desktop
      "(min-width: 969px) ": () => {
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "+=500px",
            scrub: 0.6,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        })
          .to(this.characterThanks.scale, {
            x: 0,
            y: 0,
            z: 0,
            stagger: 1,
            ease: "steps.in(5)",
          })
          .to(".arrow-svg-wrapper", {
            opacity: 0,
          })
          .to(this.characterWave.scale, {
            x: 0,
            y: 0,
            z: 0,
          })
          .to(this.characterThanks.scale, {
            x: 0,
            y: 0,
            z: 0,
            ease: "sine.out(1)",
          });

        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".section-second",
            start: "-=500px",
            end: "+=100px",
            scrub: 2,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        })
          .to(".title2", {
            opacity: 1,
            transform: "translateX(0)",
            stagger: 1,
            ease: "sine.in(1)",
          })
          .to(
            ".second-title",
            {
              opacity: 1,
              transform: "translateX(0)",
              stagger: 1,
              ease: "sine.in(1)",
            },
            "section2"
          )
          .to(
            this.characterThanks.scale,
            {
              x: 1.3,
              y: 1.3,
              z: 1.3,
              stagger: 1,
              ease: "steps.in(5)",
            },
            "section2"
          );

        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".section-third",
            start: "-=600px",
            end: "+=300px",
            scrub: 2,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        })
          .to(
            ".title2",
            {
              opacity: 0,
              transform: "translateX(-50%)",
              ease: "sine.out(1)",
            },
            "disappear"
          )
          .to(
            ".second-title",
            {
              opacity: 0,
              transform: "translateX(-50%)",

              ease: "sine.out(1)",
            },
            "disappear"
          )
          .to(
            this.characterThanks.scale,
            {
              x: 0,
              y: 0,
              z: 0,
              ease: "sine.out(1)",
            },
            "disappear"
          )
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

        this.forthMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".section-forth",
            start: "-=500px",
            end: "+=300px",
            scrub: 2,
            invalidateOnRefresh: true,
            immediateRender: false,
          },
        }).to(".title4", {
          opacity: 1,
          transform: "translateX(0)",
          stagger: 1,
          ease: "sine.in(1)",
        });
      },

      //Medium screen -------------------------------------------

      "(min-width: 600px) and (max-width: 968px)": () => {},

      // Mobile  ------------------------------------------------
      "(max-width: 599px)": () => {},

      //All
      all: () => {},
    });
  }

  resize() {}

  update() {}
}
