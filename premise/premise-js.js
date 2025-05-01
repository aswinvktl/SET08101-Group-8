const typewriterEl = document.getElementById("typewriter");
const choicesEl = document.querySelector(".choices");
const backgroundEl = document.querySelector(".background");
const backButton = document.getElementById("goBack");

let currentLine = 0;
let renderedLines = [];

// === Show next line ===
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

// === Remove last line ===
function hideLastLine() {
  if (renderedLines.length > 0) {
    const lastLine = renderedLines.pop();
    lastLine.remove();
  }
}

// === Change background with fade ===
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

  if (imageToUse && backgroundEl) {
    backgroundEl.classList.add("fade");
    setTimeout(() => {
      backgroundEl.style.backgroundImage = `url('${imageToUse}')`;
      backgroundEl.classList.remove("fade");
    }, 500);
  }
}

// === Initialization ===
window.addEventListener("DOMContentLoaded", () => {
  showLine(currentLine);

  document.body.addEventListener("click", () => {
    currentLine++;
    if (currentLine < storyLines.length) {
      showLine(currentLine);
    } else {
      choicesEl.classList.add("show");
    }
  });

  // Back button
  if (backButton) {
    backButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent advancing story
      if (currentLine > 0) {
        hideLastLine();
        currentLine--;
        updateBackground(currentLine);
        choicesEl.classList.remove("show");
      }
    });
  }
});
