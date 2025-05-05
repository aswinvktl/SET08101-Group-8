// audio
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

// dom ready
window.addEventListener("DOMContentLoaded", () => {
  if (isSoundOn) {
    const id = themeMusic.play();
    if (!themeMusic.playing(id)) {
      document.body.addEventListener("click", tryPlayOnce, { once: true });
    }
  }

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("click", () => {
      if (isSoundOn) clickSound.play();
    });
  });

  // mute toggle
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

  // fade in
  const main = document.querySelector("main");
  if (main) {
    main.style.opacity = 0;
    setTimeout(() => {
      main.style.transition = "opacity 1.2s ease";
      main.style.opacity = 1;
    }, 400);
  }

  // type in title
  const titleEl = document.querySelector(".scene-title");
  if (titleEl) {
    const originalText = titleEl.textContent;
    titleEl.textContent = "";
    typeTitle(originalText, titleEl);
  }
});

// autoplay fallback
function tryPlayOnce() {
  if (isSoundOn) themeMusic.play();
}

// typewriter
function typeTitle(text, element) {
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 80);
}
