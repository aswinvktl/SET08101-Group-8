// === AUDIO SETUP ===
const themeMusic = new Howl({
  src: ['audio/introSound.wav'],
  loop: true,
  volume: 0.5
});

const clickSound = new Howl({
  src: ['audio/mouseClick.wav'],
  volume: 0.6
});

if (sessionStorage.getItem("soundOn") === null) {
  sessionStorage.setItem("soundOn", "true");
}

let isSoundOn = sessionStorage.getItem("soundOn") === "true";

// === DOM READY ===
window.addEventListener("DOMContentLoaded", () => {
  // Autoplay background music
  if (isSoundOn) {
    const id = themeMusic.play();
    if (!themeMusic.playing(id)) {
      document.body.addEventListener("click", tryPlayOnce, { once: true });
    }
  }

  // Click sound for buttons/links
  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("click", () => {
      if (isSoundOn) clickSound.play();
    });
  });

  // === MUTE TOGGLE BUTTON ===
  const toggleBtn = document.createElement("button");
  toggleBtn.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
  toggleBtn.className = "nav-button";
  toggleBtn.setAttribute("aria-label", "Toggle sound on or off");
  Object.assign(toggleBtn.style, {
    position: "fixed",
    top: "1rem",
    right: "1rem",
    zIndex: "1000"
  });

  toggleBtn.addEventListener("click", () => {
    isSoundOn = !isSoundOn;
    sessionStorage.setItem("soundOn", isSoundOn.toString());
    toggleBtn.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
    if (isSoundOn) {
      themeMusic.play();
    } else {
      Howler.stop();
    }
  });

  document.body.appendChild(toggleBtn);

  // === MAIN FADE-IN ANIMATION ===
  const main = document.querySelector("main");
  if (main) {
    main.style.opacity = 0;
    setTimeout(() => {
      main.style.transition = "opacity 1.2s ease";
      main.style.opacity = 1;
    }, 400);
  }

  // === OPTIONAL: TYPE-IN TITLE ===
  const titleEl = document.querySelector(".scene-title");
  if (titleEl) {
    const originalText = titleEl.textContent;
    titleEl.textContent = "";
    typeTitle(originalText, titleEl);
  }
});

// === AUTOPLAY FALLBACK ===
function tryPlayOnce() {
  if (isSoundOn) themeMusic.play();
}

// === TYPEWRITER FUNCTION ===
function typeTitle(text, element) {
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 80);
}
