import { gsap } from "gsap";

const ySlider = document.querySelector(".y-slider");
const coolAnimation = document.querySelector(".cool-animation");

coolAnimation.style.height = `${ySlider.querySelector("span").offsetHeight}px`;

function animateSlider() {
  const sliderSpanHeight = ySlider.querySelector("span").offsetHeight;

  gsap.to(ySlider, {
    y: -sliderSpanHeight,
    duration: 1,
    ease: "power2.inOut",
    delay: 0.2,
    onComplete: () => {
      const firstSpan = ySlider.querySelector("span");
      ySlider.appendChild(firstSpan);
      gsap.set(ySlider, { y: 0 });
      animateSlider(); // Continue the animation loop
    },
  });
}

animateSlider();

let resizeTimeout;
window.addEventListener("resize", () => {
  coolAnimation.style.height = `${
    ySlider.querySelector("span").offsetHeight
  }px`;
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    console.log("Window resized, next animation cycle will use new height.");
  }, 100); // Debounce the resize event
});
