// === AUDIO SETUP ===
const fireSound = new Howl({
  src: ['../audio/fire.mp3'],
  loop: true,
  volume: 0.35
});

const bgMusic = new Howl({
  src: ['../audio/danger.wav'],
  loop: true,
  volume: 0.45
});

const clickSound = new Howl({
  src: ['../audio/mouseClick.wav'],
  volume: 0.6
});

// === SOUND STATE ===
if (sessionStorage.getItem("soundOn") === null) {
  sessionStorage.setItem("soundOn", "true");
}
let isSoundOn = sessionStorage.getItem("soundOn") === "true";

// === DOM ELEMENTS ===
const typewriterEl = document.getElementById("typewriter");
const choicesEl = document.getElementById("choices");
const backgroundEl = document.querySelector(".background");
const nextButton = document.getElementById("next") || document.getElementById("goNext");
const backButton = document.getElementById("prev") || document.getElementById("goBack");

// === STORY DATA ===
const storyLines = window.storyLines || [];
const backgroundMap = window.backgroundMap || {};
let currentLine = 0;
let renderedLines = [];

window.addEventListener("DOMContentLoaded", () => {
  // Play music
  if (isSoundOn) {
    const id = bgMusic.play();
    fireSound.play();
    if (!bgMusic.playing(id)) {
      document.body.addEventListener("click", tryPlayOnce, { once: true });
    }
  }

  setupTopControls();
  showLine(currentLine);

  // Navigation buttons
  nextButton?.addEventListener("click", () => {
    if (currentLine < storyLines.length - 1) {
      currentLine++;
      showLine(currentLine);
    } else {
      nextButton.style.display = "none";
      choicesEl.classList.add("show");
    }
    if (isSoundOn) clickSound.play();
  });

  backButton?.addEventListener("click", () => {
    if (currentLine > 0) {
      hideLastLine();
      currentLine--;
      updateBackground(currentLine);
      nextButton.style.display = "inline-block";
      choicesEl.classList.remove("show");
    }
    if (isSoundOn) clickSound.play();
  });

  document.querySelectorAll("a, button").forEach(el =>
    el.addEventListener("click", () => {
      if (isSoundOn) clickSound.play();
    })
  );
});

// === TOP BAR ===
function setupTopControls() {
  const topBar = document.createElement("div");
  topBar.className = "top-bar";

  const soundBtn = createButton(isSoundOn ? "🔊 Sound On" : "🔇 Sound Off");
  soundBtn.addEventListener("click", () => {
    isSoundOn = !isSoundOn;
    sessionStorage.setItem("soundOn", isSoundOn.toString());
    soundBtn.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
    isSoundOn ? (bgMusic.play(), fireSound.play()) : Howler.stop();
  });

  const homeBtn = createButton("🏠 Home", "../index.html");
  const settingsBtn = createButton("⚙️ Settings", "../settings/cyoaSettings.html");

  topBar.append(settingsBtn, homeBtn, soundBtn);
  document.body.appendChild(topBar);
}

function createButton(label, href = null) {
  const btn = href ? document.createElement("a") : document.createElement("button");
  btn.className = "choice-button top-control";
  btn.innerText = label;
  if (href) btn.href = href;
  return btn;
}

// === STORY DISPLAY ===
function showLine(index) {
  if (!Array.isArray(storyLines) || index >= storyLines.length) return;

  const paragraph = document.createElement("p");
  paragraph.classList.add("line", "slide-in");
  paragraph.textContent = storyLines[index];
  typewriterEl.appendChild(paragraph);
  renderedLines.push(paragraph);

  requestAnimationFrame(() => {
    paragraph.scrollIntoView({ behavior: 'smooth', block: 'end' });
  });

  updateBackground(index);
}

function hideLastLine() {
  if (renderedLines.length > 0) {
    const lastLine = renderedLines.pop();
    lastLine.remove();
  }
}

function updateBackground(index) {
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

function tryPlayOnce() {
  if (isSoundOn) {
    bgMusic.play();
    fireSound.play();
  }
}
