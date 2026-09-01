(function () {
  var list = document.getElementById("blog-list");
  var postView = document.getElementById("post-view");

  if (list) {
    fetch("data/posts.json")
      .then(function (r) { return r.json(); })
      .then(renderLista)
      .catch(function () {
        list.innerHTML = '<p class="empty-state">No se pudieron cargar los artículos.</p>';
      });
  }

  if (postView) {
    var slug = new URLSearchParams(window.location.search).get("slug");
    fetch("data/posts.json")
      .then(function (r) { return r.json(); })
      .then(function (posts) { renderPost(posts, slug); })
      .catch(function () {
        postView.innerHTML = '<p class="empty-state">No se pudo cargar el artículo.</p>';
      });
  }

  function renderLista(posts) {
    if (!posts.length) {
      list.innerHTML = '<p class="empty-state">Aún no hay publicaciones.</p>';
      return;
    }
    var limit = parseInt(list.getAttribute("data-limit"), 10);
    var ordenados = posts.slice().sort(function (a, b) { return new Date(b.fecha) - new Date(a.fecha); });
    if (limit) ordenados = ordenados.slice(0, limit);
    ordenados.forEach(function (p) {
        var card = document.createElement("a");
        card.className = "card";
        card.href = "post.html?slug=" + encodeURIComponent(p.slug);
        card.innerHTML =
          '<img src="' + p.img + '" alt="' + p.titulo + '" loading="lazy" onerror="this.src=\'https://placehold.co/600x400/23262e/a7abb5?text=Blog\'">' +
          '<div class="card-body post-card">' +
            '<div class="post-meta">' + formatFecha(p.fecha) + "</div>" +
            "<h3>" + p.titulo + "</h3>" +
            '<p class="desc">' + p.resumen + "</p>" +
          "</div>";
        list.appendChild(card);
      });
  }

  function renderPost(posts, slug) {
    var post = posts.find(function (p) { return p.slug === slug; });
    if (!post) {
      postView.innerHTML = '<p class="empty-state">Artículo no encontrado. <a href="blog.html">Volver al blog</a></p>';
      return;
    }
    document.title = post.titulo + " — Blog";
    postView.innerHTML =
      '<div class="post-meta">' + formatFecha(post.fecha) + "</div>" +
      "<h1>" + post.titulo + "</h1>" +
      '<img src="' + post.img + '" alt="' + post.titulo + '" onerror="this.style.display=\'none\'">' +
      post.contenidoHtml +
      '<p><a class="btn btn-outline" href="blog.html">&larr; Volver al blog</a></p>';
  }

  function formatFecha(iso) {
    try {
      return new Date(iso).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
    } catch (e) {
      return iso;
    }
  }
})();
