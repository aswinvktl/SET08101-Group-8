// === ELEMENT REFERENCES ===
const typewriterContainer = document.getElementById("typewriter");
const choicesContainer = document.getElementById("choices");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

let currentLineIndex = 0;
const renderedLines = [];

// === OPTIONAL: Dynamic background switching logic ===
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

  if (!imageToUse) return;

  const bgDiv = document.querySelector('.background');
  if (bgDiv) {
    bgDiv.style.backgroundImage = `url('${imageToUse}')`;
  }
}

// === FUNCTIONS ===

// Add a new line (with fade-in effect)
function showLine(index) {
  if (!Array.isArray(storyLines) || index < 0 || index >= storyLines.length) return;

  const paragraph = document.createElement("p");
  paragraph.textContent = storyLines[index];
  paragraph.classList.add("line");
  typewriterContainer.appendChild(paragraph);
  renderedLines.push(paragraph);

  // Optional: update background
  if (typeof backgroundMap !== "undefined") {
    updateBackground(index);
  }

  // Animate the new line
  requestAnimationFrame(() => {
    paragraph.classList.add("show");
    paragraph.scrollIntoView({ behavior: "smooth", block: "end" });
  });
}

// Remove the last shown line
function hideLastLine() {
  if (renderedLines.length > 0) {
    const lastLine = renderedLines.pop();
    lastLine.remove();
  }
}

// Handle clicking 'Next'
function handleNext() {
  if (currentLineIndex < storyLines.length - 1) {
    currentLineIndex++;
    showLine(currentLineIndex);
  } else {
    // Final line reached — reveal final message if it exists
    const endMessage = document.getElementById("end-message");
    if (endMessage) {
      endMessage.style.display = "block";
    }

    revealChoices();
  }
}

// Handle clicking 'Previous'
function handlePrevious() {
  if (currentLineIndex > 0) {
    hideLastLine();
    currentLineIndex--;
    hideChoices();

    // Optional: hide final message again if going backward
    const endMessage = document.getElementById("end-message");
    if (endMessage) {
      endMessage.style.display = "none";
    }
  }
}

// Show the choices buttons after story ends
function revealChoices() {
  choicesContainer.style.display = "block";
  requestAnimationFrame(() => {
    choicesContainer.classList.add("show");
  });
  nextButton.style.display = "none";
}

// Hide the choices when going back
function hideChoices() {
  choicesContainer.classList.remove("show");
  setTimeout(() => {
    choicesContainer.style.display = "none";
  }, 300);
  nextButton.style.display = "inline-block";
}

// === INITIALIZATION ===
window.addEventListener("DOMContentLoaded", () => {
  showLine(currentLineIndex);

  nextButton.addEventListener("click", handleNext);
  prevButton.addEventListener("click", handlePrevious);

  [nextButton, prevButton].forEach(button => {
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        button.click();
      }
    });
  });
});