// === AUDIO SETUP ===
const bgMusic = new Howl({
  src: ['../audio/dream.wav'],
  loop: true,
  volume: 0.45
});

const clickSound = new Howl({
  src: ['../audio/mouseClick.wav'],
  volume: 0.3
});

if (sessionStorage.getItem("soundOn") === null) {
  sessionStorage.setItem("soundOn", "true");
}
let isSoundOn = sessionStorage.getItem("soundOn") === "true";

// === DOM ELEMENTS ===
const typewriterEl = document.getElementById("typewriter");
const choicesEl = document.getElementById("choices");
const backgroundEl = document.querySelector(".background");
const backButton = document.getElementById("goBack");
const nextButton = document.getElementById("goNext");

const storyLines = window.storyLines || [];
const backgroundMap = window.backgroundMap || {};

let currentLine = 0;

window.addEventListener("DOMContentLoaded", () => {
  // MUSIC
  if (isSoundOn) {
    const id = bgMusic.play();
    if (!bgMusic.playing(id)) {
      document.body.addEventListener("click", tryPlayOnce, { once: true });
    }
  }

  setupTopControls();
  showLine(currentLine);

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
      currentLine--;
      showLine(currentLine);
      nextButton.style.display = "inline-block";
      choicesEl.classList.remove("show");
    }
    if (isSoundOn) clickSound.play();
  });

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("click", () => {
      if (isSoundOn) clickSound.play();
    });
  });
});

// === Top Bar Buttons ===
function setupTopControls() {
  const topBar = document.createElement("div");
  topBar.className = "top-bar";

  const soundBtn = createButton(isSoundOn ? "🔊 Sound On" : "🔇 Sound Off");
  soundBtn.addEventListener("click", () => {
    isSoundOn = !isSoundOn;
    sessionStorage.setItem("soundOn", isSoundOn.toString());
    soundBtn.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
    isSoundOn ? bgMusic.play() : Howler.stop();
  });

  const homeBtn = createButton("🏠 Home", "../LochNessHome.html");
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

// === Show Line with Replace ===
function showLine(index) {
  if (!Array.isArray(storyLines) || index >= storyLines.length) return;

  const oldLine = typewriterEl.querySelector(".line");
  if (oldLine) {
    oldLine.classList.remove("slide-in");
    oldLine.classList.add("slide-out");
    setTimeout(() => {
      if (oldLine && oldLine.parentNode) oldLine.remove();
      insertNewLine(index);
    }, 400);
  } else {
    insertNewLine(index);
  }

  updateBackground(index);
}

function insertNewLine(index) {
  const paragraph = document.createElement("p");
  paragraph.classList.add("line", "slide-in");
  paragraph.textContent = storyLines[index];
  typewriterEl.appendChild(paragraph);
  paragraph.scrollIntoView({ behavior: "smooth", block: "end" });
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

  if (imageToUse && backgroundEl) {
    backgroundEl.classList.add("fade");
    setTimeout(() => {
      backgroundEl.style.backgroundImage = `url('${imageToUse}')`;
      backgroundEl.classList.remove("fade");
    }, 500);
  }
}

function tryPlayOnce() {
  if (isSoundOn) bgMusic.play();
}
