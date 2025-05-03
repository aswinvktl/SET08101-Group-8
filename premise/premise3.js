// === AUDIO SETUP ===
const ambientFire = new Howl({
  src: ['../audio/fire.mp3'],
  loop: true,
  volume: 0.45
});

const mainMusic = new Howl({
  src: ['../audio/danger.wav'],
  loop: true,
  volume: 0.5
});

const clickSound = new Howl({
  src: ['../audio/mouseClick.wav'],
  volume: 0.6
});

// === Persistent Sound Preference ===
if (sessionStorage.getItem("soundOn") === null) {
  sessionStorage.setItem("soundOn", "true");
}
let isSoundOn = sessionStorage.getItem("soundOn") === "true";

// === DOM Elements ===
const typewriterEl = document.getElementById("typewriter");
const choicesEl = document.querySelector(".choices");
const backgroundEl = document.querySelector(".background");
const backButton = document.getElementById("goBack");
const skipButton = document.getElementById("skip");

let currentLine = 0;
let renderedLines = [];
let isSkipping = false;

window.addEventListener("DOMContentLoaded", () => {
  // MUSIC
  if (isSoundOn) {
    const musicId = mainMusic.play();
    ambientFire.play();

    if (!mainMusic.playing(musicId)) {
      document.body.addEventListener("click", tryPlayOnce, { once: true });
    }
  }

  showLine(currentLine);

  document.body.addEventListener("click", (e) => {
    if (isSkipping || e.target.closest("button")) return;

    currentLine++;
    if (currentLine < storyLines.length) {
      showLine(currentLine);
    } else {
      choicesEl.classList.add("show");
    }
  });

  backButton?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentLine > 0) {
      hideLastLine();
      currentLine--;
      updateBackground(currentLine);
      choicesEl.classList.remove("show");
    }
    if (isSoundOn) clickSound.play();
  });

  skipButton?.addEventListener("click", (e) => {
    e.stopPropagation();
    isSkipping = true;
    for (let i = currentLine; i < storyLines.length; i++) {
      showLine(i);
    }
    currentLine = storyLines.length;
    choicesEl.classList.add("show");

    if (isSoundOn) clickSound.play();
  });

  // CLICK SOUND
  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("click", () => {
      if (isSoundOn) clickSound.play();
    });
  });

  // MUTE TOGGLE
  const toggleBtn = document.createElement("button");
  toggleBtn.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
  toggleBtn.className = "nav-button";
  toggleBtn.style.position = "fixed";
  toggleBtn.style.top = "1rem";
  toggleBtn.style.right = "1rem";
  toggleBtn.style.zIndex = "1000";

  toggleBtn.addEventListener("click", () => {
    isSoundOn = !isSoundOn;
    sessionStorage.setItem("soundOn", isSoundOn.toString());
    toggleBtn.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";

    if (isSoundOn) {
      mainMusic.play();
      ambientFire.play();
    } else {
      Howler.stop();
    }
  });

  document.body.appendChild(toggleBtn);
});

function tryPlayOnce() {
  if (isSoundOn) {
    mainMusic.play();
    ambientFire.play();
  }
}

// === Show Line ===
function showLine(index) {
  if (!Array.isArray(storyLines) || index >= storyLines.length) return;

  const paragraph = document.createElement("p");
  paragraph.classList.add("line");
  paragraph.textContent = storyLines[index];
  typewriterEl.appendChild(paragraph);
  renderedLines.push(paragraph);

  requestAnimationFrame(() => {
    paragraph.classList.add("show");
    paragraph.scrollIntoView({ behavior: 'smooth', block: 'end' });
  });

  updateBackground(index);
}

// === Remove Last Line ===
function hideLastLine() {
  if (renderedLines.length > 0) {
    const lastLine = renderedLines.pop();
    lastLine.remove();
  }
}

// === Background Transition ===
function updateBackground(index) {
  if (typeof backgroundMap === "undefined" || !backgroundEl) return;

  const keys = Object.keys(backgroundMap).map(Number).sort((a, b) => b - a);
  let imageToUse = null;

  for (let key of keys) {
    if (index >= key) {
      imageToUse = backgroundMap[key];
      break;
    }
  }

  if (imageToUse) {
    backgroundEl.classList.add("fade");
    setTimeout(() => {
      backgroundEl.style.backgroundImage = `url('${imageToUse}')`;
      backgroundEl.classList.remove("fade");
    }, 500);
  }
}
