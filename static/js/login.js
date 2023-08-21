// Theme Toggler

const moonPath =
  "M19.5 30C19.5 46.5685 30 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C30 0 19.5 13.4315 19.5 30Z";

const sunPath =
  "M60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30Z";

const darkMode = document.querySelector(".darkMode");

let toggle = false;

darkMode.addEventListener("click", () => {
  const bodyClassList = document.body.classList;
  const timeLine = anime.timeline({
    duration: 750,
    easing: "easeOutExpo",
  });

  timeLine.add({
    targets: ".sun",
    d: [{ value: toggle ? sunPath : moonPath }],
  });

  timeLine.add(
    {
      targets: ".darkMode",
      rotate: toggle ? "0deg" : "320deg",
      easing: "easeOutBack",
      complete: function () {
        bodyClassList.contains("dark-theme")
          ? bodyClassList.remove("dark-theme")
          : bodyClassList.add("dark-theme");
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

//car animation

document.addEventListener("DOMContentLoaded", function () {
  window.setTimeout(
    document.querySelector("svg").classList.add("animated"),
    1000
  );
});
