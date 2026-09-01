# Draw Studio — sitio web (100% gratuito)

Sitio estático (HTML/CSS/JS puro, sin frameworks ni build) inspirado en el
sitio de tu cuñado, pero con stack completamente gratuito:

- **Catálogo** de productos con botón "Consultar por WhatsApp" (sin pasarela de pago).
- **Reservas online** vía [Cal.com](https://cal.com) (plan gratuito).
- **Blog** con posts en JSON, sin CMS.
- **Formulario de contacto** vía [Web3Forms](https://web3forms.com) (plan gratuito, sin backend).
- **Hosting** recomendado: [Cloudflare Pages](https://pages.cloudflare.com) (gratuito, subdominio incluido).

## 1. Personalizar

Edita **un solo archivo** para tus datos de contacto: `assets/js/config.js`.

```js
window.SITE_CONFIG = {
  nombreNegocio: "...",
  whatsappNumero: "593999999999", // sin + ni espacios
  correoContacto: "...",
  ubicacion: "...",
  calcomUsuario: "...",
  calcomEvento: "...",
  web3formsAccessKey: "...",
};
```

### Productos
Edita `data/productos.json`. Cada objeto es un producto (nombre, descripción, precio, imagen).
Las imágenes van en `assets/img/` (si falta una imagen, se muestra un marcador de posición automático, así que puedes lanzar el sitio sin fotos y agregarlas después).

### Blog
Edita `data/posts.json`. Cada objeto es un artículo (slug, título, fecha, resumen, imagen, `contenidoHtml` con el cuerpo en HTML simple).

### Reservas (Cal.com)
1. Crea una cuenta gratis en https://cal.com
2. Crea un "Event type" (ej. "Reserva de estación · 1 hora").
3. Copia tu usuario y el slug del evento en `calcomUsuario` / `calcomEvento` dentro de `config.js`.
4. La página `reservas.html` mostrará el calendario automáticamente. Mientras no lo configures, se muestra un aviso con opción de reservar por WhatsApp.

### Formulario de contacto (Web3Forms)
1. Entra a https://web3forms.com, ingresa tu correo y genera tu **Access Key** gratis (sin necesidad de crear contraseña).
2. Pega la key en `web3formsAccessKey` dentro de `config.js`.
3. Los mensajes del formulario de `contacto.html` llegarán directo a tu correo. Gratis hasta 250 envíos/mes.

## 2. Probar en tu computador

No necesitas instalar nada. Basta con abrir `index.html` en el navegador,
o para evitar restricciones de `fetch` en archivos locales, levantar un
servidor simple:

```bash
cd "Sitio WEB Cunado"
python3 -m http.server 8080
# abre http://localhost:8080
```

## 3. Publicar gratis (Cloudflare Pages — recomendado)

1. Crea un repositorio en GitHub (gratis) y sube esta carpeta:
   ```bash
   git add .
   git commit -m "Sitio inicial"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```
2. Entra a https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Selecciona tu repositorio. En "Build settings" deja todo vacío (framework: *None*, build command: vacío, output directory: `/`).
4. Click en **Save and Deploy**. En 1-2 minutos tendrás una URL gratis tipo `tusitio.pages.dev`.
5. (Opcional) Si compras un dominio propio en el futuro, lo conectas gratis desde **Custom domains** en el mismo proyecto.

### Alternativa: GitHub Pages (igual de gratis)
1. Sube el repo a GitHub (mismos pasos de arriba).
2. Ve a **Settings → Pages** del repositorio → Source: `main` branch, carpeta `/ (root)`.
3. Tu sitio quedará en `https://TU_USUARIO.github.io/TU_REPO/`.

## 4. Estructura del proyecto

```
index.html          Inicio
catalogo.html        Catálogo de productos
reservas.html         Reservas online (Cal.com)
blog.html             Listado de blog
post.html             Artículo individual (?slug=...)
contacto.html          Formulario + WhatsApp + correo
assets/css/style.css  Estilos (tema oscuro, responsive)
assets/js/config.js    ← Edita aquí tus datos
assets/js/*.js         Lógica de cada página
data/productos.json    Catálogo
data/posts.json        Artículos del blog
assets/img/            Imágenes (opcional, hay fallback automático)
```

## Costo total: **$0**
Todo el stack (hosting, formulario, reservas, dominio `.pages.dev`) es gratuito.
El único costo futuro y opcional es un dominio propio (ej. `.com`), si algún día lo quieres.
