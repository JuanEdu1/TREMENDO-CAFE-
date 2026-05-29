# Tremendo Café Bistró — Sitio web

Landing page de una sola página para **Tremendo Café Bistró**, cafetería ubicada en
el C.C. Primavera Urbana (Local 157), Villavicencio, Meta.

> *«Tremendo es estar sin querer irse»*

## ✨ Características

- **Diseño editorial orgánico** con la identidad real de la marca (oliva + terracota + crema).
- **Hero con video** de fondo y tipografía display.
- **Menú completo interactivo** (8 categorías con filtros) extraído de la carta oficial 2026.
- **Carta original** consultable en modal + descarga del PDF.
- **Especialidades** con fotos reales de los platos.
- **Galería** auto-deslizante.
- **Sección "Visítanos"** con mapa de Google, horarios y contactos.
- **Botón flotante de WhatsApp** y enlaces a redes.
- **100 % responsive** (móvil, tablet, escritorio) y accesible.
- Sin frameworks: HTML + CSS + JavaScript puro. Carga rápido y se despliega en cualquier hosting.

## 📁 Estructura

```
.
├── index.html              # Página principal
├── css/styles.css          # Estilos (paleta, tipografías, responsive)
├── js/
│   ├── menu-data.js        # Datos del menú (precios carta 2026)
│   └── main.js             # Interactividad (nav, filtros, modal, animaciones)
├── assets/
│   ├── img/                # Logo optimizado para web
│   ├── food/               # Fotos de los platos
│   ├── menu/               # Carta original (PNG + PDF descargable)
│   └── favicon-*.png
├── static/                 # Material original de marca (logo, video, imagen)
├── server.js               # Servidor Express (sirve el sitio en Railway)
├── package.json            # Dependencias y script `start`
└── railway.json            # Configuración de despliegue en Railway
```

## ▶️ Ver en local

```bash
npm install
npm start
# abrir http://127.0.0.1:3000
```

> Sin Node también funciona con cualquier servidor estático, p. ej. `python -m http.server 8099`.

## 🚀 Despliegue en Railway

El proyecto ya está listo para [Railway](https://railway.app):

1. En Railway: **New Project → Deploy from GitHub repo** y elige
   `JuanEdu1/TREMENDO-CAFE-`.
2. Railway detecta Node (Nixpacks), ejecuta `npm install` y `npm start`
   automáticamente — no hay que configurar nada más.
3. El servidor (`server.js`) escucha en `process.env.PORT` que Railway inyecta.
   El healthcheck está en `/healthz`.
4. Cuando termine el deploy, en **Settings → Networking → Generate Domain**
   obtienes la URL pública.

Cada `git push` a `main` vuelve a desplegar automáticamente.

> También puede subirse como sitio estático a Netlify, Vercel, GitHub Pages o
> Cloudflare Pages (en ese caso `server.js`/`package.json` no se usan).

## 📇 Datos del negocio

| | |
|---|---|
| **Dirección** | C.C. Primavera Urbana · Primer piso · Local 157 — Calle 15 #40-01, Villavicencio |
| **Horario** | Dom–Jue 11:00 a.m.–8:00 p.m. · Vie–Sáb 11:00 a.m.–9:00 p.m. |
| **WhatsApp** | 321 439 2705 |
| **Teléfono** | (608) 677 9985 |
| **Instagram / Facebook** | [@tremendocafebistro](https://www.instagram.com/tremendocafebistro/) |

---

Para actualizar precios o platos, edita **`js/menu-data.js`** — el menú se genera solo.
