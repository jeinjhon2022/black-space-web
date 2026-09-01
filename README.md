# Black Space — sitio web (100% gratuito)

Sitio estático (HTML/CSS/JS puro, sin frameworks ni build), con una estética
propia de "mesa de dibujo técnico" (blueprint: azul marino, papel
cuadriculado, anotaciones monoespaciadas). Stack completamente gratuito:

- **Catálogo** de productos con botón "Consultar por WhatsApp" (sin pasarela de pago).
- **Reservas online** vía [Cal.com](https://cal.com) (plan gratuito).
- **Formulario de contacto** vía [Web3Forms](https://web3forms.com) (plan gratuito, sin backend).
- **Hosting**: [Cloudflare Workers (static assets)](https://developers.cloudflare.com/workers/static-assets/) — gratuito, subdominio incluido.

**Sitio en vivo**: https://black-space-web.john-jairo-leiva.workers.dev
**Repositorio**: https://github.com/jeinjhon2022/black-space-web

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

Los valores de `whatsappNumero` y `correoContacto` son **ficticios** hasta que los reemplaces por los reales.

### Productos
Edita `data/productos.json`. Cada objeto es un producto (nombre, descripción, precio, imagen).
Las imágenes van en `assets/img/` (si falta una imagen, se muestra un marcador de posición automático, así que puedes lanzar el sitio sin fotos y agregarlas después).

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

## 3. Publicar cambios

El proyecto ya está conectado a Cloudflare (Compute → Workers & Pages) vía Git.
Cada `git push` a `main` dispara un despliegue automático en 1-2 minutos:

```bash
git add .
git commit -m "Tu cambio"
git push
```

La configuración de despliegue vive en `wrangler.toml` (sirve todo el
directorio como archivos estáticos, sin build ni servidor).

## 4. Estructura del proyecto

```
index.html             Inicio
catalogo.html           Catálogo de productos
reservas.html            Reservas online (Cal.com)
contacto.html             Formulario + WhatsApp + correo
wrangler.toml              Config de despliegue en Cloudflare (assets estáticos)
assets/css/style.css   Estilos (tema blueprint, responsive)
assets/js/config.js     ← Edita aquí tus datos
assets/js/*.js          Lógica de cada página
data/productos.json     Catálogo
assets/img/             Imágenes (opcional, hay fallback automático)
```

## Costo total: **$0**
Todo el stack (hosting, formulario, reservas, subdominio `.workers.dev`) es gratuito.
El único costo futuro y opcional es un dominio propio (ej. `.com`), si algún día lo quieres.
