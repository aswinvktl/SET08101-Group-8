// === Audio Setup ===
const themeMusic = new Howl({
    src: ['audio/introSound.wav'],
    loop: true,
    volume: 0.5
  });
  
  const clickSound = new Howl({
    src: ['audio/click.wav'],
    volume: 0.6
  });
  
  // Check saved sound preference
  let isSoundOn = sessionStorage.getItem("soundOn") !== "false";
  
  // === DOM Ready ===
  window.addEventListener("DOMContentLoaded", () => {
    // Start background music if enabled
    if (isSoundOn) {
      themeMusic.play();
    }
  
    // Add click sound to all <a> and <button>
    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("click", () => {
        if (isSoundOn) clickSound.play();
      });
    });
  
    // === Create Mute Toggle Button ===
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
      sessionStorage.setItem("soundOn", isSoundOn);
      toggleBtn.innerText = isSoundOn ? "🔊 Sound On" : "🔇 Sound Off";
      if (isSoundOn) {
        themeMusic.play();
      } else {
        Howler.stop();
      }
    });
  
    document.body.appendChild(toggleBtn);
  });
  