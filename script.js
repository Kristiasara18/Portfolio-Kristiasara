// ===== Smooth scroll for in-page links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
    // close mobile menu after clicking
    navLinks.classList.remove("active");
  });
});

// ===== Mobile menu toggle =====
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  navLinks.classList.toggle("active");
});
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});

// ===== Header shadow + back-to-top on scroll =====
const header = document.getElementById("header");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 40);
  backToTop.classList.toggle("show", y > 500);
});

// ===== Reveal on scroll =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ===== Language switch (EN / ID) =====
const langButtons = document.querySelectorAll(".lang-switch button");

function setLanguage(lang) {
  // Text content (supports inline HTML like <strong>, <span>)
  document.querySelectorAll(".i18n").forEach((el) => {
    const val = el.getAttribute("data-" + lang);
    if (val !== null) el.innerHTML = val;
  });
  // Form placeholders
  document.querySelectorAll(".i18n-ph").forEach((el) => {
    const val = el.getAttribute("data-" + lang + "-ph");
    if (val !== null) el.setAttribute("placeholder", val);
  });
  // Active button state
  langButtons.forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
  // Reflect on <html> and remember choice
  document.documentElement.lang = lang;
  try { localStorage.setItem("portfolio-lang", lang); } catch (e) {}
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

// Restore saved language (default English)
let savedLang = "en";
try { savedLang = localStorage.getItem("portfolio-lang") || "en"; } catch (e) {}
setLanguage(savedLang);

// ===== Certificate popup =====
const popup = document.getElementById("certPopup");
const popupImg = document.getElementById("popupImg");
const closePopup = document.getElementById("closePopup");

document.querySelectorAll(".cert-card").forEach((card) => {
  const img = card.querySelector("img");
  const btn = card.querySelector(".cert-open-btn");
  if (!btn) return;
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    popup.style.display = "flex";
    popupImg.src = img.src;
  });
});

closePopup.addEventListener("click", () => (popup.style.display = "none"));
popup.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") popup.style.display = "none";
});
