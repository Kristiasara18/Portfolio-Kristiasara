// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// ===== LANGUAGE (EN / ID) TOGGLE =====
const translations = {
  en: {
    "nav.home": "Home",
    "nav.experience": "Experience",
    "nav.portfolio": "Portfolio",
    "nav.certificates": "Certificate",
    "nav.contact": "Contact",

    "home.greeting": "Hello, I'm <span>Kristiasara Natamora</span>",
    "home.p1": "I am a seventh-semester <strong>Computer Engineering</strong> student at Multimedia Nusantara University, currently interning as a UI/UX Frontend Developer at PT Indocyber Global Teknologi. My academic interests include web development, embedded systems, networking, image processing, and Python programming, which have helped me build a strong technical foundation in how software and hardware integrate to create effective computing solutions.",
    "home.p2": "Alongside my studies, I have actively participated in organizational activities that strengthened my skills in MS Excel, data management, teamwork, coordination, communication, and content writing. These experiences also enhanced my leadership, public speaking, event coordination, and time-management abilities. Driven by digital innovation and continuous learning, I enjoy collaborating in team environments, contributing to user-oriented solutions, and expanding my technical expertise while applying my organizational skills to support impactful and efficient technology development.",

    "experience.title": "Work Experience",
    "experience.date": "2025 – Present",
    "experience.role": "UI/UX Frontend Developer Intern",
    "experience.desc": "Contributing to the company's website revamp project across a Next.js frontend and a CoreUI-based CMS. Responsibilities include building CMS-managed responsive layouts, configuring Content Security Policy for Google Tag Manager and Google Ads conversion tracking, and implementing responsive UI components sourced from CKEditor content.",

    "projects.title": "Portfolio",
    "projects.completed": "Completed Projects",
    "projects.visit": "Visit Project ↗",
    "projects.pervasiveRepo": "Pervasive Repo ↗",
    "projects.embeddedRepo": "Embedded Repo ↗",
    "projects.demoVideo": "Demo Video ↗",
    "projects.gdc.desc": "Developed a responsive web interface using HTML, CSS, and JavaScript for a student organization (UKM/LSO) at Multimedia Nusantara University, in collaboration with Game Development UMN.",
    "projects.everynation.desc": "Built a full-stack website using HTML, PHP, Laravel, CSS, API, and MySQL for a client-based project, delivering a complete and client-oriented web solution for Every Nation Gading Serpong.",
    "projects.smarthelmet.desc": "Built a pervasive/embedded system interface for a smart helmet with a simulated sensor data pipeline. Developed the frontend with React.js and the backend with PHP, JavaScript, and MySQL for data processing and communication.",

    "certificates.title": "Certificate",
    "certificates.issuer": "Huawei ICT Academy",
    "certificates.issued": "Issued: July 2025",
    "certificates.desc": "Completed foundational training in database systems with openGauss, focusing on database architecture, data management, and system fundamentals.",

    "contact.title1": "Contact",
    "contact.title2": "Me.",
    "contact.desc": "If you need support in software development, IT networking, or embedded development, feel free to reach out.",
    "contact.send": "Send Message",
    "contact.form.name": "Your Name",
    "contact.form.email": "Your Email",
    "contact.form.subject": "Subject",
    "contact.form.message": "Your Message",

    "footer.text": "© 2025 Kristiasara Natamora — All Rights Reserved."
  },
  id: {
    "nav.home": "Beranda",
    "nav.experience": "Pengalaman",
    "nav.portfolio": "Portofolio",
    "nav.certificates": "Sertifikat",
    "nav.contact": "Kontak",

    "home.greeting": "Halo, saya <span>Kristiasara Natamora</span>",
    "home.p1": "Saya adalah mahasiswa <strong>Teknik Komputer</strong> semester 7 di Universitas Multimedia Nusantara, saat ini menjalani magang sebagai UI/UX Frontend Developer di PT Indocyber Global Teknologi. Minat akademis saya meliputi pengembangan web, sistem tertanam (embedded system), jaringan, pengolahan citra, dan pemrograman Python, yang membangun fondasi teknis kuat dalam memahami integrasi perangkat lunak dan perangkat keras untuk menciptakan solusi komputasi yang efektif.",
    "home.p2": "Selain studi, saya aktif dalam berbagai kegiatan organisasi yang memperkuat kemampuan saya dalam MS Excel, manajemen data, kerja sama tim, koordinasi, komunikasi, dan penulisan konten. Pengalaman ini juga meningkatkan kemampuan kepemimpinan, public speaking, koordinasi acara, dan manajemen waktu saya. Didorong oleh inovasi digital dan pembelajaran berkelanjutan, saya senang berkolaborasi dalam tim, berkontribusi pada solusi yang berorientasi pengguna, serta terus mengembangkan keahlian teknis sambil menerapkan kemampuan organisasi untuk mendukung pengembangan teknologi yang berdampak dan efisien.",

    "experience.title": "Pengalaman Kerja",
    "experience.date": "2025 – Sekarang",
    "experience.role": "UI/UX Frontend Developer (Magang)",
    "experience.desc": "Berkontribusi dalam proyek revamp website perusahaan yang mencakup frontend Next.js dan CMS berbasis CoreUI. Tanggung jawab meliputi membangun layout responsif yang dikelola CMS, mengonfigurasi Content Security Policy untuk Google Tag Manager dan Google Ads conversion tracking, serta mengimplementasikan komponen UI responsif untuk konten dari CKEditor.",

    "projects.title": "Portofolio",
    "projects.completed": "Proyek Selesai",
    "projects.visit": "Kunjungi Proyek ↗",
    "projects.pervasiveRepo": "Repo Pervasive ↗",
    "projects.embeddedRepo": "Repo Embedded ↗",
    "projects.demoVideo": "Video Demo ↗",
    "projects.gdc.desc": "Mengembangkan antarmuka web responsif menggunakan HTML, CSS, dan JavaScript untuk salah satu organisasi mahasiswa (UKM/LSO) di Universitas Multimedia Nusantara, berkolaborasi dengan Game Development UMN.",
    "projects.everynation.desc": "Membangun website full-stack menggunakan HTML, PHP, Laravel, CSS, API, dan MySQL untuk proyek berbasis klien, menghasilkan solusi web yang lengkap dan sesuai kebutuhan Every Nation Gading Serpong.",
    "projects.smarthelmet.desc": "Membangun antarmuka sistem pervasive/embedded untuk helm pintar dengan alur data sensor yang disimulasikan. Frontend dikembangkan menggunakan React.js, sedangkan backend menggunakan PHP, JavaScript, dan MySQL untuk pemrosesan dan komunikasi data.",

    "certificates.title": "Sertifikat",
    "certificates.issuer": "Huawei ICT Academy",
    "certificates.issued": "Diterbitkan: Juli 2025",
    "certificates.desc": "Menyelesaikan pelatihan dasar sistem basis data dengan openGauss, dengan fokus pada arsitektur basis data, manajemen data, dan dasar-dasar sistem.",

    "contact.title1": "Hubungi",
    "contact.title2": "Saya.",
    "contact.desc": "Jika Anda membutuhkan bantuan dalam pengembangan perangkat lunak, jaringan IT, atau pengembangan embedded, jangan ragu untuk menghubungi saya.",
    "contact.send": "Kirim Pesan",
    "contact.form.name": "Nama Anda",
    "contact.form.email": "Email Anda",
    "contact.form.subject": "Subjek",
    "contact.form.message": "Pesan Anda",

    "footer.text": "© 2025 Kristiasara Natamora — Seluruh Hak Cipta Dilindungi."
  }
};

const langToggleBtn = document.getElementById("lang-toggle");

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key] !== undefined) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.getAttribute("data-i18n-html");
    if (translations[lang][key] !== undefined) {
      el.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang][key] !== undefined) {
      el.setAttribute("placeholder", translations[lang][key]);
    }
  });

  // Button shows the language you'd switch TO
  langToggleBtn.textContent = lang === "en" ? "ID" : "EN";
  localStorage.setItem("portfolio-lang", lang);
}

let currentLang = localStorage.getItem("portfolio-lang") || "en";
applyLanguage(currentLang);

langToggleBtn.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "id" : "en";
  applyLanguage(currentLang);
});
