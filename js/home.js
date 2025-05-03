// === Audio Setup ===
const themeMusic = new Howl({
    src: ['audio/introSound.wav'],
    loop: true,
    volume: 0.5
  });
  
  const clickSound = new Howl({
    src: ['audio/clicky.mp3'], // ✅ Now valid
    volume: 0.6
  });
  
  // Default to sound ON if not set
  if (sessionStorage.getItem("soundOn") === null) {
    sessionStorage.setItem("soundOn", "true");
  }
  
  let isSoundOn = sessionStorage.getItem("soundOn") === "true";
  
  // === DOM Ready ===
  window.addEventListener("DOMContentLoaded", () => {
    // Try to play music immediately
    if (isSoundOn) {
      const id = themeMusic.play();
  
      // If autoplay blocked (not playing), retry on first click
      if (!themeMusic.playing(id)) {
        document.body.addEventListener("click", tryPlayOnce, { once: true });
      }
    }
  
    // Click sound on all <a> and <button>
    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("click", () => {
        if (isSoundOn) clickSound.play();
      });
    });
  
    // Mute toggle
    const toggleBtn = document.createElement("button");
    toggleBtn.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
    toggleBtn.className = "nav-button";
    toggleBtn.setAttribute("aria-label", "Toggle sound on or off");
    toggleBtn.style.position = "fixed";
    toggleBtn.style.top = "1rem";
    toggleBtn.style.right = "1rem";
    toggleBtn.style.zIndex = "1000";
  
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
  });
  
  // Retry music if browser blocked autoplay
  function tryPlayOnce() {
    if (isSoundOn) themeMusic.play();
  }
  