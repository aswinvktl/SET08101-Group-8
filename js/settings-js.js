// settings-js.js

// === AUDIO SETUP ===
const clickSound = new Howl({
  src: ['../audio/mouseClick.wav'],
  volume: 0.6
});

if (sessionStorage.getItem("soundOn") === null) {
  sessionStorage.setItem("soundOn", "true");
}
let isSoundOn = sessionStorage.getItem("soundOn") === "true";

// === INIT ===
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("click", () => {
      if (isSoundOn) clickSound.play();
    });
  });

  const soundToggle = document.getElementById("sound-toggle");
  if (soundToggle) {
    soundToggle.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
    soundToggle.addEventListener("click", () => {
      isSoundOn = !isSoundOn;
      sessionStorage.setItem("soundOn", isSoundOn.toString());
      soundToggle.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
    });
  }
});
