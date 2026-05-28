const root = document.documentElement;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navGroups = document.querySelectorAll(".nav-group");
const siteHeader = document.querySelector(".site-header");
const heroGrids = document.querySelectorAll(".hero-grid");

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

const updateScrollProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  root.style.setProperty("--scroll-progress", `${progress * 100}%`);
  root.style.setProperty("--scroll-y", `${Math.min(progress * 100, 100).toFixed(2)}%`);
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 24);
};

let scrollQueued = false;
const queueScrollProgress = () => {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(() => {
    updateScrollProgress();
    scrollQueued = false;
  });
};

updateScrollProgress();
window.addEventListener("scroll", queueScrollProgress, { passive: true });
window.addEventListener("resize", queueScrollProgress);

if (!prefersReducedMotion) {
  window.addEventListener(
    "pointermove",
    (event) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      root.style.setProperty("--pointer-x", `${(x * 100).toFixed(2)}%`);
      root.style.setProperty("--pointer-y", `${(y * 100).toFixed(2)}%`);
      const gridX = (x - 0.5) * 28;
      const gridY = (y - 0.5) * 22;
      root.style.setProperty("--grid-x", `${gridX.toFixed(2)}px`);
      root.style.setProperty("--grid-y", `${gridY.toFixed(2)}px`);
      root.style.setProperty("--grid-x-back", `${(gridX * -0.7).toFixed(2)}px`);
      root.style.setProperty("--grid-y-back", `${(gridY * -0.7).toFixed(2)}px`);
      heroGrids.forEach((grid) => {
        grid.style.transform = `translate3d(${gridX.toFixed(2)}px, ${gridY.toFixed(2)}px, 0)`;
      });
    },
    { passive: true }
  );
}

const revealTargets = document.querySelectorAll(
  [
    ".reveal",
    ".service-card",
    ".component-card",
    ".proof-card",
    ".quote-card",
    ".detail-box",
    ".benefit-row",
    ".person-card"
  ].join(",")
);

revealTargets.forEach((element, index) => {
  element.style.setProperty("--reveal-delay", `${Math.min(index % 8, 5) * 55}ms`);
});

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealTargets.forEach((element) => revealObserver.observe(element));
}

document.querySelectorAll("[data-contact-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const firstName = data.get("First name") || "";
    const lastName = data.get("Last name") || "";
    const company = data.get("Company") || "";
    const employees = data.get("Employees") || "";
    const email = data.get("Email") || "";
    const message = data.get("Message") || "";
    const recipient = form.getAttribute("data-contact-email") || "support@techordia.com";
    const subject = `Techordia website inquiry from ${company || `${firstName} ${lastName}`.trim() || "new prospect"}`;
    const body = [
      `Name: ${firstName} ${lastName}`.trim(),
      `Company: ${company}`,
      `Employees: ${employees}`,
      `Email: ${email}`,
      "",
      "Message:",
      message
    ].join("\n");

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});

if (!prefersReducedMotion) {
  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener(
      "pointermove",
      (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateX = (0.5 - y) * 6;
        const rotateY = (x - 0.5) * 7;
        card.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        card.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
        card.style.transform = `translateY(-7px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      },
      { passive: true }
    );

    card.addEventListener(
      "pointerleave",
      () => {
        card.style.transform = "";
      },
      { passive: true }
    );
  });
}

if (!prefersReducedMotion) {
  document.querySelectorAll("[data-service-map]").forEach((map) => {
    map.addEventListener(
      "pointermove",
      (event) => {
        const rect = map.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        map.style.setProperty("--map-x", `${(x * 100).toFixed(1)}%`);
        map.style.setProperty("--map-y", `${(y * 100).toFixed(1)}%`);
        map.style.transform = `translateY(-4px) rotateX(${((0.5 - y) * 3).toFixed(2)}deg) rotateY(${((x - 0.5) * 4).toFixed(2)}deg)`;
      },
      { passive: true }
    );

    map.addEventListener(
      "pointerleave",
      () => {
        map.style.transform = "";
      },
      { passive: true }
    );
  });
}

const createCoverage = (canvas) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const state = {
    pointerX: 0.5,
    pointerY: 0.45,
    targetX: 0.5,
    targetY: 0.45
  };

  const nodes = [
    { label: "Alameda", x: 0.5, y: 0.52, size: 18, hub: true },
    { label: "Help Desk", x: 0.2, y: 0.26, size: 9 },
    { label: "Emergency", x: 0.75, y: 0.2, size: 9 },
    { label: "Cloud", x: 0.82, y: 0.48, size: 10 },
    { label: "Servers", x: 0.26, y: 0.72, size: 10 },
    { label: "Security", x: 0.64, y: 0.78, size: 9 },
    { label: "Backups", x: 0.42, y: 0.18, size: 8 }
  ];

  const links = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [1, 6],
    [3, 5],
    [4, 5]
  ];

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * scale));
    canvas.height = Math.max(1, Math.floor(rect.height * scale));
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
  };

  const drawNode = (node, time, width, height) => {
    const driftX = (state.pointerX - 0.5) * (node.hub ? 12 : 22);
    const driftY = (state.pointerY - 0.45) * (node.hub ? 10 : 18);
    const x = node.x * width + driftX;
    const y = node.y * height + driftY;
    const pulse = node.hub ? 1 + Math.sin(time * 0.003) * 0.04 : 1;

    ctx.beginPath();
    ctx.arc(x, y, node.size * pulse + 18, 0, Math.PI * 2);
    ctx.fillStyle = node.hub ? "rgba(16, 184, 230, 0.13)" : "rgba(8, 117, 222, 0.08)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, node.size * pulse, 0, Math.PI * 2);
    ctx.fillStyle = node.hub ? "#10b8e6" : "#ffffff";
    ctx.strokeStyle = node.hub ? "#0875de" : "rgba(8, 117, 222, 0.45)";
    ctx.lineWidth = node.hub ? 3 : 2;
    ctx.fill();
    ctx.stroke();

    ctx.font = node.hub ? "800 16px Inter, sans-serif" : "750 13px Inter, sans-serif";
    ctx.fillStyle = "#0b2a42";
    ctx.textAlign = "center";
    ctx.fillText(node.label, x, y + node.size + 28);

    return { x, y };
  };

  let queuedStaticFrame = false;
  const queueStaticDraw = () => {
    if (!prefersReducedMotion || queuedStaticFrame) return;
    queuedStaticFrame = true;
    requestAnimationFrame((time) => {
      queuedStaticFrame = false;
      draw(time);
    });
  };

  const draw = (time) => {
    if (prefersReducedMotion) {
      state.pointerX = state.targetX;
      state.pointerY = state.targetY;
    } else {
      state.pointerX += (state.targetX - state.pointerX) * 0.08;
      state.pointerY += (state.targetY - state.pointerY) * 0.08;
    }

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    gradient.addColorStop(1, "rgba(222, 247, 252, 0.82)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.strokeStyle = "rgba(8, 117, 222, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 32; x < width; x += 56) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 32; y < height; y += 56) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.restore();

    const points = nodes.map((node) => ({
      x: node.x * width + (state.pointerX - 0.5) * (node.hub ? 12 : 22),
      y: node.y * height + (state.pointerY - 0.45) * (node.hub ? 10 : 18)
    }));

    links.forEach(([from, to], index) => {
      const a = points[from];
      const b = points[to];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo((a.x + b.x) / 2, (a.y + b.y) / 2 - 32, b.x, b.y);
      ctx.strokeStyle = index % 2 ? "rgba(25, 185, 156, 0.34)" : "rgba(8, 117, 222, 0.32)";
      ctx.lineWidth = 2;
      ctx.stroke();

      const t = (time * 0.00018 + index * 0.13) % 1;
      const cx = (1 - t) * (1 - t) * a.x + 2 * (1 - t) * t * ((a.x + b.x) / 2) + t * t * b.x;
      const cy = (1 - t) * (1 - t) * a.y + 2 * (1 - t) * t * ((a.y + b.y) / 2 - 32) + t * t * b.y;
      ctx.beginPath();
      ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#19b99c";
      ctx.fill();
    });

    nodes.forEach((node) => drawNode(node, time, width, height));

    if (!prefersReducedMotion) requestAnimationFrame(draw);
  };

  resize();
  canvas.dataset.coverageReady = "true";
  window.addEventListener("resize", resize);

  canvas.addEventListener(
    "pointermove",
    (event) => {
      const rect = canvas.getBoundingClientRect();
      state.targetX = (event.clientX - rect.left) / rect.width;
      state.targetY = (event.clientY - rect.top) / rect.height;
      canvas.dataset.coveragePointer = `${state.targetX.toFixed(3)},${state.targetY.toFixed(3)}`;
      queueStaticDraw();
    },
    { passive: true }
  );

  canvas.addEventListener(
    "pointerleave",
    () => {
      state.targetX = 0.5;
      state.targetY = 0.45;
      canvas.dataset.coveragePointer = "0.500,0.450";
      queueStaticDraw();
    },
    { passive: true }
  );

  requestAnimationFrame(draw);
};

document.querySelectorAll("[data-coverage]").forEach((canvas) => createCoverage(canvas));
