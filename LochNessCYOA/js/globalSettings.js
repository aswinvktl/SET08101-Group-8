window.addEventListener("DOMContentLoaded", () => {
  // === DARK MODE ===
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  // === TEXT-ONLY / VISUALS OFF ===
  if (localStorage.getItem("textOnly") === "true") {
    document.body.classList.add("text-only");
  }

  // === REDUCED MOTION ===
  if (localStorage.getItem("animationsOff") === "true") {
    document.body.classList.add("no-animations");
  }

  // === HIGH CONTRAST ===
  if (localStorage.getItem("contrastOn") === "true") {
    document.body.classList.add("high-contrast");
  }

  // === SOUND ON/OFF globally (optional for reference) ===
  window.isSoundOn = localStorage.getItem("soundOn") !== "false";

  // === LANGUAGE (placeholder logic) ===
  window.currentLang = localStorage.getItem("lang") || "en";
});
