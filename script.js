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

// ===== Contact form → email + success popup =====
const contactForm = document.getElementById("contactForm");
const formPopup = document.getElementById("formPopup");
const formPopupClose = document.getElementById("formPopupClose");
const fpIcon = document.getElementById("fpIcon");
const fpTitle = document.getElementById("fpTitle");
const fpText = document.getElementById("fpText");

// Bilingual popup messages
const FP_MESSAGES = {
  success: {
    icon: '<i class="fa-solid fa-check"></i>',
    title: { en: "Message Sent!", id: "Pesan Terkirim!" },
    text: {
      en: "Thank you for reaching out. Your message has been delivered — I'll get back to you soon.",
      id: "Terima kasih telah menghubungi. Pesan Anda sudah terkirim — saya akan segera membalas.",
    },
  },
  error: {
    icon: '<i class="fa-solid fa-xmark"></i>',
    title: { en: "Something went wrong", id: "Terjadi kesalahan" },
    text: {
      en: "Your message couldn't be sent right now. Please try again, or email me directly at kristiasarasara@gmail.com.",
      id: "Pesan Anda belum dapat dikirim. Silakan coba lagi, atau email langsung ke kristiasarasara@gmail.com.",
    },
  },
};

function currentLang() {
  return document.documentElement.lang === "id" ? "id" : "en";
}

function showFormPopup(type) {
  const msg = FP_MESSAGES[type];
  const lang = currentLang();
  fpIcon.innerHTML = msg.icon;
  fpIcon.classList.toggle("error", type === "error");
  // Update text + keep i18n data attributes in sync so language toggle still works
  fpTitle.textContent = msg.title[lang];
  fpTitle.setAttribute("data-en", msg.title.en);
  fpTitle.setAttribute("data-id", msg.title.id);
  fpText.textContent = msg.text[lang];
  fpText.setAttribute("data-en", msg.text.en);
  fpText.setAttribute("data-id", msg.text.id);
  formPopup.classList.add("show");
}

function hideFormPopup() {
  formPopup.classList.remove("show");
}

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const endpoint = contactForm.action.replace(
      "formsubmit.co/",
      "formsubmit.co/ajax/"
    );
    btn.classList.add("sending");
    btn.disabled = true;
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(contactForm),
      });
      if (res.ok) {
        showFormPopup("success");
        contactForm.reset();
      } else {
        showFormPopup("error");
      }
    } catch (err) {
      showFormPopup("error");
    } finally {
      btn.classList.remove("sending");
      btn.disabled = false;
    }
  });
}

if (formPopupClose) formPopupClose.addEventListener("click", hideFormPopup);
if (formPopup)
  formPopup.addEventListener("click", (e) => {
    if (e.target === formPopup) hideFormPopup();
  });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideFormPopup();
});
