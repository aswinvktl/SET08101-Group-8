const typewriterEl = document.getElementById("typewriter");
const choicesEl = document.querySelector(".choices");
const backgroundEl = document.querySelector(".background");
const backButton = document.getElementById("goBack");
const skipButton = document.getElementById("skip");

let currentLine = 0;
let renderedLines = [];
let isSkipping = false;

const storyLines = window.storyLines || [];
const backgroundMap = window.backgroundMap || {};

function showLine(index) {
  if (!storyLines || index >= storyLines.length) return;
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

function hideLastLine() {
  if (renderedLines.length > 0) {
    const lastLine = renderedLines.pop();
    lastLine.remove();
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
    backgroundEl.classList.add("fade");
    setTimeout(() => {
      backgroundEl.style.backgroundImage = `url('${imageToUse}')`;
      backgroundEl.classList.remove("fade");
    }, 500);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (!typewriterEl || !choicesEl) return;
  showLine(currentLine);
  document.body.addEventListener("click", () => {
    if (isSkipping) return;
    currentLine++;
    if (currentLine < storyLines.length) {
      showLine(currentLine);
    } else if (!choicesEl.classList.contains("show")) {
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
});
