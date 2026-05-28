const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navGroups = document.querySelectorAll(".nav-group");

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
    { label: "Help Desk", x: 0.18, y: 0.3, r: 8 },
    { label: "Devices", x: 0.32, y: 0.18, r: 7 },
    { label: "M365", x: 0.76, y: 0.26, r: 8 },
    { label: "", x: 0.82, y: 0.6, r: 8 },
    { label: "Backups", x: 0.58, y: 0.8, r: 8 },
    { label: "Vendors", x: 0.2, y: 0.72, r: 7 }
  ];
  const links = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [1, 2],
    [3, 4],
    [4, 5],
    [5, 6]
  ];
  const state = { pointerX: 0.5, pointerY: 0.5, targetX: 0.5, targetY: 0.5, frame: 0 };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const point = (node, width, height) => {
    const mobileScale = width < 430 ? 0.74 : 1;
    const driftScale = width < 430 ? 0.55 : 1;
    const driftX = (state.pointerX - 0.5) * (node.hub ? 16 : 34) * driftScale;
    const driftY = (state.pointerY - 0.5) * (node.hub ? 14 : 28) * driftScale;
    const x = (0.5 + (node.x - 0.5) * mobileScale) * width + driftX;
    const y = (0.5 + (node.y - 0.5) * mobileScale) * height + driftY;
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
    ctx.clearRect(0, 0, width, height);

    const grd = ctx.createRadialGradient(width * 0.5, height * 0.42, 30, width * 0.5, height * 0.5, width * 0.58);
    grd.addColorStop(0, "rgba(18, 199, 239, 0.38)");
    grd.addColorStop(0.38, "rgba(7, 95, 206, 0.18)");
    grd.addColorStop(1, "rgba(255, 255, 255, 0.02)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 6; i += 1) {
      ctx.beginPath();
      ctx.ellipse(0, 0, width * (0.18 + i * 0.055), height * (0.1 + i * 0.035), (i * Math.PI) / 7, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    const pts = nodes.map((node) => point(node, width, height));
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
      const hideMobileLabel = !node.label || (mobile && ["Backups", "Vendors"].includes(node.label));
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
  const targets = document.querySelectorAll(".section, .proof-strip, .service-tile, .final-cta");
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
initContactForm();
initReveal();
