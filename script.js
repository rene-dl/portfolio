(function () {
  "use strict";

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
