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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initReveal();
      parallaxTilt();
    });
  } else {
    initReveal();
    parallaxTilt();
  }
})();
