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
const backButton = document.getElementById("goBack");
const skipButton = document.getElementById("skip");

let currentLine = 0;
let renderedLines = [];
let isSkipping = false;

const storyLines = window.storyLines;
const backgroundMap = window.backgroundMap;

window.addEventListener("DOMContentLoaded", () => {
  if (isSoundOn) {
    const id = bgMusic.play();
    if (!bgMusic.playing(id)) {
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
  });

  skipButton?.addEventListener("click", (e) => {
    e.stopPropagation();
    isSkipping = true;
    for (let i = currentLine; i < storyLines.length; i++) {
      showLine(i);
    }
    currentLine = storyLines.length;
    choicesEl.classList.add("show");
  });

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("click", () => {
      if (isSoundOn) clickSound.play();
    });
  });

  const toggleBtn = document.createElement("button");
  toggleBtn.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
  toggleBtn.className = "scroll-btn";
  Object.assign(toggleBtn.style, {
    position: "fixed",
    top: "1rem",
    right: "1rem",
    zIndex: "1000"
  });

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

function showLine(index) {
  if (!Array.isArray(storyLines) || index >= storyLines.length) return;

  const paragraph = document.createElement("p");
  paragraph.textContent = storyLines[index];
  paragraph.classList.add("line");

  typewriterEl.appendChild(paragraph);
  renderedLines.push(paragraph);

  requestAnimationFrame(() => {
    paragraph.classList.add("show");
    paragraph.scrollIntoView({ behavior: 'smooth', block: 'end' });

    // Dim previous paragraphs
    renderedLines.forEach((el, idx) => {
      el.style.opacity = idx === index ? "1" : "0.4";
    });
  });

  updateBackground(index);
}

function hideLastLine() {
  if (renderedLines.length > 0) {
    const last = renderedLines.pop();
    last.remove();
  }
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
