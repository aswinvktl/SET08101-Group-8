window.addEventListener("DOMContentLoaded", () => {
  // dark mode
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  // text-only mode
  if (localStorage.getItem("textOnly") === "true") {
    document.body.classList.add("text-only");
  }

  // reduced motion
  if (localStorage.getItem("animationsOff") === "true") {
    document.body.classList.add("no-animations");
  }

  // high contrast
  if (localStorage.getItem("contrastOn") === "true") {
    document.body.classList.add("high-contrast");
  }

  // sound toggle
  window.isSoundOn = localStorage.getItem("soundOn") !== "false";

  // language
  window.currentLang = localStorage.getItem("lang") || "en";
});
