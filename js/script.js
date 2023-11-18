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

var allBtns = document.querySelectorAll(".btn-holder");

for (i = 0; i < allBtns.length; i++) {
  var btn = allBtns[i];

  btn.addEventListener("click", function () {
    var allNodes = btn.children;

    // find all childern and check them for add class and change checkbox state
    for (j = 0; j < allNodes.length; j++) {
      var node = allNodes[j];
      var isActive;

      // check for btn circle and change it's css class
      if (node.classList.contains("btn-circle")) {
        if (!node.classList.contains("active")) {
          node.classList.add("active");
          isActive = true;
          let head = document.head;
          let link = document.createElement("link");

          link.type = "text/css";
          link.rel = "stylesheet";
          link.href = "css/theme.css";
          link.id = "theme";

          head.appendChild(link);
        } else {
          node.classList.remove("active");
          isActive = false;
          let sheet = document.getElementById("theme");
          sheet.disabled = true;
          sheet.parentNode.removeChild(sheet);
        }
      }

      // check for check box and change it's state
      if (node.classList.contains("checkbox")) {
        if (isActive) {
          node.checked = true;
        } else {
          node.checked = false;
        }
      }
    }
  });
}
