// === AUDIO SETUP ===
const bgMusic = new Howl({
  src: ['../audio/loop.wav'],
  loop: true,
  volume: 0.45
});

const clickSound = new Howl({
  src: ['../audio/mouseClick.wav'],
  volume: 0.6
});

if (sessionStorage.getItem("soundOn") === null) {
  sessionStorage.setItem("soundOn", "true");
}
let isSoundOn = sessionStorage.getItem("soundOn") === "true";

// === DOM ELEMENTS ===
const typewriterContainer = document.getElementById("typewriter");
const choicesContainer = document.getElementById("choices");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

let currentLineIndex = 0;

// === INIT ===
window.addEventListener("DOMContentLoaded", () => {
  if (isSoundOn) {
    const id = bgMusic.play();
    if (!bgMusic.playing(id)) {
      document.body.addEventListener("click", tryPlayOnce, { once: true });
    }
  }

  showLine(currentLineIndex);

  nextButton?.addEventListener("click", () => {
    handleNext();
    if (isSoundOn) clickSound.play();
  });

  prevButton?.addEventListener("click", () => {
    handlePrevious();
    if (isSoundOn) clickSound.play();
  });

  [nextButton, prevButton].forEach(btn => {
    btn?.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("click", () => {
      if (isSoundOn) clickSound.play();
    });
  });

  setupTopControls();
});

// === Create and insert the top control buttons (Sound, Home, Settings) ===
function setupTopControls() {
  const topBar = document.createElement("div");
  topBar.className = "top-bar";

  // Sound toggle
  const soundBtn = createButton(isSoundOn ? "🔊 Sound On" : "🔇 Sound Off");
  soundBtn.addEventListener("click", () => {
    isSoundOn = !isSoundOn;
    sessionStorage.setItem("soundOn", isSoundOn.toString());
    soundBtn.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
    isSoundOn ? bgMusic.play() : Howler.stop();
  });

  // Home and Settings
  const homeBtn = createButton("🏠 Home", "../index.html");
  const settingsBtn = createButton("⚙️ Settings", "../settings.html");

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

// === AUDIO AUTOPLAY FALLBACK ===
function tryPlayOnce() {
  if (isSoundOn) bgMusic.play();
}

// === BACKGROUND LOGIC ===
function updateBackground(index) {
  if (typeof backgroundMap === "undefined") return;

  const keys = Object.keys(backgroundMap).map(Number).sort((a, b) => b - a);
  let imageToUse = null;
  for (let key of keys) {
    if (index >= key) {
      imageToUse = backgroundMap[key];
      break;
    }
  }

  const bgDiv = document.querySelector('.background');
  if (bgDiv && imageToUse) {
    bgDiv.style.backgroundImage = `url('${imageToUse}')`;
  }
}

// === TEXT NAVIGATION ===
function showLine(index) {
  if (!Array.isArray(storyLines) || index < 0 || index >= storyLines.length) return;

  typewriterContainer.innerHTML = "";

  const paragraph = document.createElement("p");
  paragraph.textContent = storyLines[index];
  paragraph.classList.add("line");
  typewriterContainer.appendChild(paragraph);

  if (typeof backgroundMap !== "undefined") updateBackground(index);

  requestAnimationFrame(() => {
    paragraph.classList.add("show");
    paragraph.scrollIntoView({ behavior: "smooth", block: "end" });
  });
}

function handleNext() {
  if (currentLineIndex < storyLines.length - 1) {
    currentLineIndex++;
    showLine(currentLineIndex);
  } else {
    const endMessage = document.getElementById("end-message");
    if (endMessage) endMessage.style.display = "block";
    revealChoices();
  }
}

function handlePrevious() {
  if (currentLineIndex > 0) {
    currentLineIndex--;
    showLine(currentLineIndex);
    const endMessage = document.getElementById("end-message");
    if (endMessage) endMessage.style.display = "none";
    hideChoices();
  }
}

function revealChoices() {
  choicesContainer.classList.add("show");
  choicesContainer.style.display = "block";
  nextButton.style.display = "none";
}

function hideChoices() {
  choicesContainer.classList.remove("show");
  setTimeout(() => {
    choicesContainer.style.display = "none";
  }, 300);
  nextButton.style.display = "inline-block";
}
