const moonPath =
  "M19.5 30C19.5 46.5685 30 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C30 0 19.5 13.4315 19.5 30Z";

const sunPath =
  "M60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30Z";

const darkMode = document.querySelector(".darkMode");

// Theme Toggler
let darkModeState = localStorage.getItem("dark-mode");
let toggle = false;

const enableDarkMode = () => {
  document.body.classList.add("dark-theme");
  localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
  document.body.classList.remove("dark-theme");
  localStorage.setItem("dark-mode", null);
};

if (darkModeState === "enabled") {
  enableDarkMode();
  document.querySelector(".sun").setAttribute("d", moonPath);
  document.querySelector(".darkMode").style.transform = "rotate(320deg)";
  toggle = true;
}

darkMode.addEventListener("click", () => {
  darkModeState = localStorage.getItem("dark-mode");
  const timeLine = anime
    .timeline({
      duration: 750,
      easing: "easeOutExpo",
    })
    .add({
      targets: ".sun",
      d: [{ value: toggle ? sunPath : moonPath }],
    })
    .add(
      {
        targets: ".darkMode",
        rotate: toggle ? "0deg" : "320deg",
        easing: "easeOutBack",
        complete: function () {
          darkModeState !== "enabled" ? enableDarkMode() : disableDarkMode();
        },
      },
      "-=700"
    );

  if (!toggle) {
    toggle = true;
  } else {
    toggle = false;
  }
});
