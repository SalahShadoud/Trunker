const sectionLinks = [...document.querySelectorAll(".section-link")];
let activeLink = document.querySelector(".section-link.active");
let sections = document.querySelectorAll("main section");

// Switch Main Section
let adminActiveLinkState = localStorage.getItem("adminActiveLink");
console.log();

if (adminActiveLinkState !== "dashboard" && adminActiveLinkState !== null) {
  changeActiveLink(document.querySelector(adminActiveLinkState));
  document.querySelector(adminActiveLinkState).click();
} else {
  changeActiveLink(document.querySelector("#dashboard"));
  document.querySelector("#dashboard").click();
}

sectionLinks.forEach((link) => {
  changeActiveLink(link);
});

function hideSections(condition) {
  sections.forEach((section) => {
    if (
      section.classList.contains("active") &&
      !section.classList.contains(condition)
    ) {
      section.classList.remove("active");
    }
  });
}

function changeActiveLink(link) {
  link.addEventListener("click", () => {
    if (link.classList.contains("active")) {
      return false;
    }
    link.classList.add("active");
    if (activeLink !== null && activeLink !== undefined) {
      activeLink.classList.remove("active");
    }
    activeLink = link;

    switch (link.id) {
      case "dashboard":
        document.querySelector("main .dashboard").classList.add("active");
        localStorage.setItem("adminActiveLink", "#dashboard");
        hideSections("dashboard");
        break;

      case "employees":
        document.querySelector("main .employees").classList.add("active");
        localStorage.setItem("adminActiveLink", "#employees");
        hideSections("employees");
        break;

      case "orders":
        document.querySelector("main .orders").classList.add("active");
        localStorage.setItem("adminActiveLink", "#orders");
        hideSections("orders");
        break;

      case "products":
        document.querySelector("main .products").classList.add("active");
        localStorage.setItem("adminActiveLink", "#products");
        hideSections("products");
        break;

      case "reports":
        document.querySelector("main .reports").classList.add("active");
        localStorage.setItem("adminActiveLink", "#reports");
        hideSections("reports");
        break;

      default:
        return false;
    }
  });
}
