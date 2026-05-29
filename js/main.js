/* ============================================================
   TREMENDO CAFÉ BISTRÓ — main.js
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  /* -------- Preloader -------- */
  window.addEventListener("load", () => {
    const pre = $("#preloader");
    if (pre) setTimeout(() => pre.classList.add("is-done"), 900);
  });

  /* -------- Year -------- */
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  /* -------- Nav: scroll state + back-to-top -------- */
  const nav = $("#nav");
  const toTop = $("#toTop");
  const onScroll = () => {
    const sy = window.scrollY;
    if (nav) nav.classList.toggle("is-scrolled", sy > 40);
    if (toTop) toTop.classList.toggle("is-visible", sy > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* -------- Mobile nav -------- */
  const toggle = $("#navToggle");
  const links = $("#navLinks");
  const closeNav = () => {
    if (!links) return;
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
  };
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    $$("a", links).forEach((a) => a.addEventListener("click", closeNav));
  }

  /* -------- Build menu panels from data -------- */
  const data = window.TREMENDO_MENU || {};
  const panels = $("#menuPanels");
  const tabs = $$(".menu__tab");

  function itemHTML(it) {
    const tag = it.tag ? `<span class="menu-item__tag">${it.tag}</span>` : "";
    const desc = it.d ? `<span class="menu-item__desc">${it.d}</span>` : "";
    return `
      <div class="menu-item">
        <span class="menu-item__main">
          <span class="menu-item__name">${it.n}${tag}</span>
          ${desc}
        </span>
        <span class="menu-item__dots"></span>
        <span class="menu-item__price">${it.p}</span>
      </div>`;
  }

  function panelHTML(key, cat) {
    const groups = cat.groups
      .map(
        (g) => `
        <div class="menu-group">
          <h4 class="menu-group__name">${g.name}</h4>
          ${g.items.map(itemHTML).join("")}
        </div>`
      )
      .join("");
    return `
      <div class="menu-panel" id="panel-${key}" role="tabpanel">
        <div class="menu-panel__head">
          <h3 class="display">${cat.title}</h3>
          ${cat.note ? `<p>${cat.note}</p>` : ""}
        </div>
        <div class="menu-cols">${groups}</div>
      </div>`;
  }

  if (panels) {
    panels.innerHTML = Object.entries(data)
      .map(([key, cat]) => panelHTML(key, cat))
      .join("");
    // activate first
    const first = $(".menu-panel", panels);
    if (first) first.classList.add("is-active");
  }

  /* -------- Menu tabs -------- */
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const cat = tab.dataset.cat;
      tabs.forEach((t) => t.classList.toggle("is-active", t === tab));
      $$(".menu-panel").forEach((p) =>
        p.classList.toggle("is-active", p.id === `panel-${cat}`)
      );
    });
  });

  /* -------- Reveal on scroll -------- */
  const revealEls = $$("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  /* -------- Modal -------- */
  const modal = $("#menuModal");
  const openBtn = $("#openMenuModal");
  const openModal = () => {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  if (openBtn) openBtn.addEventListener("click", openModal);
  if (modal) {
    $$("[data-close]", modal).forEach((el) => el.addEventListener("click", closeModal));
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  /* -------- Active nav link on scroll (scrollspy) -------- */
  const sections = ["concepto", "especialidades", "menu", "experiencia", "visitanos"]
    .map((id) => $("#" + id))
    .filter(Boolean);
  const navAnchors = $$("#navLinks a:not(.nav__cta)");
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.id;
            navAnchors.forEach((a) =>
              a.classList.toggle("is-current", a.getAttribute("href") === "#" + id)
            );
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* -------- Hero video: ensure autoplay resilience -------- */
  const hv = $("#heroVideo");
  if (hv) {
    hv.play().catch(() => {
      // Autoplay blocked: poster image stays. Try on first interaction.
      const tryPlay = () => {
        hv.play().catch(() => {});
        window.removeEventListener("touchstart", tryPlay);
        window.removeEventListener("click", tryPlay);
      };
      window.addEventListener("touchstart", tryPlay, { once: true });
      window.addEventListener("click", tryPlay, { once: true });
    });
  }
})();
