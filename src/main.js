import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Robust theme toggler: waits for DOM, updates navbar icon/aria, supports auto
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeButtons = Array.from(
    document.querySelectorAll("[data-bs-theme-value]")
  );
  const toggleBtn = document.getElementById("bd-theme");
  const toggleIconUse = toggleBtn && toggleBtn.querySelector("use");

  function setIconForTheme(theme) {
    // chooses icon id used in the <use href="#..."> inside the toggle button
    if (!toggleIconUse) return;
    const mapping = {
      light: "#sun-fill",
      dark: "#moon-stars-fill",
      auto:
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "#moon-stars-fill"
          : "#sun-fill",
    };
    toggleIconUse.setAttribute("href", mapping[theme] || "#circle-half");
    // update aria-label to reflect current theme
    toggleBtn.setAttribute("aria-label", `Toggle theme (${theme})`);
  }

  function updateActive(theme) {
    themeButtons.forEach((btn) => {
      const val = btn.getAttribute("data-bs-theme-value");
      const check = btn.querySelector(".bi.ms-auto");
      if (val === theme) {
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
        if (check) check.classList.remove("d-none");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
        if (check) check.classList.add("d-none");
      }
    });
  }

  function applyTheme(theme) {
    if (theme === "auto") {
      root.removeAttribute("data-bs-theme");
    } else {
      root.setAttribute("data-bs-theme", theme);
    }
    setIconForTheme(theme);
    updateActive(theme);
  }

  // read saved preference
  const saved = localStorage.getItem("theme") || "auto";
  applyTheme(saved);

  // listen for clicks on menu items
  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute("data-bs-theme-value");
      localStorage.setItem("theme", val);
      applyTheme(val);
    });
  });

  // if auto, listen to system changesj
  if (window.matchMedia) {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener &&
      mq.addEventListener("change", (e) => {
        const current = localStorage.getItem("theme") || "auto";
        if (current === "auto") applyTheme("auto");
      });
  }

  // JS-driven typewriter reveal (accessible + responsive)
  // Removed typewriter effect: heading is now static text.
});

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

languageIcon.forEach((icon) => {
  icon.classList.add("img-thumbnail");
});

document.querySelectorAll(".holographic-card").forEach((el) => {
  el.addEventListener("touchstart", () => el.classList.add("hovered"));
  el.addEventListener("touchend", () => el.classList.remove("hovered"));
});
