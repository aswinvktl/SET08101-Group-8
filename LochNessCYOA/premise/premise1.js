// audio
const birds = new Howl({
  src: ['../audio/chirpingBirds.mp3'],
  loop: true,
  volume: 0.25
});

const bgMusic = new Howl({
  src: ['../audio/celticVillage.mp3'],
  loop: true,
  volume: 0.45
});

const clickSound = new Howl({
  src: ['../audio/mouseClick.wav'],
  volume: 0.2
});

if (sessionStorage.getItem("soundOn") === null) {
  sessionStorage.setItem("soundOn", "true");
}
let isSoundOn = sessionStorage.getItem("soundOn") === "true";

// elements
const typewriterEl = document.getElementById("typewriter");
const choicesEl = document.getElementById("choices");
const nextButton = document.getElementById("goNext");
const backButton = document.getElementById("goBack");
const backgroundEl = document.querySelector(".background");

const storyLines = window.storyLines || [];
const backgroundMap = window.backgroundMap || {};
let currentLine = 0;

// init
window.addEventListener("DOMContentLoaded", () => {
  if (isSoundOn) {
    const id = bgMusic.play();
    birds.play();
    if (!bgMusic.playing(id)) {
      document.body.addEventListener("click", tryPlayOnce, { once: true });
    }
  }

  setupTopControls();
  showLine(currentLine);

  nextButton?.addEventListener("click", () => {
    handleNext();
    if (isSoundOn) clickSound.play();
  });

  backButton?.addEventListener("click", () => {
    handlePrevious();
    if (isSoundOn) clickSound.play();
  });

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("click", () => {
      if (isSoundOn) clickSound.play();
    });
  });
});

// try play fallback
function tryPlayOnce() {
  if (isSoundOn) {
    bgMusic.play();
    birds.play();
  }
}

// top controls
function setupTopControls() {
  const topBar = document.createElement("div");
  topBar.className = "top-bar";

  const soundBtn = createButton(isSoundOn ? "🔊 Sound On" : "🔇 Sound Off");
  soundBtn.addEventListener("click", () => {
    isSoundOn = !isSoundOn;
    sessionStorage.setItem("soundOn", isSoundOn.toString());
    soundBtn.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
    if (isSoundOn) {
      bgMusic.play();
      birds.play();
    } else {
      Howler.stop();
    }
  });

  const homeBtn = createButton("🏠 Home", "../LochNessHome.html");
  const settingsBtn = createButton("⚙️ Settings", "../settings/cyoaSettings.html");

  topBar.append(settingsBtn, homeBtn, soundBtn);
  document.body.appendChild(topBar);
}

// button factory
function createButton(label, href = null) {
  const btn = href ? document.createElement("a") : document.createElement("button");
  btn.className = "choice-button top-control";
  btn.innerText = label;
  if (href) btn.href = href;
  return btn;
}

// show current line
function showLine(index) {
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

// add new line
function insertNewLine(index) {
  const paragraph = document.createElement("p");
  paragraph.textContent = storyLines[index];
  paragraph.classList.add("line", "slide-in");
  typewriterEl.appendChild(paragraph);
  paragraph.scrollIntoView({ behavior: "smooth", block: "end" });
}

// go next
function handleNext() {
  if (currentLine < storyLines.length - 1) {
    currentLine++;
    showLine(currentLine);
  } else {
    choicesEl.classList.add("show");
    nextButton.style.display = "none";
  }
}

// go back
function handlePrevious() {
  if (currentLine > 0) {
    currentLine--;
    showLine(currentLine);
    nextButton.style.display = "inline-block";
    choicesEl.classList.remove("show");
  }
}

// update background
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
    backgroundEl.style.backgroundImage = `url('${imageToUse}')`;
  }
}
