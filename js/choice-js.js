// choice-js.js — Updated for line-by-line FADE IN (no typing)

const typewriterEl = document.getElementById("typewriter");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentLine = 0;

function showLine(index) {
    if (!storyLines || index < 0 || index >= storyLines.length) return;
  
    const lineEl = document.createElement("p");
    lineEl.textContent = storyLines[index];
    lineEl.classList.add("show");
  
    // Start hidden
    lineEl.style.opacity = 0;
    typewriterEl.appendChild(lineEl);
  
    // Fade in
    setTimeout(() => {
      lineEl.style.opacity = 1;
    }, 100);
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
      typewriterEl.innerHTML = ""; // Clear all
      for (let i = 0; i <= currentLine; i++) {
        showLine(i);
      }
      choicesEl.classList.remove("show");
      choicesEl.style.display = "none";
      nextBtn.style.display = "inline-block";
    }
  });
  

window.addEventListener("DOMContentLoaded", () => {
  showLine(currentLine);
});
