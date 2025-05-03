// === AUDIO SETUP ===
const bgMusic = new Howl({
    src: ['../audio/finalPage.mp3'],
    loop: true,
    volume: 0.45
  });
  
  const clickSound = new Howl({
    src: ['../audio/mouseClick.wav'],
    volume: 0.6
  });
  
  if (sessionStorage.getItem("soundOn") === null) {
    sessionStorage.setItem("soundOn", "true");
  }
  let isSoundOn = sessionStorage.getItem("soundOn") === "true";
  
  // === DOM ELEMENTS ===
  const typewriterContainer = document.getElementById("typewriter");
  const choicesContainer = document.getElementById("choices");
  const nextButton = document.getElementById("next");
  const prevButton = document.getElementById("prev");
  
  let currentLineIndex = 0;
  const renderedLines = [];
  
  // === INIT ===
  window.addEventListener("DOMContentLoaded", () => {
    if (isSoundOn) {
      const id = bgMusic.play();
      if (!bgMusic.playing(id)) {
        document.body.addEventListener("click", tryPlayOnce, { once: true });
      }
    }
  
    showLine(currentLineIndex);
  
    nextButton.addEventListener("click", () => {
      handleNext();
      if (isSoundOn) clickSound.play();
    });
  
    prevButton.addEventListener("click", () => {
      handlePrevious();
      if (isSoundOn) clickSound.play();
    });
  
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
  
  // === SHOW LINE ===
  function showLine(index) {
    if (!Array.isArray(storyLines) || index >= storyLines.length) return;
  
    const paragraph = document.createElement("p");
    paragraph.textContent = storyLines[index];
    paragraph.classList.add("line");
    typewriterContainer.appendChild(paragraph);
    renderedLines.push(paragraph);
  
    requestAnimationFrame(() => {
      paragraph.classList.add("show");
      paragraph.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
  }
  
  // === HIDE LINE ===
  function hideLastLine() {
    if (renderedLines.length > 0) {
      const lastLine = renderedLines.pop();
      lastLine.remove();
    }
  }
  
  // === NEXT ===
  function handleNext() {
    if (currentLineIndex < storyLines.length - 1) {
      currentLineIndex++;
      showLine(currentLineIndex);
    } else {
      choicesContainer.classList.add("show");
    }
  }
  
  // === PREVIOUS ===
  function handlePrevious() {
    if (currentLineIndex > 0) {
      hideLastLine();
      currentLineIndex--;
      choicesContainer.classList.remove("show");
    }
  }
  