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

// === INITIALIZE ===
window.addEventListener("DOMContentLoaded", () => {
  if (isSoundOn) {
    const id = bgMusic.play();
    if (!bgMusic.playing(id)) {
      document.body.addEventListener("click", tryPlayOnce, { once: true });
    }
  }

  showLine(currentLineIndex);

  nextButton.addEventListener("click", () => {
    handleNext();
    if (isSoundOn) clickSound.play();
  });

  prevButton.addEventListener("click", () => {
    handlePrevious();
    if (isSoundOn) clickSound.play();
  });

  // Keyboard accessibility
  [nextButton, prevButton].forEach(button => {
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        button.click();
      }
    });
  });

  // Global button click sound
  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("click", () => {
      if (isSoundOn) clickSound.play();
    });
  });

  // Mute toggle
const toggleBtn = document.createElement("button");
toggleBtn.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
toggleBtn.className = "choice-button sound-toggle";

toggleBtn.addEventListener("click", () => {
  isSoundOn = !isSoundOn;
  sessionStorage.setItem("soundOn", isSoundOn.toString());
  toggleBtn.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
  if (isSoundOn) bgMusic.play();
  else Howler.stop();
});

document.body.appendChild(toggleBtn);


  document.body.appendChild(toggleBtn);
});

// === AUDIO AUTOPLAY FALLBACK ===
function tryPlayOnce() {
  if (isSoundOn) bgMusic.play();
}

// === BACKGROUND TRANSITION ===
function updateBackground(index) {
  if (typeof backgroundMap === "undefined") return;

  let imageToUse = null;
  const keys = Object.keys(backgroundMap).map(Number).sort((a, b) => b - a);

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

// === TEXT RENDERING ===
function showLine(index) {
  if (!Array.isArray(storyLines) || index < 0 || index >= storyLines.length) return;

  // Clear previous line
  typewriterContainer.innerHTML = "";

  const paragraph = document.createElement("p");
  paragraph.textContent = storyLines[index];
  paragraph.classList.add("line");
  typewriterContainer.appendChild(paragraph);

  if (typeof backgroundMap !== "undefined") {
    updateBackground(index);
  }

  requestAnimationFrame(() => {
    paragraph.classList.add("show");
    paragraph.scrollIntoView({ behavior: "smooth", block: "end" });
  });
}

// === NAVIGATION HANDLERS ===
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

// === CHOICE REVEAL LOGIC ===
function revealChoices() {
  choicesContainer.style.display = "block";
  requestAnimationFrame(() => {
    choicesContainer.classList.add("show");
  });
  nextButton.style.display = "none";
}

function hideChoices() {
  choicesContainer.classList.remove("show");
  setTimeout(() => {
    choicesContainer.style.display = "none";
  }, 300);
  nextButton.style.display = "inline-block";
}
