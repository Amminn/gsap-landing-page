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
  smooth: 0.9,
  effects: true,
});

let shouldAnimateWrapper = true;

// An object to animate a value from 0 to 100
const counter = { value: 0 };

// Clean GSAP counter animation with progress bar
gsap.to(counter, {
  value: 100,
  // duration: 6,
  duration: 0.1,
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
  tl.to(elementsToHide, {
    opacity: "0",
    duration: 0.1,
    // duration: 0.3,
  }).to(splashScreen, {
    height: "0",
    y: "-100%",
    duration: 1,
    // duration: 0.1,
    ease: "power2.inOut",
    onComplete: () => {
      shouldAnimateWrapper = false;
      gsap.killTweensOf(ySlider);
      gsap.killTweensOf(coolAnimation);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      heroAnimation();
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

const logo = document.querySelector(".logo");
const nav = document.querySelector(".nav");
const navLinks = nav.querySelectorAll("li");
const cta = document.querySelector(".cta");

const mainTitle = document.querySelector(".main-title");
const heroText = document.querySelector(".hero-text");
const heroButton = document.querySelector(".hero-button");

const canvasWrapper = document.querySelector(".canvas-wrapper");
console.log(navLinks);
// Create a timeline for hero section elements
// const heroTL = gsap.timeline({ paused: true });
function heroAnimation() {
  console.log("Hero animation started");
  const heroTL = gsap.timeline();
  heroTL
    .fromTo(
      logo,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    )
    .fromTo(
      navLinks,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.1, // needs to be here
      },
      "-=0.3"
    )
    .fromTo(
      cta,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(
      mainTitle,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(
      heroText,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(
      heroButton,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.4"
    )
    .fromTo(
      canvasWrapper,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" },
      "-=0.3"
    );
}

gsap.registerPlugin(ScrollTrigger);

// Select all sections you want to animate
gsap.utils.toArray(".section").forEach((section) => {
  gsap.from(section, {
    opacity: 0,
    y: 50, // slide up slightly
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%", // when section top reaches 80% of viewport
      toggleActions: "play none none reverse",
    },
  });
});
