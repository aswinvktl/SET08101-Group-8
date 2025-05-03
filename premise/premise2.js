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
  
  // === Persistent Sound Setting ===
  if (sessionStorage.getItem("soundOn") === null) {
    sessionStorage.setItem("soundOn", "true");
  }
  let isSoundOn = sessionStorage.getItem("soundOn") === "true";
  
  // === Page Logic ===
  let currentLine = 0;
  let renderedLines = [];
  
  window.addEventListener("DOMContentLoaded", () => {
    // === DOM References (NOW safe to get them)
    const typewriterEl = document.getElementById("typewriter");
    const choicesEl = document.querySelector(".choices");
    const backgroundEl = document.querySelector(".background");
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");
  
    // === Music Autoplay
    if (isSoundOn) {
      const id = bgMusic.play();
      if (!bgMusic.playing(id)) {
        document.body.addEventListener("click", tryPlayOnce, { once: true });
      }
    }
  
    showLine(currentLine);
  
    // === Navigation
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
        updateBackground(currentLine, backgroundEl);
        choicesEl.classList.remove("show");
      }
      if (isSoundOn) clickSound.play();
    });
  
    // === Click sounds for all other buttons
    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("click", () => {
        if (isSoundOn) clickSound.play();
      });
    });
  
    // === Mute Toggle
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
  
    // === Show First Line
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
  
      updateBackground(index, backgroundEl);
    }
  
    function hideLastLine() {
      if (renderedLines.length > 0) {
        const lastLine = renderedLines.pop();
        lastLine.remove();
      }
    }
  
    function updateBackground(index, backgroundEl) {
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
  
    function tryPlayOnce() {
      if (isSoundOn) bgMusic.play();
    }
  });
  