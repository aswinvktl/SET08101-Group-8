// audio
const clickSound = new Howl({
  src: ['../audio/mouseClick.wav'],
  volume: 0.6
});

if (localStorage.getItem("soundOn") === null) {
  localStorage.setItem("soundOn", "true");
}
let isSoundOn = localStorage.getItem("soundOn") === "true";

// init
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a.choice-button").forEach(el => {
    el.addEventListener("click", () => {
      if (isSoundOn) clickSound.play();
    });
  });

  const soundToggle = document.getElementById("sound-toggle");
  const visualsToggle = document.getElementById("visuals-toggle");
  const motionToggle = document.getElementById("motion-toggle");
  const darkToggle = document.getElementById("darkmode-toggle");
  const contrastToggle = document.getElementById("contrast-toggle");

  if (soundToggle) {
    soundToggle.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
    soundToggle.addEventListener("click", e => {
      e.preventDefault();
      isSoundOn = !isSoundOn;
      localStorage.setItem("soundOn", isSoundOn.toString());
      soundToggle.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
    });
  }

  visualsToggle?.addEventListener("click", e => {
    e.preventDefault();
    const visualsOn = localStorage.getItem("textOnly") !== "true";
    localStorage.setItem("textOnly", (!visualsOn).toString());
    document.body.classList.toggle("text-only", visualsOn);
  });

  motionToggle?.addEventListener("click", e => {
    e.preventDefault();
    const motionOff = localStorage.getItem("animationsOff") === "true";
    localStorage.setItem("animationsOff", (!motionOff).toString());
    document.body.classList.toggle("no-animations", !motionOff);
  });

  darkToggle?.addEventListener("click", e => {
    e.preventDefault();
    const darkMode = localStorage.getItem("darkMode") === "true";
    localStorage.setItem("darkMode", (!darkMode).toString());
    document.body.classList.toggle("dark-mode", !darkMode);
  });

  contrastToggle?.addEventListener("click", e => {
    e.preventDefault();
    const contrast = localStorage.getItem("contrastOn") === "true";
    localStorage.setItem("contrastOn", (!contrast).toString());
    document.body.classList.toggle("high-contrast", !contrast);
  });
});
