window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
    }
  
    if (localStorage.getItem("textOnly") === "true") {
      document.body.classList.add("text-only");
    }
  
    if (localStorage.getItem("animationsOff") === "true") {
      document.body.classList.add("no-animations");
    }
  });
  