import "./style.css";
import "./buttonHover.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./background.css";
import "./border.css";
import "./neons.scss";

document.getElementById("year").innerHTML = new Date().getFullYear();

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((link) => link.classList.remove("active"));
    link.classList.add("active");
  });
});

const sections = [
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "certifications",
  "contact",
];

const observerOptions = {
  root: null, // use the viewport
  rootMargin: "0px",
  threshold: 0.7, // 10% of the element is visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${entry.target.id}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(document.getElementById(section));
});

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

const languageIcon = document.querySelectorAll(".language-icon");

document.querySelectorAll(".holographic-card").forEach((card) => {
  card.addEventListener("touchstart", () => card.classList.add("hovered"));
  card.addEventListener("touchend", () => card.classList.remove("hovered"));
});

document.querySelectorAll(".btn").forEach((element) => {
  element.classList.add("glow-on-hover");
});
