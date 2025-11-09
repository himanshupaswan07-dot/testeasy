const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const dropdowns = document.querySelectorAll(".dropdown > a");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

dropdowns.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    link.parentElement.classList.toggle("active");
  });
});
