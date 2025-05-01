const typewriterEl = document.getElementById("typewriter");
const choicesEl = document.querySelector(".choices");

let currentLine = 0;

// === Show next line with animation ===
function showLine(index) {
  if (!storyLines || index >= storyLines.length) return;

  const paragraph = document.createElement("p");
  paragraph.classList.add("line");
  paragraph.textContent = storyLines[index];
  typewriterEl.appendChild(paragraph);

  requestAnimationFrame(() => {
    paragraph.classList.add("show");
    paragraph.scrollIntoView({ behavior: 'smooth', block: 'end' });
  });

  updateBackground(index);
}

// === Switch background image based on index ===
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

  if (imageToUse) {
    const bgDiv = document.querySelector(".background");
    bgDiv.style.backgroundImage = `url('${imageToUse}')`;
  }
}

// === Init: Show each line in intervals ===
window.addEventListener("DOMContentLoaded", () => {
  const delayBetweenLines = 3800;

  function revealNext() {
    showLine(currentLine);
    currentLine++;

    if (currentLine < storyLines.length) {
      setTimeout(revealNext, delayBetweenLines);
    } else {
      // All lines done, show Next button
      setTimeout(() => {
        choicesEl.classList.add("show");
      }, 1000);
    }
  }

  revealNext();
});
