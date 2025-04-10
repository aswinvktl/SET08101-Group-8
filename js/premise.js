const lines = ["Long ago, cradled in the misty mountains and ancient glens, there lay the hidden valley of Bruhaven (Gleann Bhru in Gaelic). A place sung of in old tales, where the wind carried magic, and the hills held secrets older than memory."];

const images = [
    "../images/Bruhaven.jpg"]

    let currentLine = 0;

    const textBox = document.getElementById("text-box");
    const background = document.getElementById("background");

    function showLine(index) {
        textBox.style.opacity = 0; // Fade out the text box

        setTimeout(() => {
            textBox.innerHTML = lines[index]; // Update the text box content
            background.style.backgroundImage = `url(${images[index]})`; // Change the background image
            textBox.style.opacity = 1; // Fade in the text box
        }, 300); // Wait for fade out to finish before changing content
    }

    document.body.addEventListener("click", () => {
        if (currentLine < lines.length - 1) {
            currentLine++;
            showLine(currentLine);
        }
        else {
            window.location.href = "..\premise\premise2.html"; // Redirect to the main page
        }
    });

    window.onload = () => {
        showLine(currentLine); // Show the first line on page load
    };
