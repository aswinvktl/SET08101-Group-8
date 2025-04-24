// === DOM ELEMENTS ===
const typewriterEl = document.getElementById("typewriter");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

// Start at the first line
let currentLine = 0;

// === FUNCTION: Render all lines up to a certain index ===
function showAllLinesUpTo(index) {
  // Clear existing story lines
  typewriterEl.innerHTML = "";

  // Rebuild lines from the beginning up to the current point
  for (let i = 0; i <= index; i++) {
    const lineEl = document.createElement("p");
    lineEl.textContent = storyLines[i];
    lineEl.classList.add("show");
    lineEl.style.opacity = 0;
    typewriterEl.appendChild(lineEl);

    // Fade in effect
    setTimeout(() => {
      lineEl.style.opacity = 1;
    }, 100);
  }
}

// === NEXT BUTTON LOGIC ===
nextBtn.addEventListener("click", () => {
  if (currentLine < storyLines.length - 1) {
    // Move to next line
    currentLine++;
    showAllLinesUpTo(currentLine);
  } else {
    // Final line reached — show choices
    showAllLinesUpTo(currentLine);
    choicesEl.style.display = "block";

    // Small delay before fade-in
    setTimeout(() => {
      choicesEl.classList.add("show");
    }, 10);

    // Hide next button
    nextBtn.style.display = "none";
  }
});

// === PREVIOUS BUTTON LOGIC ===
prevBtn.addEventListener("click", () => {
  if (currentLine > 0) {
    currentLine--;
    showAllLinesUpTo(currentLine);

    // Hide choices again when going back
    choicesEl.classList.remove("show");
    choicesEl.style.display = "none";
    nextBtn.style.display = "inline-block";
  }
});

// === INITIALIZE PAGE ===
window.addEventListener("DOMContentLoaded", () => {
  showAllLinesUpTo(currentLine);
});
