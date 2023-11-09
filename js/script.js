document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll("main section");

  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSection = document.querySelector(link.getAttribute("href"));
      sections.forEach((section) => (section.style.display = "none"));
      targetSection.style.display = "block";
    });
  });
});