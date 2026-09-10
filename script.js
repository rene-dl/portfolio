(function () {
  "use strict";

  /* ---------- Language switch ---------- */
  var LANG_KEY = "rd-portfolio-lang";
  var langButtons = document.querySelectorAll("[data-lang-btn]");

  function detectDefaultLang() {
    var saved = null;
    try {
      saved = window.localStorage.getItem(LANG_KEY);
    } catch (e) {
      saved = null;
    }
    if (saved === "en" || saved === "es") return saved;
    var nav = (window.navigator.language || "es").toLowerCase();
    return nav.indexOf("es") === 0 ? "es" : "en";
  }

  function applyLang(lang) {
    if (!window.TRANSLATIONS || !window.TRANSLATIONS[lang]) return;
    var dict = window.TRANSLATIONS[lang];

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!dict.hasOwnProperty(key)) return;
      var attr = el.getAttribute("data-i18n-attr");
      if (attr) {
        el.setAttribute(attr, dict[key]);
      } else {
        el.textContent = dict[key];
      }
    });

    document.documentElement.setAttribute("lang", lang);

    langButtons.forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang-btn") === lang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    try {
      window.localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      /* localStorage unavailable — language just won't persist across visits */
    }
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLang(btn.getAttribute("data-lang-btn"));
    });
  });

  applyLang(detectDefaultLang());

  /* ---------- Sticky nav border on scroll ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 8) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var navToggle = document.getElementById("navToggle");
  navToggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.querySelectorAll(".nav-mobile a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Case study modals ---------- */
  var openTriggers = document.querySelectorAll("[data-modal-target]");
  var lastFocused = null;

  function openModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    var closeBtn = modal.querySelector("[data-modal-close]");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  openTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      openModal(trigger.getAttribute("data-modal-target"));
    });
  });

  document.querySelectorAll(".modal-backdrop").forEach(function (backdrop) {
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) closeModal(backdrop);
    });
    var closeBtn = backdrop.querySelector("[data-modal-close]");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        closeModal(backdrop);
      });
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var openModalEl = document.querySelector(".modal-backdrop.is-open");
      if (openModalEl) closeModal(openModalEl);
    }
  });

  /* ---------- Scroll reveal (single subtle pattern) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
