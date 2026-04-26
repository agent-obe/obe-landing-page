(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var items = [].slice.call(document.querySelectorAll("[data-reveal]"));

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var i = items.indexOf(el);
          if (i >= 0) {
            el.style.transitionDelay = (i % 8) * 0.03 + "s";
          }
          el.classList.add("is-visible");
          obs.unobserve(el);
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );

    items.forEach(function (el) {
      obs.observe(el);
    });
  }

  function parallaxTilt() {
    if (reduceMotion) return;
    var glow = document.querySelector(".hero-glow");
    if (!glow) return;

    var onMove = function (e) {
      var w = window.innerWidth;
      var h = window.innerHeight;
      var x = (e.clientX - w * 0.5) / w;
      var y = (e.clientY - h * 0.5) / h;
      glow.style.transform =
        "translate(calc(-50% + " + x * 12 + "px), calc(-55% + " + y * 8 + "px))";
    };

    var th = null;
    window.addEventListener(
      "mousemove",
      function (e) {
        if (th) return;
        th = window.requestAnimationFrame(function () {
          th = null;
          onMove(e);
        });
      },
      { passive: true }
    );
  }

  function initHeaderAutoHide() {
    if (reduceMotion) return;
    var header = document.querySelector(".site-header");
    var nav = document.querySelector(".nav");
    if (!header) return;

    var lastY = window.pageYOffset;
    var raf = null;
    var HIDDEN = "is-header-hidden";
    var T_DOWN = 12;
    var T_UP = 8;
    var AT_TOP = 16;

    function isNavOpen() {
      return nav && nav.classList.contains("is-open");
    }

    function setHidden(hide) {
      if (isNavOpen()) {
        header.classList.remove(HIDDEN);
        return;
      }
      if (hide) header.classList.add(HIDDEN);
      else header.classList.remove(HIDDEN);
    }

    function onScroll() {
      if (raf !== null) return;
      raf = window.requestAnimationFrame(function () {
        raf = null;
        var y = window.pageYOffset;
        if (y < AT_TOP) {
          setHidden(false);
          lastY = y;
          return;
        }
        var delta = y - lastY;
        if (delta > T_DOWN) {
          setHidden(true);
        } else if (delta < -T_UP) {
          setHidden(false);
        }
        lastY = y;
      });
    }

    lastY = window.pageYOffset;
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.nav');
    var header = document.querySelector('.site-header');
    if (!toggle || !nav) return;

    var closeMenu = function () {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      nav.classList.remove('is-open');
      document.body.classList.remove('nav-open');
    };

    var openMenu = function () {
      if (header) header.classList.remove('is-header-hidden');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      nav.classList.add('is-open');
      document.body.classList.add('nav-open');
    };

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      if (expanded) closeMenu();
      else openMenu();
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 720) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initReveal();
      parallaxTilt();
      initHeaderAutoHide();
      initMobileNav();
    });
  } else {
    initReveal();
    parallaxTilt();
    initHeaderAutoHide();
    initMobileNav();
  }
})();
