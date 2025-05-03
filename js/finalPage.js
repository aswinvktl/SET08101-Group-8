// === AUDIO SETUP ===
const bgMusic = new Howl({
  src: ['../audio/finalPage.wav'],
  loop: true,
  volume: 0.45
});

const clickSound = new Howl({
  src: ['../audio/mouseClick.wav'],
  volume: 0.6
});

// === SOUND STATE PERSISTENCE ===
if (sessionStorage.getItem("soundOn") === null) {
  sessionStorage.setItem("soundOn", "true");
}
let isSoundOn = sessionStorage.getItem("soundOn") === "true";

// === DOM ELEMENTS ===
const typewriterContainer = document.getElementById("typewriter");
const choicesContainer = document.getElementById("choices");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const endMessage = document.getElementById("endMessage");

let currentLineIndex = 0;
const renderedLines = [];

// === INIT ===
window.addEventListener("DOMContentLoaded", () => {
  if (isSoundOn) {
    const id = bgMusic.play();
    if (!bgMusic.playing(id)) {
      document.body.addEventListener("click", tryPlayOnce, { once: true });
    }
  }

  setupTopControls();
  showLine(currentLineIndex);

  nextButton.addEventListener("click", () => {
    handleNext();
    if (isSoundOn) clickSound.play();
  });

  prevButton.addEventListener("click", () => {
    handlePrevious();
    if (isSoundOn) clickSound.play();
  });

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("click", () => {
      if (isSoundOn) clickSound.play();
    });
  });
});

// === AUDIO AUTOPLAY FALLBACK ===
function tryPlayOnce() {
  if (isSoundOn) bgMusic.play();
}

// === TOP CONTROL BAR ===
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

// === TEXT FUNCTIONS ===
function showLine(index) {
  if (!Array.isArray(storyLines) || index >= storyLines.length) return;

  const paragraph = document.createElement("p");
  paragraph.classList.add("line");
  paragraph.textContent = storyLines[index];
  typewriterContainer.appendChild(paragraph);
  renderedLines.push(paragraph);

  requestAnimationFrame(() => {
    paragraph.classList.add("show");
    paragraph.scrollIntoView({ behavior: 'smooth', block: 'end' });
  });
}

function hideLastLine() {
  if (renderedLines.length > 0) {
    const lastLine = renderedLines.pop();
    lastLine.remove();
  }
}

// === NAVIGATION ===
function handleNext() {
  if (currentLineIndex < storyLines.length - 1) {
    currentLineIndex++;
    showLine(currentLineIndex);
  } else {
    nextButton.style.display = "none";
    choicesContainer.classList.add("show");
    if (endMessage) endMessage.style.display = "block";
  }
}

function handlePrevious() {
  if (currentLineIndex > 0) {
    hideLastLine();
    currentLineIndex--;
    choicesContainer.classList.remove("show");
    nextButton.style.display = "inline-block";
    if (endMessage) endMessage.style.display = "none";
  }
}
