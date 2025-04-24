// === ELEMENT REFERENCES ===
const typewriterEl = document.getElementById("typewriter");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentLine = 0; // Track which story line we're on
let renderedLines = []; // Store line elements so we can remove them

// === ADD NEW LINE ===
function appendLine(index) {
  if (!storyLines || index < 0 || index >= storyLines.length) return;

  const lineEl = document.createElement("p");
  lineEl.textContent = storyLines[index];
  lineEl.classList.add("show");
  lineEl.style.opacity = 0; // Start invisible

  // Add to DOM
  typewriterEl.appendChild(lineEl);
  renderedLines.push(lineEl); // Track it

  // Animate fade-in
  setTimeout(() => {
    lineEl.style.opacity = 1;
  }, 50);
}

// === REMOVE LAST LINE ===
function removeLastLine() {
  if (renderedLines.length > 0) {
    const last = renderedLines.pop();
    last.remove();
  }
}

// === NEXT BUTTON ===
nextBtn.addEventListener("click", () => {
  if (currentLine < storyLines.length - 1) {
    currentLine++;
    appendLine(currentLine);
  } else {
    // Final line reached — show choices
    choicesEl.style.display = "block";
    setTimeout(() => {
      choicesEl.classList.add("show");
    }, 10);
    nextBtn.style.display = "none"; // Hide the next arrow
  }
});

// === PREVIOUS BUTTON ===
prevBtn.addEventListener("click", () => {
  if (currentLine > 0) {
    removeLastLine();
    currentLine--;

    // Hide choices if we go back
    choicesEl.classList.remove("show");
    choicesEl.style.display = "none";
    nextBtn.style.display = "inline-block";
  }
});

// === INITIALIZE ===
window.addEventListener("DOMContentLoaded", () => {
  appendLine(currentLine); // Show the first line on load
});
