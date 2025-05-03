const bgMusic = new Howl({
  src: ['../audio/celticVillage.mp3'],
  loop: true,
  volume: 0.4
});

const clickSound = new Howl({
  src: ['../audio/mouseClick.wav'],
  volume: 0.6
});

if (sessionStorage.getItem("soundOn") === null) {
  sessionStorage.setItem("soundOn", "true");
}
let isSoundOn = sessionStorage.getItem("soundOn") === "true";

const typewriterEl = document.getElementById("typewriter");
const choicesEl = document.querySelector(".choices");
const backgroundEl = document.querySelector(".background");
const nextButton = document.getElementById("goNext");
const backButton = document.getElementById("goBack");

const storyLines = window.storyLines;
const backgroundMap = window.backgroundMap;

let currentLine = 0;

window.addEventListener("DOMContentLoaded", () => {
  if (isSoundOn) {
    const id = bgMusic.play();
    if (!bgMusic.playing(id)) {
      document.body.addEventListener("click", tryPlayOnce, { once: true });
    }
  }

  showLine(currentLine);

  nextButton.addEventListener("click", () => {
    if (currentLine < storyLines.length - 1) {
      currentLine++;
      showLine(currentLine);
    } else {
      choicesEl.classList.add("show");
      nextButton.disabled = true;
    }
    clickSound.play();
  });

  backButton.addEventListener("click", () => {
    if (currentLine > 0) {
      currentLine--;
      showLine(currentLine);
      choicesEl.classList.remove("show");
      nextButton.disabled = false;
    }
    clickSound.play();
  });
});

function tryPlayOnce() {
  if (isSoundOn) bgMusic.play();
}

function showLine(index) {
  if (!Array.isArray(storyLines)) return;

  typewriterEl.innerHTML = "";

  const paragraph = document.createElement("p");
  paragraph.textContent = storyLines[index];
  typewriterEl.appendChild(paragraph);

  updateBackground(index);
}

function updateBackground(index) {
  if (!backgroundMap || !backgroundEl) return;

  const keys = Object.keys(backgroundMap).map(Number).sort((a, b) => b - a);
  let imageToUse = null;

  for (let key of keys) {
    if (index >= key) {
      imageToUse = backgroundMap[key];
      break;
    }
  }

  if (imageToUse) {
    backgroundEl.style.backgroundImage = `url('${imageToUse}')`;
  }
}
