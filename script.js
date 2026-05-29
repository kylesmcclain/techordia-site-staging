const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navGroups = document.querySelectorAll(".nav-group");
const themeToggle = document.querySelector("[data-theme-toggle]");

const setTheme = (theme, persist = true) => {
  const next = theme === "light" ? "light" : "dark";
  root.dataset.theme = next;
  if (themeToggle) {
    const isLight = next === "light";
    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.querySelector(".theme-toggle-text").textContent = isLight ? "Light" : "Dark";
  }
  if (persist) {
    try {
      localStorage.setItem("techordia-theme", next);
    } catch (error) {
      // Theme persistence is a convenience; the site still works without storage.
    }
  }
};

setTheme(root.dataset.theme || "dark", false);

themeToggle?.addEventListener("click", () => {
  setTheme(root.dataset.theme === "light" ? "dark" : "light");
});

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
}

navGroups.forEach((group) => {
  const trigger = group.querySelector(".nav-trigger");
  if (!trigger) return;

  trigger.addEventListener("click", () => {
    const next = !group.classList.contains("open");
    navGroups.forEach((other) => {
      if (other !== group) {
        other.classList.remove("open");
        other.querySelector(".nav-trigger")?.setAttribute("aria-expanded", "false");
      }
    });
    group.classList.toggle("open", next);
    trigger.setAttribute("aria-expanded", String(next));
  });
});

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  if (event.target.closest(".nav-group") || event.target.closest(".menu-toggle")) return;
  navGroups.forEach((group) => {
    group.classList.remove("open");
    group.querySelector(".nav-trigger")?.setAttribute("aria-expanded", "false");
  });
});

if (!reduceMotion) {
  window.addEventListener(
    "pointermove",
    (event) => {
      const x = event.clientX / Math.max(1, window.innerWidth);
      const y = event.clientY / Math.max(1, window.innerHeight);
      root.style.setProperty("--grid-x", `${((x - 0.5) * 26).toFixed(1)}px`);
      root.style.setProperty("--grid-y", `${((y - 0.5) * 22).toFixed(1)}px`);
    },
    { passive: true }
  );
}

const initVisualTilt = () => {
  if (reduceMotion) return;
  document.querySelectorAll(".visual").forEach((visual) => {
    visual.addEventListener(
      "pointermove",
      (event) => {
        const rect = visual.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        visual.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        visual.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
        visual.style.transform = `rotateX(${((0.5 - y) * 3.2).toFixed(2)}deg) rotateY(${((x - 0.5) * 4).toFixed(2)}deg)`;
      },
      { passive: true }
    );
    visual.addEventListener("pointerleave", () => {
      visual.style.transform = "";
    });
  });
};

const createNetworkCanvas = (canvas) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const nodes = [
    { label: "Techordia", x: 0.5, y: 0.5, r: 18, hub: true },
    { label: "Support", x: 0.18, y: 0.3, r: 8 },
    { label: "Devices", x: 0.32, y: 0.18, r: 7 },
    { label: "M365", x: 0.76, y: 0.26, r: 8 },
    { label: "Security", x: 0.82, y: 0.6, r: 8 },
    { label: "Backups", x: 0.58, y: 0.8, r: 8 },
    { label: "Vendors", x: 0.2, y: 0.72, r: 7 },
    { label: "Projects", x: 0.42, y: 0.74, r: 7 }
  ];
  const links = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
    [1, 2],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [2, 7]
  ];
  const state = { pointerX: 0.5, pointerY: 0.5, targetX: 0.5, targetY: 0.5, frame: 0 };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const getGlobe = (width, height) => ({
    cx: width * (width < 430 ? 0.5 : 0.54),
    cy: height * 0.5,
    r: Math.min(width, height) * (width < 430 ? 0.39 : 0.43)
  });

  const point = (node, width, height, globe) => {
    const mobileScale = width < 430 ? 0.78 : 1;
    const driftScale = width < 430 ? 0.55 : 1;
    const driftX = (state.pointerX - 0.5) * (node.hub ? 16 : 34) * driftScale;
    const driftY = (state.pointerY - 0.5) * (node.hub ? 14 : 28) * driftScale;
    const x = globe.cx + (node.x - 0.5) * globe.r * 1.62 * mobileScale + driftX;
    const y = globe.cy + (node.y - 0.5) * globe.r * 1.48 * mobileScale + driftY;
    return { x, y };
  };

  const draw = (time = 0) => {
    state.frame += 1;
    if (reduceMotion) {
      state.pointerX = state.targetX;
      state.pointerY = state.targetY;
    } else {
      state.pointerX += (state.targetX - state.pointerX) * 0.08;
      state.pointerY += (state.targetY - state.pointerY) * 0.08;
    }

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const globe = getGlobe(width, height);
    ctx.clearRect(0, 0, width, height);

    const grd = ctx.createRadialGradient(globe.cx - globe.r * 0.18, globe.cy - globe.r * 0.08, 18, globe.cx, globe.cy, globe.r);
    grd.addColorStop(0, "rgba(18, 199, 239, 0.52)");
    grd.addColorStop(0.42, "rgba(7, 95, 206, 0.25)");
    grd.addColorStop(1, "rgba(1, 12, 31, 0.04)");
    ctx.save();
    ctx.beginPath();
    ctx.arc(globe.cx, globe.cy, globe.r, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = grd;
    ctx.fillRect(globe.cx - globe.r, globe.cy - globe.r, globe.r * 2, globe.r * 2);

    ctx.translate(globe.cx, globe.cy);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 7; i += 1) {
      ctx.beginPath();
      ctx.ellipse(0, 0, globe.r * (0.42 + i * 0.08), globe.r * (0.16 + i * 0.035), (i * Math.PI) / 7, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (let i = -2; i <= 2; i += 1) {
      ctx.beginPath();
      ctx.ellipse(i * globe.r * 0.18, 0, globe.r * 0.16, globe.r * 0.96, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
    ctx.beginPath();
    ctx.arc(globe.cx, globe.cy, globe.r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(18, 199, 239, 0.44)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const pts = nodes.map((node) => point(node, width, height, globe));
    links.forEach(([from, to], index) => {
      const a = pts[from];
      const b = pts[to];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo((a.x + b.x) / 2, (a.y + b.y) / 2 - 24, b.x, b.y);
      ctx.strokeStyle = index % 2 ? "rgba(18, 185, 179, 0.55)" : "rgba(18, 199, 239, 0.48)";
      ctx.lineWidth = 2;
      ctx.stroke();

      const t = (time * 0.00018 + index * 0.11) % 1;
      const cx = (1 - t) * (1 - t) * a.x + 2 * (1 - t) * t * ((a.x + b.x) / 2) + t * t * b.x;
      const cy = (1 - t) * (1 - t) * a.y + 2 * (1 - t) * t * ((a.y + b.y) / 2 - 24) + t * t * b.y;
      ctx.beginPath();
      ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#12b9b3";
      ctx.fill();
    });

    nodes.forEach((node, index) => {
      const p = pts[index];
      const pulse = node.hub ? 1 + Math.sin(time * 0.003) * 0.05 : 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, node.r * pulse + 18, 0, Math.PI * 2);
      ctx.fillStyle = node.hub ? "rgba(18, 199, 239, 0.22)" : "rgba(255, 255, 255, 0.1)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, node.r * pulse, 0, Math.PI * 2);
      ctx.fillStyle = node.hub ? "#12c7ef" : "#ffffff";
      ctx.strokeStyle = node.hub ? "#12b9b3" : "rgba(18, 199, 239, 0.72)";
      ctx.lineWidth = node.hub ? 3 : 2;
      ctx.fill();
      ctx.stroke();
      const mobile = width < 430;
      ctx.font = node.hub ? "900 16px Inter, sans-serif" : `800 ${mobile ? 11 : 12}px Inter, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      const hideMobileLabel = !node.label || (mobile && ["Backups", "Vendors", "Projects"].includes(node.label));
      if (!hideMobileLabel) {
        const labelInset = mobile ? 86 : 60;
        const labelX = Math.min(width - labelInset, Math.max(labelInset, p.x));
        ctx.fillText(node.label, labelX, p.y + node.r + 25);
      }
    });

    canvas.dataset.ready = "true";
    canvas.dataset.frame = String(state.frame);
    if (!reduceMotion) requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener("resize", resize);

  canvas.addEventListener(
    "pointermove",
    (event) => {
      const rect = canvas.getBoundingClientRect();
      state.targetX = (event.clientX - rect.left) / rect.width;
      state.targetY = (event.clientY - rect.top) / rect.height;
      canvas.dataset.pointer = `${state.targetX.toFixed(3)},${state.targetY.toFixed(3)}`;
      if (reduceMotion) requestAnimationFrame(draw);
    },
    { passive: true }
  );

  canvas.addEventListener("pointerleave", () => {
    state.targetX = 0.5;
    state.targetY = 0.5;
    canvas.dataset.pointer = "0.500,0.500";
  });

  requestAnimationFrame(draw);
};

const initServiceSelector = () => {
  const cards = [...document.querySelectorAll("[data-service-card]")];
  if (!cards.length) return;

  const setActive = (card) => {
    cards.forEach((item) => item.classList.toggle("is-active", item === card));
  };

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => setActive(card));
    card.addEventListener("focusin", () => setActive(card));
  });
  setActive(cards[0]);
};

const initFaqFilters = () => {
  document.querySelectorAll("[data-faq-section]").forEach((section) => {
    const buttons = [...section.querySelectorAll("[data-faq-filter]")];
    const items = [...section.querySelectorAll("[data-faq-item]")];
    if (!buttons.length || !items.length) return;

    const setFilter = (filter) => {
      buttons.forEach((button) => {
        const active = button.dataset.faqFilter === filter;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      items.forEach((item) => {
        const show = filter === "all" || item.dataset.faqItem === filter;
        item.hidden = !show;
        if (!show) item.removeAttribute("open");
      });
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => setFilter(button.dataset.faqFilter || "all"));
    });
    setFilter("all");
  });
};

const initContactForm = () => {
  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const recipient = form.getAttribute("data-contact-email") || "info@techordia.com";
      const subject = `Techordia IT review request from ${data.get("Company") || "website visitor"}`;
      const body = [
        `First name: ${data.get("First name") || ""}`,
        `Last name: ${data.get("Last name") || ""}`,
        `Company: ${data.get("Company") || ""}`,
        `Email: ${data.get("Email") || ""}`,
        `Support need: ${data.get("Support need") || ""}`,
        "",
        "What should we look at first?",
        data.get("Message") || ""
      ].join("\n");
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  });
};

const initReveal = () => {
  const targets = document.querySelectorAll(".section, .service-tile, .final-cta");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  targets.forEach((target) => observer.observe(target));
};

document.querySelectorAll("[data-network-canvas]").forEach((canvas) => createNetworkCanvas(canvas));
initVisualTilt();
initServiceSelector();
initFaqFilters();
initContactForm();
initReveal();
