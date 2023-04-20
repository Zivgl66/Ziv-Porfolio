import "./style.css";
import ThreeModel from "./ThreeModel/ThreeModel.js";

const threeModel = new ThreeModel(document.querySelector(".threeModel-canvas"));

const handleMouseMove = (e) => {
  const { currentTarget: target } = e;
  const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
};
let page = document.querySelector(".page");

page.onmousemove = (e) => {
  if (document.body.classList.contains("dark-theme")) handleMouseMove(e);
  else{
    
  }
};
