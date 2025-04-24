// choice-js.js — Updated for line-by-line FADE IN (no typing)

const typewriterEl = document.getElementById("typewriter");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentLine = 0;

function showLine(index) {
  if (!storyLines || index < 0 || index >= storyLines.length) return;

  typewriterEl.style.opacity = 0;

  setTimeout(() => {
    typewriterEl.textContent = storyLines[index];
    typewriterEl.style.opacity = 1;
  }, 200);
}

nextBtn.addEventListener("click", () => {
  if (currentLine < storyLines.length - 1) {
    currentLine++;
    showLine(currentLine);
  } else {
    choicesEl.style.display = "block";
    setTimeout(() => {
      choicesEl.classList.add("show");
    }, 10);
    nextBtn.style.display = "none";
  }
});

prevBtn.addEventListener("click", () => {
  if (currentLine > 0) {
    currentLine--;
    showLine(currentLine);
    choicesEl.classList.remove("show");
    choicesEl.style.display = "none";
    nextBtn.style.display = "inline-block";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  showLine(currentLine);
});
