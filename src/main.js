import { gsap } from "gsap";

const progressLine = document.querySelector(".progress-line");
const counterContainer = document.querySelector(".counter");
const progressCounter = document.querySelector(".progress-value");
const splashScreen = document.querySelector(".splash-screen");

let shouldAnimateWrapper = true;

// An object to animate a value from 0 to 100
const counter = { value: 0 };

// Clean GSAP counter animation with progress bar
gsap.to(counter, {
  value: 100,
  duration: 6,
  ease: "circ.out",
  onUpdate: updateProgress,
  onComplete: hideSplashScreen,
});

function updateProgress() {
  progressLine.style.width = `${counter.value}%`;
  progressCounter.textContent = Math.round(counter.value);
}

function hideSplashScreen() {
  const tl = gsap.timeline();
  const elementsToHide = [coolAnimation, progressLine, counterContainer];
  tl.to(elementsToHide, { opacity: "0", duration: 0.3 }).to(splashScreen, {
    height: "0",
    y: "-100%",
    duration: 1,
    ease: "power2.inOut",
    onComplete: () => {
      shouldAnimateWrapper = false;
      gsap.killTweensOf(ySlider);
      gsap.killTweensOf(coolAnimation);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    },
  });
}

// The rest of your slider animation code can remain as is
const ySlider = document.querySelector(".y-slider");
const coolAnimation = document.querySelector(".cool-animation");

let resizeTimeout;

if (ySlider && coolAnimation) {
  coolAnimation.style.height = `${
    ySlider.querySelector("span").offsetHeight
  }px`;

  function animateSlider() {
    if (!shouldAnimateWrapper) return;
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
        animateSlider();
      },
    });
  }

  animateSlider();

  window.addEventListener("resize", handleResize);
}

function handleResize() {
  coolAnimation.style.height = `${
    ySlider.querySelector("span").offsetHeight
  }px`;
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    console.log("Window resized, next animation cycle will use new height.");
  }, 100);
}
