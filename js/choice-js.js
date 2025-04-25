// === ELEMENT REFERENCES ===
const typewriterEl = document.getElementById("typewriter");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentLine = 0;
let renderedLines = [];

// === ADD NEW LINE (simple fade-in) ===
function appendLine(index) {
    if (!storyLines || index < 0 || index >= storyLines.length) return;
  
    const lineEl = document.createElement("p");
    lineEl.textContent = storyLines[index];
    lineEl.classList.add("line");
    typewriterEl.appendChild(lineEl);
    renderedLines.push(lineEl);
  
    setTimeout(() => {
      lineEl.classList.add("show");
      lineEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 10);
  }
  
function removeLastLine() {
  if (renderedLines.length > 0) {
    const last = renderedLines.pop();
    last.remove();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentLine < storyLines.length - 1) {
    currentLine++;
    appendLine(currentLine);
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
    removeLastLine();
    currentLine--;
    choicesEl.classList.remove("show");
    choicesEl.style.display = "none";
    nextBtn.style.display = "inline-block";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  appendLine(currentLine);
});
