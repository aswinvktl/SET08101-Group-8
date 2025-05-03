window.storyLines = [
  "Long ago, cradled in the misty mountains and ancient glens, there lay the hidden valley of Bruhaven.",
  "A place sung of in old tales, where the wind carried magic, and the hills held secrets older than memory.",
  "In this mystic land, life moved gently, echoing the breeze through the glens.",
  "The people of Bruhaven lived with full hearts and open arms—sharing bread, laughter, and stories beneath starry skies.",
  "Their days were simple, but rich in every manner.",
  "What truly made Bruhaven enchanting was a potion unlike any other, born of the valley's magical soil and crafted with care.",
  "Glowing like the spring sun, fizzing with ancient power, they called it Iron Brew.",
  "It was more than a drink. It was joy in a cup. The spark that fueled their adventures."
];

window.backgroundMap = {
  0: "../images/Bruhaven.jpg",
  2: "../images/village.jpg",
  3: "../images/starryNight.jpg",
  5: "../images/theLiquid.jpg",
  6: "../images/ironBrewing.jpg"
};

// === AUDIO ===
const bgMusic = new Howl({ src: ['../audio/celticVillage.mp3'], loop: true, volume: 0.4 });
const clickSound = new Howl({ src: ['../audio/mouseClick.wav'], volume: 0.6 });

if (sessionStorage.getItem("soundOn") === null) sessionStorage.setItem("soundOn", "true");
let isSoundOn = sessionStorage.getItem("soundOn") === "true";

// === DOM ELEMENTS ===
const typewriterEl = document.getElementById("typewriter");
const choicesEl = document.querySelector(".choices");
const backgroundEl = document.querySelector(".background");
const nextButton = document.getElementById("next");
const backButton = document.getElementById("goBack");

let currentLine = 0;
const storyLines = window.storyLines;
const backgroundMap = window.backgroundMap;

window.addEventListener("DOMContentLoaded", () => {
  if (isSoundOn) {
    const id = bgMusic.play();
    if (!bgMusic.playing(id)) document.body.addEventListener("click", tryPlayOnce, { once: true });
  }

  updateParagraphs();

  nextButton.addEventListener("click", () => {
    if (currentLine < storyLines.length - 1) currentLine++;
    else choicesEl.classList.add("show");
    updateParagraphs();
    playClick();
  });

  backButton.addEventListener("click", () => {
    if (currentLine > 0) currentLine--;
    choicesEl.classList.remove("show");
    updateParagraphs();
    playClick();
  });

  const toggleBtn = document.createElement("button");
  toggleBtn.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
  toggleBtn.className = "scroll-btn";
  toggleBtn.style.position = "fixed";
  toggleBtn.style.top = "1rem";
  toggleBtn.style.right = "1rem";
  toggleBtn.style.zIndex = "1000";
  toggleBtn.addEventListener("click", () => {
    isSoundOn = !isSoundOn;
    sessionStorage.setItem("soundOn", isSoundOn.toString());
    toggleBtn.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
    isSoundOn ? bgMusic.play() : Howler.stop();
  });
  document.body.appendChild(toggleBtn);
});

function tryPlayOnce() {
  if (isSoundOn) bgMusic.play();
}

function playClick() {
  if (isSoundOn) clickSound.play();
}

function updateParagraphs() {
  typewriterEl.innerHTML = "";

  const prev = storyLines[currentLine - 1];
  const current = storyLines[currentLine];
  const next = storyLines[currentLine + 1];

  if (prev) addLine(prev, 'dimmed');
  addLine(current, 'active');
  if (next) addLine(next, 'dimmed');

  updateBackground(currentLine);
}

function addLine(text, className) {
  const p = document.createElement("p");
  p.textContent = text;
  p.className = className;
  typewriterEl.appendChild(p);
}

function updateBackground(index) {
  const keys = Object.keys(backgroundMap).map(Number).sort((a, b) => b - a);
  let img = null;
  for (let k of keys) {
    if (index >= k) {
      img = backgroundMap[k];
      break;
    }
  }
  if (img) backgroundEl.style.backgroundImage = `url('${img}')`;
}
