/**
 * Tremendo Café Bistró — servidor estático para Railway.
 * Sirve el sitio (HTML/CSS/JS + media) y escucha en el puerto que provee Railway.
 */
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

// Salud: Railway puede usarlo como healthcheck.
app.get("/healthz", (_req, res) => res.status(200).send("ok"));

// Cabeceras de caché razonables para los estáticos.
app.use(
  express.static(ROOT, {
    extensions: ["html"],
    setHeaders(res, filePath) {
      if (/\.(?:mp4|jpg|jpeg|png|webp|pdf|woff2?)$/i.test(filePath)) {
        res.setHeader("Cache-Control", "public, max-age=604800"); // 7 días
      } else if (/\.(?:css|js)$/i.test(filePath)) {
        res.setHeader("Cache-Control", "public, max-age=86400"); // 1 día
      } else {
        res.setHeader("Cache-Control", "public, max-age=300");
      }
    },
  })
);

// Fallback a index.html (sin patrón de ruta -> compatible con Express 4 y 5).
app.use((req, res) => {
  const indexPath = path.join(ROOT, "index.html");
  if (fs.existsSync(indexPath)) return res.status(200).sendFile(indexPath);
  res.status(404).send("Not found");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`☕  Tremendo Café Bistró sirviendo en el puerto ${PORT}`);
});
