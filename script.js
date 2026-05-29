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

  const dotField = [];
  for (let lat = -62; lat <= 66; lat += 8) {
    for (let lon = -176; lon <= 180; lon += 8) {
      const skip = Math.sin((lat * 17 + lon * 11) * 0.017) > 0.74;
      if (!skip) dotField.push({ lat: (lat * Math.PI) / 180, lon: (lon * Math.PI) / 180 });
    }
  }

  const routes = [
    { to: [-0.15, -0.68], label: "Support" },
    { to: [0.5, -0.48], label: "Microsoft 365" },
    { to: [0.64, -0.04], label: "Security" },
    { to: [0.34, 0.58], label: "Backups" },
    { to: [-0.55, 0.42], label: "Projects" }
  ];
  const state = { pointerX: 0.5, pointerY: 0.5, targetX: 0.5, targetY: 0.5, frame: 0 };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const getGlobe = (width, height) => {
    const small = width < 430;
    return {
      cx: width * (small ? 0.5 : 0.58),
      cy: height * (small ? 0.52 : 0.48),
      r: Math.min(width, height) * (small ? 0.41 : 0.46)
    };
  };

  const project = (lat, lon, globe, rotation = 0) => {
    const tilt = -0.38 + (state.pointerY - 0.5) * 0.18;
    const drift = (state.pointerX - 0.5) * 0.34;
    const rotatedLon = lon + rotation + drift;
    const cosLat = Math.cos(lat);
    const x = cosLat * Math.sin(rotatedLon);
    const y = Math.sin(lat) * Math.cos(tilt) - cosLat * Math.cos(rotatedLon) * Math.sin(tilt);
    const z = cosLat * Math.cos(rotatedLon) * Math.cos(tilt) + Math.sin(lat) * Math.sin(tilt);
    return {
      x: globe.cx + x * globe.r,
      y: globe.cy - y * globe.r,
      z
    };
  };

  const drawCurve = (from, to, lift, color, progress) => {
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2 - lift;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.quadraticCurveTo(midX, midY, to.x, to.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.4;
    ctx.stroke();

    const t = progress % 1;
    const px = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * midX + t * t * to.x;
    const py = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * midY + t * t * to.y;
    ctx.beginPath();
    ctx.arc(px, py, 3.4, 0, Math.PI * 2);
    ctx.fillStyle = "#12c7ef";
    ctx.shadowColor = "#12c7ef";
    ctx.shadowBlur = 18;
    ctx.fill();
    ctx.shadowBlur = 0;
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
    const rotation = time * 0.00008;
    ctx.clearRect(0, 0, width, height);

    const halo = ctx.createRadialGradient(globe.cx, globe.cy, globe.r * 0.08, globe.cx, globe.cy, globe.r * 1.28);
    halo.addColorStop(0, "rgba(18, 199, 239, 0.2)");
    halo.addColorStop(0.54, "rgba(6, 91, 163, 0.2)");
    halo.addColorStop(1, "rgba(18, 199, 239, 0)");
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, width, height);

    const grd = ctx.createRadialGradient(globe.cx - globe.r * 0.24, globe.cy - globe.r * 0.24, 14, globe.cx, globe.cy, globe.r);
    grd.addColorStop(0, "rgba(23, 206, 242, 0.28)");
    grd.addColorStop(0.34, "rgba(4, 41, 75, 0.92)");
    grd.addColorStop(1, "rgba(0, 8, 20, 0.98)");
    ctx.save();
    ctx.beginPath();
    ctx.arc(globe.cx, globe.cy, globe.r, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.clip();

    dotField.forEach((dot) => {
      const p = project(dot.lat, dot.lon, globe, rotation);
      if (p.z < -0.18) return;
      const alpha = 0.15 + Math.max(0, p.z) * 0.42;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.7, 1.55 + p.z * 0.9), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(125, 213, 255, ${alpha})`;
      ctx.fill();
    });

    routes.forEach((route, index) => {
      const from = { x: globe.cx - globe.r * 0.52, y: globe.cy - globe.r * 0.05 };
      const to = { x: globe.cx + route.to[0] * globe.r, y: globe.cy + route.to[1] * globe.r };
      drawCurve(from, to, globe.r * (0.26 + index * 0.035), index % 2 ? "rgba(18, 185, 179, 0.5)" : "rgba(18, 199, 239, 0.48)", time * 0.00018 + index * 0.16);
    });
    ctx.restore();

    ctx.beginPath();
    ctx.arc(globe.cx, globe.cy, globe.r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(18, 199, 239, 0.38)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const bay = { x: globe.cx - globe.r * 0.52, y: globe.cy - globe.r * 0.05 };
    ctx.beginPath();
    ctx.arc(bay.x, bay.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "#12c7ef";
    ctx.shadowBlur = 24;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "800 12px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Bay Area", bay.x + 12, bay.y + 4);

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
