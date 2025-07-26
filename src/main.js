import { gsap } from "gsap";

const ySlider = document.querySelector(".y-slider");
const sliderSpanHeight = ySlider.querySelector("span").offsetHeight;

function animateSlider() {
  gsap.to(ySlider, {
    y: -sliderSpanHeight,
    duration: 1.1,
    ease: "power2.inOut",
    delay: 0.3,
    onComplete: () => {
      const firstSpan = ySlider.querySelector("span");
      ySlider.appendChild(firstSpan);
      gsap.set(ySlider, { y: 0 });
      animateSlider();
    },
  });
}

animateSlider();
