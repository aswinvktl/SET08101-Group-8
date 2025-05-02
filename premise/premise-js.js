const typewriterEl = document.getElementById("typewriter");
const choicesEl = document.querySelector(".choices");
const backgroundEl = document.querySelector(".background");
const backButton = document.getElementById("goBack");
const skipButton = document.getElementById("skip");

let currentLine = 0;
let renderedLines = [];
let isSkipping = false;

const storyLines = [
  "Long ago, cradled in the misty mountains and ancient glens, there lay the hidden valley of Bruhaven.",
  "A place sung of in old tales, where the wind carried magic, and the hills held secrets older than memory.",
  "In this mystic land, life moved gently, echoing the breeze through the glens.",
  "The people of Bruhaven lived with full hearts and open arms—sharing bread, laughter, and stories beneath starry skies.",
  "Their days were simple, but rich in every manner.",
  "What truly made Bruhaven enchanting was a potion unlike any other, born of the valley's magical soil and crafted with care.",
  "Glowing like the spring sun, fizzing with ancient power, they called it Iron Brew.",
  "It was more than a drink. It was joy in a cup. The spark that fueled their adventures."
];

const backgroundMap = {
  0: "../images/Bruhaven.jpg",
  2: "../images/village.jpg",
  3: "../images/starryNight.jpg",
  5: "../images/theLiquid.jpg",
  6: "../images/iron brewing.jpg"
};

// === Show a new line ===
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

// === Hide last line ===
function hideLastLine() {
  if (renderedLines.length > 0) {
    const lastLine = renderedLines.pop();
    lastLine.remove();
  }
}

// === Background Transition ===
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

// === Initialization ===
window.addEventListener("DOMContentLoaded", () => {
  showLine(currentLine);

  // Advance story on body click
  document.body.addEventListener("click", () => {
    if (isSkipping) return;

    currentLine++;
    if (currentLine < storyLines.length) {
      showLine(currentLine);
    } else {
      choicesEl.classList.add("show");
    }
  });

  // Back
  backButton?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentLine > 0) {
      hideLastLine();
      currentLine--;
      updateBackground(currentLine);
      choicesEl.classList.remove("show");
    }
  });

  // Skip all
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
