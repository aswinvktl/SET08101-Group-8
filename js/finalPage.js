const bgMusic = new Howl({
  src: ['../audio/finalPage.wav'],
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

const typewriterContainer = document.getElementById("typewriter");
const choicesContainer = document.getElementById("choices");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

let currentLineIndex = 0;

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

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("click", () => {
      if (isSoundOn) clickSound.play();
    });
  });

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
    isSoundOn ? bgMusic.play() : Howler.stop();
  });

  document.body.appendChild(toggleBtn);
});

function tryPlayOnce() {
  if (isSoundOn) bgMusic.play();
}

function showLine(index) {
  if (!Array.isArray(storyLines) || index >= storyLines.length) return;
  typewriterContainer.innerHTML = "";
  const paragraph = document.createElement("p");
  paragraph.textContent = storyLines[index];
  paragraph.classList.add("line");
  typewriterContainer.appendChild(paragraph);
  requestAnimationFrame(() => {
    paragraph.classList.add("show");
    paragraph.scrollIntoView({ behavior: 'smooth', block: 'end' });
  });
}

function handleNext() {
  if (currentLineIndex < storyLines.length - 1) {
    currentLineIndex++;
    showLine(currentLineIndex);
  } else {
    choicesContainer.classList.add("show");
    document.getElementById("endMessage").style.display = "block";
  }
}

function handlePrevious() {
  if (currentLineIndex > 0) {
    currentLineIndex--;
    showLine(currentLineIndex);
    choicesContainer.classList.remove("show");
  }
}
