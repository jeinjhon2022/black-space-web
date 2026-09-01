(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;
  var msgEl = document.getElementById("form-msg");
  var cfg = window.SITE_CONFIG || {};

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!cfg.web3formsAccessKey || cfg.web3formsAccessKey === "PEGA_AQUI_TU_ACCESS_KEY") {
      msgEl.textContent = "Formulario no configurado todavía: agrega tu Access Key gratuita de Web3Forms en assets/js/config.js.";
      msgEl.className = "form-msg err";
      return;
    }

    var btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.textContent = "Enviando...";

    var formData = new FormData(form);
    formData.append("access_key", cfg.web3formsAccessKey);
    formData.append("subject", "Nuevo mensaje desde " + (cfg.nombreNegocio || "el sitio web"));

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.success) {
          msgEl.textContent = "¡Gracias! Tu mensaje fue enviado. Te responderemos pronto.";
          msgEl.className = "form-msg ok";
          form.reset();
        } else {
          throw new Error(data.message || "Error desconocido");
        }
      })
      .catch(function () {
        msgEl.textContent = "Hubo un problema al enviar el mensaje. Intenta por WhatsApp.";
        msgEl.className = "form-msg err";
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = "Enviar mensaje";
      });
  });
})();
