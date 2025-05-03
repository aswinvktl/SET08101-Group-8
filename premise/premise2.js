// === AUDIO SETUP ===
const bgMusic = new Howl({
    src: ['../audio/royalty.wav'],
    loop: true,
    volume: 0.4
  });
  
  const clickSound = new Howl({
    src: ['../audio/mouseClick.wav'],
    volume: 0.6
  });
  
  if (sessionStorage.getItem("soundOn") === null) {
    sessionStorage.setItem("soundOn", "true");
  }
  let isSoundOn = sessionStorage.getItem("soundOn") === "true";
  
  // === DOM Elements ===
  const typewriterEl = document.getElementById("typewriter");
  const choicesEl = document.querySelector(".choices");
  const backgroundEl = document.querySelector(".background");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  
  let currentLine = 0;
  let renderedLines = [];
  
  window.addEventListener("DOMContentLoaded", () => {
    // === MUSIC
    if (isSoundOn) {
      const id = bgMusic.play();
      if (!bgMusic.playing(id)) {
        document.body.addEventListener("click", tryPlayOnce, { once: true });
      }
    }
  
    showLine(currentLine);
  
    // === Navigation Buttons ===
    nextBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentLine < storyLines.length - 1) {
        currentLine++;
        showLine(currentLine);
      } else {
        choicesEl.classList.add("show");
      }
      if (isSoundOn) clickSound.play();
    });
  
    prevBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentLine > 0) {
        hideLastLine();
        currentLine--;
        updateBackground(currentLine);
        choicesEl.classList.remove("show");
      }
      if (isSoundOn) clickSound.play();
    });
  
    // === Click sounds on other buttons
    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("click", () => {
        if (isSoundOn) clickSound.play();
      });
    });
  
    // === MUTE TOGGLE
    const toggleBtn = document.createElement("button");
    toggleBtn.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
    toggleBtn.className = "nav-button";
    toggleBtn.style.position = "fixed";
    toggleBtn.style.top = "1rem";
    toggleBtn.style.right = "1rem";
    toggleBtn.style.zIndex = "1000";
  
    toggleBtn.addEventListener("click", () => {
      isSoundOn = !isSoundOn;
      sessionStorage.setItem("soundOn", isSoundOn.toString());
      toggleBtn.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
      if (isSoundOn) bgMusic.play();
      else Howler.stop();
    });
  
    document.body.appendChild(toggleBtn);
  });
  
  function tryPlayOnce() {
    if (isSoundOn) bgMusic.play();
  }
  
  // === Show Line ===
  function showLine(index) {
    if (!Array.isArray(storyLines) || index >= storyLines.length) return;
  
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
  
  // === Remove Last Line ===
  function hideLastLine() {
    if (renderedLines.length > 0) {
      const lastLine = renderedLines.pop();
      lastLine.remove();
    }
  }
  
  // === Background Image Logic ===
  function updateBackground(index) {
    if (typeof backgroundMap === "undefined" || !backgroundEl) return;
  
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
  