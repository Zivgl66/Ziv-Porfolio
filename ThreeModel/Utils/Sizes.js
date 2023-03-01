import EventEmitter from "events";

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.frustrum = 2.5;
    if (this.width > 968) {
      this.device = "desktop";
    } else if (this.width < 969 && this.width > 599) {
      this.device = "tablet";
    } else {
      this.device = "mobile";
    }
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspect = this.width / this.height;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.emit("resize");

      if (this.width > 968 && this.device !== "desktop") {
        this.device = "desktop";
        this.emit("switchdevice", this.device);
      } else if (
        this.width < 969 &&
        this.width > 599 &&
        this.device !== "tablet"
      ) {
        this.device = "tablet";
        this.emit("switchdevice", this.device);
      } else if (this.width < 600 && this.device !== "mobile") {
        this.device = "mobile";
        this.emit("switchdevice", this.device);
      }
    });
  }
}
