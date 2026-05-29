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
└── static/                 # Material original de marca (logo, video, imagen)
```

## ▶️ Ver en local

Necesita un servidor (por el video y las fuentes). Desde esta carpeta:

```bash
python -m http.server 8099
# abrir http://127.0.0.1:8099
```

## 🚀 Despliegue

Es un sitio estático: súbelo tal cual a **Netlify**, **Vercel**, **GitHub Pages**,
**Cloudflare Pages** o cualquier hosting. No requiere build ni backend.

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
