import { gsap } from "gsap";
import { GSDevTools } from "gsap/GSDevTools";

import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, GSDevTools);

const progressLine = document.querySelector(".progress-line");
const counterContainer = document.querySelector(".counter");
const progressCounter = document.querySelector(".progress-value");
const splashScreen = document.querySelector(".splash-screen");

ScrollSmoother.create({
  smooth: 1.4,
  effects: true,
});

let shouldAnimateWrapper = true;
const counter = { value: 0 };

// Create a master timeline
const masterTL = gsap.timeline({
  onUpdate: updateProgress,
});

// Step 1: Counter animation
masterTL.to(counter, {
  value: 100,
  duration: 6,
  ease: "circ.out",
});

// Step 2: Hide splash screen
masterTL.add(hideSplashScreen);

// Attach GSDevTools to the master timeline
// GSDevTools.create({
//   animation: masterTL,
//   minimal: false, // show all controls
// });

function updateProgress() {
  progressLine.style.width = `${counter.value}%`;
  progressCounter.textContent = Math.round(counter.value);
}

function hideSplashScreen() {
  const tl = gsap.timeline();
  const elementsToHide = [coolAnimation, progressLine, counterContainer];

  tl.to(elementsToHide, {
    opacity: "0",
    duration: 0.3,
  }).to(splashScreen, {
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

  return tl; // Return timeline so it plays in masterTL
}

// ==================
// Slider animation
// ==================
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

const logo = document.querySelector(".logo");
const nav = document.querySelector(".nav");
const cta = document.querySelector(".cta");

const mainTitle = document.querySelector(".main-title");
const heroText = document.querySelector(".hero-text");
const heroButton = document.querySelector(".hero-button");

const canvasWrapper = document.querySelector(".canvas-wrapper");

// Create a timeline for hero section elements
const heroTL = gsap.timeline({ paused: true });

heroTL
  .from(logo, { opacity: 0, y: -30, duration: 0.6, ease: "power2.out" })
  .from(nav, { opacity: 0, y: -30, duration: 0.6, ease: "power2.out" }, "-=0.4")
  .from(cta, { opacity: 0, y: -30, duration: 0.6, ease: "power2.out" }, "-=0.4")
  .from(
    mainTitle,
    { opacity: 0, y: 40, duration: 0.7, ease: "power2.out" },
    "-=0.3"
  )
  .from(
    heroText,
    { opacity: 0, y: 40, duration: 0.7, ease: "power2.out" },
    "-=0.5"
  )
  .from(
    heroButton,
    { opacity: 0, scale: 0.8, duration: 0.5, ease: "back.out(1.7)" },
    "-=0.4"
  )
  .from(
    canvasWrapper,
    { opacity: 0, duration: 0.7, ease: "power2.out" },
    "-=0.5"
  );

// Play the timeline after splash screen animation completes
masterTL.add(() => heroTL.play());
