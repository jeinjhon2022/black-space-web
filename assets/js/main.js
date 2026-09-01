/* Comportamiento compartido: menú móvil, año del footer, botón flotante de WhatsApp */
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("nav.main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Botón flotante de WhatsApp (usa el número configurado en config.js)
  var cfg = window.SITE_CONFIG || {};
  if (cfg.whatsappNumero) {
    var a = document.createElement("a");
    a.href = "https://wa.me/" + cfg.whatsappNumero + "?text=" + encodeURIComponent("Hola, quiero más información sobre " + (cfg.nombreNegocio || "sus productos") + ".");
    a.className = "wa-float";
    a.target = "_blank";
    a.rel = "noopener";
    a.title = "Escríbenos por WhatsApp";
    a.textContent = "💬";
    document.body.appendChild(a);
  }

  // Contadores animados (barra de estadísticas), se disparan al entrar en pantalla
  var counters = document.querySelectorAll("[data-counter]");
  if (counters.length && "IntersectionObserver" in window) {
    var animateCounter = function (el, target, duration) {
      var start = null;
      var step = function (ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        el.textContent = Math.floor(progress * target).toLocaleString("es-ES");
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target, parseInt(entry.target.getAttribute("data-counter"), 10), 1400);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(function (el) { obs.observe(el); });
  }

  // Rellenar nombre del negocio / correo donde exista el marcador de datos
  document.querySelectorAll("[data-brand]").forEach(function (el) {
    el.textContent = cfg.nombreNegocio || "";
  });
  document.querySelectorAll("[data-email]").forEach(function (el) {
    el.textContent = cfg.correoContacto || "";
    if (el.tagName === "A") el.href = "mailto:" + (cfg.correoContacto || "");
  });
  document.querySelectorAll("[data-ubicacion]").forEach(function (el) {
    el.textContent = cfg.ubicacion || "";
  });
})();
