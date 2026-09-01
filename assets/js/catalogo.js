(function () {
  var grid = document.getElementById("productos-grid");
  if (!grid) return;

  fetch("data/productos.json")
    .then(function (r) { return r.json(); })
    .then(renderProductos)
    .catch(function () {
      grid.innerHTML = '<p class="empty-state">No se pudieron cargar los productos.</p>';
    });

  function renderProductos(productos) {
    var cfg = window.SITE_CONFIG || {};
    if (!productos.length) {
      grid.innerHTML = '<p class="empty-state">Aún no hay productos publicados.</p>';
      return;
    }
    grid.innerHTML = productos.map(function (p) {
      var msg = encodeURIComponent("Hola, quiero consultar por: " + p.nombre);
      var waLink = cfg.whatsappNumero ? "https://wa.me/" + cfg.whatsappNumero + "?text=" + msg : "#";
      return (
        '<div class="card">' +
          '<img src="' + p.img + '" alt="' + p.nombre + '" loading="lazy" onerror="this.src=\'https://placehold.co/600x450/23262e/a7abb5?text=' + encodeURIComponent(p.nombre) + '\'">' +
          '<div class="card-body">' +
            "<h3>" + p.nombre + "</h3>" +
            '<p class="desc">' + p.descripcion + "</p>" +
            '<div class="price">' + p.precio + "</div>" +
            '<a class="btn btn-primary" href="' + waLink + '" target="_blank" rel="noopener">Consultar por WhatsApp</a>' +
          "</div>" +
        "</div>"
      );
    }).join("");
  }
})();
