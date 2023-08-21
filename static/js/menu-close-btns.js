const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const sideMenu = document.querySelector("aside");
const sideMenuItems = sideMenu.querySelectorAll("a");
const logo = document.querySelector("aside .logo");

// Menu Button & Close Button for Small Screens
menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
  sideMenuItems.forEach((item) => {
    item.classList.add("noTransition");
  });
  let animation = anime
    .timeline({
      duration: 500,
      easing: "easeOutQuad",
    })
    .add({
      targets: sideMenu,
      translateX: ["-200px", "0px"],
    })
    .add(
      {
        targets: [logo, closeBtn, sideMenuItems],
        translateX: ["-200px", "0px"],
        ease: "easeOutQuad",
        delay: anime.stagger(100),
      },
      "-=500"
    );
});

closeBtn.addEventListener("click", () => {
  let animation = anime
    .timeline({
      duration: 500,
      easing: "easeOutQuad",
    })
    .add({
      targets: [logo, closeBtn, sideMenuItems],
      translateX: ["0px", "-400px"],
      delay: anime.stagger(100),
    })
    .add(
      {
        targets: sideMenu,
        translateX: ["0px", "-400px"],
        complete: function () {
          sideMenu.style.display = "none";
        },
      },
      "-= 500"
    );
});
