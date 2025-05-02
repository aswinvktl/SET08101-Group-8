document.addEventListener("DOMContentLoaded", () => {
    // DARK MODE TOGGLE
    const darkToggle = document.getElementById("darkToggle");
    const body = document.body;
  
    // Load setting
    if (localStorage.getItem("darkMode") === "true") {
      body.classList.add("dark-mode");
      darkToggle.checked = true;
    }
  
    darkToggle.addEventListener("change", () => {
      if (darkToggle.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "true");
      } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "false");
      }
    });
  
    // LOG OTHER SETTINGS
    document.querySelectorAll("input, select").forEach((el) => {
      el.addEventListener("change", () => {
        console.log(`${el.name || el.id || 'setting'}: ${el.value || el.checked}`);
      });
    });
  });
  