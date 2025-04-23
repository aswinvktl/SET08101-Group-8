// choice.js — Handles interactive story with 3 click stages:
// click 1 = line 1, click 2 = line 2, click 3 = line 3 + choices fade in

console.log("✅ choice.js is running");
console.log("Loaded storyLines:", storyLines);

const typewriterEl = document.getElementById("typewriter");
const choicesEl = document.getElementById("choices");

let currentLine = 0;
let inProgress = false;

// Function to type a line word-by-word
function typeLine(line, callback) {
  typewriterEl.innerHTML = ""; // Clear previous text
  const words = line.split(" ");
  let i = 0;

  const interval = setInterval(() => {
    if (i < words.length) {
      typewriterEl.innerHTML += words[i] + " ";
      i++;
    } else {
      clearInterval(interval);
      inProgress = false;
      if (callback) callback();
    }
  }, 80); // Speed: 80ms per word
}

// Handle user clicks
document.body.addEventListener("click", () => {
  if (inProgress) return;

  if (currentLine < storyLines.length) {
    inProgress = true;
    typeLine(storyLines[currentLine]);
    currentLine++;
  } else {
    // Show choices with fade-in
    choicesEl.style.display = "block";
    setTimeout(() => {
      choicesEl.classList.add("show");
    }, 10);
  }
});

