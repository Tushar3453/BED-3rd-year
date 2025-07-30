const colors = ["red", "blue", "green", "orange", "purple","black","brown"];
    const box = document.getElementById("colorBox");
    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");

    let colorInterval = null;

    startBtn.addEventListener("click", () => {
      if (colorInterval !== null) return;

    colorInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        const selectedColor = colors[randomIndex];
        box.style.backgroundColor = selectedColor;
      }, 100);
    });

    stopBtn.addEventListener("click", () => {
      clearInterval(colorInterval);
      colorInterval = null;
    });