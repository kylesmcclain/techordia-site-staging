import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  allPages,
  clientExperience,
  contactFlow,
  faqGroups,
  leadershipNotes,
  navItems,
  pages,
  pricing,
  reviewWidget,
  servicePages,
  site,
  teamMembers,
  whyTechordia
} from "./site-data.mjs";

const outDir = process.cwd();
const assetVersion = "20260529-hero-effects-redesign-1";
const generatedDirs = [
  "about",
  "approach",
  "blogs",
  "contact",
  "contact-us",
  "disclosure",
  "existing-clients",
  "faqs",
  "industries",
  "it-case-studies-white-papers",
  "locations",
  "managed-it-services",
  "privacy-policy",
  "resources",
  "services",
  "terms-of-service",
  "trust-and-security"
];

const esc = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const rootPrefix = (pagePath) => {
  if (!pagePath) return "";
  return "../".repeat(pagePath.split("/").filter(Boolean).length);
};

const href = (root, target) => {
  if (target.startsWith("http") || target.startsWith("mailto:") || target.startsWith("tel:")) return target;
  if (target.startsWith("#")) return target;
  return `${root}${target}`;
};

const current = (page, target) => (page.path === target ? ' aria-current="page"' : "");

const renderLogo = (root) => `<img class="brand-logo" src="${root}${site.logo}" alt="${site.brand}" />`;

const renderButton = (root, label, target, variant = "primary") =>
  `<a class="button ${variant}" href="${href(root, target)}">${esc(label)}</a>`;

const iconSvg = (name) => {
  const common = 'viewBox="0 0 48 48" aria-hidden="true" focusable="false"';
  const icons = {
    headset: `<svg ${common}><path d="M12 26v-4a12 12 0 0 1 24 0v4" /><path d="M12 26h-2a4 4 0 0 0-4 4v3a4 4 0 0 0 4 4h4V26h-2Z" /><path d="M36 26h2a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4h-4V26h2Z" /><path d="M32 38c-2 3-5 4-9 4h-3" /></svg>`,
    lanes: `<svg ${common}><path d="M8 14h14" /><path d="M26 14h14" /><path d="M15 14v20" /><path d="M33 14v20" /><path d="M8 34h14" /><path d="M26 34h14" /><circle cx="15" cy="14" r="4" /><circle cx="33" cy="34" r="4" /></svg>`,
    shield: `<svg ${common}><path d="M24 6 39 12v11c0 10-6 16-15 19C15 39 9 33 9 23V12l15-6Z" /><path d="m17 24 5 5 10-12" /></svg>`,
    timeline: `<svg ${common}><path d="M8 14h8" /><path d="M21 14h19" /><path d="M8 24h22" /><path d="M35 24h5" /><path d="M8 34h14" /><path d="M27 34h13" /><circle cx="18" cy="14" r="3" /><circle cx="32" cy="24" r="3" /><circle cx="24" cy="34" r="3" /></svg>`,
    user: `<svg ${common}><circle cx="24" cy="17" r="7" /><path d="M11 40c2-8 7-12 13-12s11 4 13 12" /></svg>`
  };
  return icons[name] || icons.headset;
};

const renderReviewWidget = () => `
  <aside class="review-widget" aria-label="Google review profile status">
    <div class="review-g">G</div>
    <div>
      <span>${esc(reviewWidget.source)}</span>
      <strong>${esc(reviewWidget.title)}</strong>
      <p>${esc(reviewWidget.status)}</p>
    </div>
    <a href="${esc(reviewWidget.url)}" target="_blank" rel="noopener">Open reviews</a>
  </aside>`;

const renderHeader = (root, page) => `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <nav class="nav-shell" aria-label="Primary navigation">
      <a class="brand" href="${root}" aria-label="Techordia home">${renderLogo(root)}</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-menu" aria-label="Open navigation">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-menu" id="primary-menu">
        <div class="nav-group">
          <button class="nav-trigger" type="button" aria-expanded="false">Services</button>
          <div class="mega-menu">
            <a href="${href(root, "services/")}"${current(page, "services/")}>All Services</a>
            ${servicePages
              .map((service) => `<a href="${href(root, service.path)}"${current(page, service.path)}>${esc(service.title)}</a>`)
              .join("")}
          </div>
        </div>
        <a class="nav-link" href="${href(root, "approach/")}"${current(page, "approach/")}>Approach</a>
        <div class="nav-group">
          <button class="nav-trigger" type="button" aria-expanded="false">About</button>
          <div class="mega-menu about-menu">
            <a href="${href(root, "about/#story")}">The Techordia Story</a>
            <a href="${href(root, "about/#team")}">Team</a>
          </div>
        </div>
        <a class="nav-link" href="${href(root, "contact/")}"${current(page, "contact/")}>Contact</a>
        <button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch color theme" aria-pressed="false">
          <span class="theme-toggle-track"><span class="theme-toggle-knob"></span></span>
          <span class="theme-toggle-text">Light</span>
        </button>
        <a class="nav-cta" href="${href(root, "contact/")}">Book a Consultation</a>
      </div>
    </nav>
  </header>`;

const renderFooter = (root) => `
  <footer class="site-footer">
    <div class="footer-main">
      <div class="footer-brand">
        ${renderLogo(root)}
        <p>Relationship-driven managed IT, cybersecurity, and project support for Bay Area SMBs.</p>
      </div>
      <div class="footer-links">
        <div>
          <h2>Services</h2>
          <a href="${href(root, "services/")}">All Services</a>
          ${servicePages.map((service) => `<a href="${href(root, service.path)}">${esc(service.title)}</a>`).join("")}
        </div>
        <div>
          <h2>Company</h2>
          <a href="${href(root, "approach/")}">Approach</a>
          <a href="${href(root, "about/#story")}">The Techordia Story</a>
          <a href="${href(root, "about/#team")}">Team</a>
        </div>
        <div>
          <h2>Contact</h2>
          <a href="${site.phoneHref}">${esc(site.phone)}</a>
          <a href="mailto:${site.email}">${esc(site.email)}</a>
          <span>${esc(site.address)}</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>Staging site - noindex</span>
      <a href="#main">Back to top</a>
    </div>
  </footer>`;

const visualNodes = {
  home: `
    <div class="visual visual-home" data-visual="home">
      <canvas class="network-canvas" data-network-canvas width="760" height="640" aria-label="Animated Techordia service network"></canvas>
    </div>`,
  services: `
    <div class="visual visual-orbit visual-services" data-visual="services">
      <div class="effect-stage service-orbit">
        <i class="orbit-ring ring-one"></i>
        <i class="orbit-ring ring-two"></i>
        <i class="orbit-ring ring-three"></i>
        <strong class="orbit-core">Right model</strong>
        ${servicePages.map((service, index) => `<span class="orbit-label" style="--i:${index}">${esc(service.title)}</span>`).join("")}
        ${servicePages.map((service, index) => `<b class="orbit-spark" style="--i:${index}"></b>`).join("")}
      </div>
    </div>`,
  managed: `
    <div class="visual visual-orbit visual-managed" data-visual="managed">
      <div class="effect-stage managed-constellation">
        <i class="orbit-ring ring-one"></i>
        <i class="orbit-ring ring-two"></i>
        <strong class="orbit-core">Techordia</strong>
        ${["Users", "Devices", "M365", "Backups", "Vendors", "Security"].map((item, index) => `<span class="orbit-label ops-node node-${index + 1}">${esc(item)}</span>`).join("")}
        ${["Users", "Devices", "M365", "Backups", "Vendors", "Security"].map((_, index) => `<b class="orbit-spark node-${index + 1}"></b>`).join("")}
      </div>
    </div>`,
  "co-managed": `
    <div class="visual visual-co" data-visual="co-managed">
      <div class="lane-system">
        <div class="lane-card internal"><span>Internal IT owns</span><strong>Strategy, approvals, business context</strong></div>
        <div class="lane-bridge"><i></i><i></i><i></i><b>Shared visibility</b></div>
        <div class="lane-card techordia"><span>Techordia owns</span><strong>Overflow, escalation, projects, documentation</strong></div>
      </div>
    </div>`,
  cybersecurity: `
    <div class="visual visual-cyber" data-visual="cybersecurity">
      <div class="shield-radar">
        <i class="radar-sweep"></i>
        <strong class="shield-core">Controls</strong>
        ${["Identity", "Endpoint", "Email", "Backup", "Access"].map((item, index) => `<span style="--i:${index}">${esc(item)}</span>`).join("")}
      </div>
    </div>`,
  projects: `
    <div class="visual visual-projects" data-visual="projects">
      <div class="cutover-visual">
        <i></i>
        ${["Scope", "Prepare", "Cutover", "Test", "Handoff"].map((item, index) => `<div class="project-step" style="--i:${index}"><span>${String(index + 1).padStart(2, "0")}</span><strong>${esc(item)}</strong></div>`).join("")}
      </div>
    </div>`,
  approach: `
    <div class="visual visual-approach" data-visual="approach">
      ${pages.approach.steps.map(([title], index) => `<span style="--i:${index}">${esc(title)}</span>`).join("")}
      <strong>Owned IT</strong>
    </div>`,
  about: `
    <div class="visual visual-about" data-visual="about">
      <div class="founder-avatar">WL</div>
      <h2>${esc(site.founder)}</h2>
      <p>Founder & CTO</p>
      <span>Founded ${esc(site.founded)}</span>
    </div>`,
  contact: `
    <div class="visual visual-contact" data-visual="contact">
      ${contactFlow.map(([num, title, text]) => `<div class="contact-step"><span>${esc(num)}</span><strong>${esc(title)}</strong><p>${esc(text)}</p></div>`).join("")}
    </div>`
};

const renderHero = (root, page, options = {}) => {
  const isHome = options.home;
  const isService = options.service;
  const heroClass = isHome ? "home-hero" : isService ? "service-hero" : "sub-hero";
  const actions = options.actions === false ? "" : `
        <div class="hero-actions">
          ${renderButton(root, options.primaryLabel || "Book a Consultation", options.primaryTarget || "contact/")}
          ${
            options.secondaryLabel
              ? renderButton(root, options.secondaryLabel, options.secondaryTarget || "services/", "secondary")
              : ""
          }
        </div>`;

  return `
  <section class="hero ${heroClass}" data-page-visual="${esc(page.visual || "home")}">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="hero-inner">
      <div class="hero-copy">
        ${
          isHome
            ? `<h1><span>IT that works.</span><em>So you can.</em></h1>`
            : `<h1>${esc(page.h1 || page.title)}</h1>`
        }
        <p>${esc(page.intro || page.hero || "")}</p>
        ${actions}
      </div>
      <div class="hero-visual-shell">
        ${visualNodes[page.visual] || visualNodes.services}
        ${isHome ? renderReviewWidget() : ""}
      </div>
    </div>
    ${
      isHome
        ? `<div class="hero-trust-line" aria-label="Techordia service values">
      <span>Real people</span>
      <span>White-glove IT</span>
      <span>Fast support</span>
      <span>Can-do ownership</span>
    </div>`
        : ""
    }
  </section>`;
};

const renderSectionHeader = (title, text = "") => `
  <div class="section-copy">
    <h2>${esc(title)}</h2>
    ${text ? `<p>${text}</p>` : ""}
  </div>`;

const renderServiceSummaryCards = (root, options = {}) => `
  <div class="service-grid ${options.compact ? "compact" : ""}" data-service-selector>
    ${servicePages
      .map(
        (service) => `
        <a class="service-tile" href="${href(root, service.path)}" data-service-card="${esc(service.key)}">
          <span class="tile-icon">${iconSvg(service.icon)}</span>
          <h3>${esc(service.title)}</h3>
          <dl>
            <div><dt>What it is</dt><dd>${esc(service.what)}</dd></div>
            <div><dt>Best for</dt><dd>${esc(service.bestFor)}</dd></div>
            <div><dt>How it works</dt><dd>${esc(service.how)}</dd></div>
          </dl>
        </a>`
      )
      .join("")}
  </div>`;

const renderWhyTechordia = () => `
  <section class="section why-section">
    ${renderSectionHeader(
      "Why Techordia",
      "The right IT partner helps teams <strong>stay productive</strong>, <strong>reduce downtime</strong>, and <strong>keep critical systems supported</strong> as the business grows."
    )}
    <div class="outcome-grid">
      ${whyTechordia
        .map(
          ([title, text]) => `
        <article>
          <h3>${esc(title)}</h3>
          <p>${esc(text)}</p>
        </article>`
        )
        .join("")}
    </div>
  </section>`;

const renderPricing = () => `
  <section class="section pricing-section">
    ${renderSectionHeader(pricing.title, esc(pricing.intro))}
    <div class="pricing-factors">
      ${pricing.factors.map(([title, text]) => `<article><strong>${esc(title)}</strong><p>${esc(text)}</p></article>`).join("")}
    </div>
  </section>`;

const flattenFaqs = (groups) => groups.flatMap((group) => group.items.map((item) => ({ group, item })));

const renderFaqs = (items = null, options = {}) => {
  if (items) {
    return `
  <section class="section faq-section simple-faq">
    ${renderSectionHeader(options.title || "Questions to clarify before we start.")}
    <div class="faq-list">
      ${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}
    </div>
  </section>`;
  }

  const all = flattenFaqs(faqGroups);
  return `
  <section class="section faq-section" data-faq-section>
    ${renderSectionHeader(
      "Questions SMB leaders ask before choosing an MSP",
      "The best conversations usually start with transition risk, responsiveness, support ownership, and how new work gets implemented."
    )}
    <div class="faq-layout">
      <div class="faq-filters" aria-label="FAQ categories">
        <button type="button" class="is-active" data-faq-filter="all" aria-pressed="true">All</button>
        ${faqGroups.map((group) => `<button type="button" data-faq-filter="${esc(group.key)}" aria-pressed="false">${esc(group.label)}</button>`).join("")}
      </div>
      <div class="faq-list">
        ${all
          .map(
            ({ group, item }) => `
          <details data-faq-item="${esc(group.key)}">
            <summary>${esc(item[0])}</summary>
            <p>${esc(item[1])}</p>
          </details>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
};

const renderClientExperience = (root) => `
  <section class="section experience-section">
    ${renderSectionHeader(
      "What clients should feel",
      "A trusted IT partner should turn technology from a liability or distraction into a business asset your team can count on."
    )}
    <div class="experience-layout">
      <div class="experience-grid">
        ${clientExperience
          .map(([title, text]) => `<article><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`)
          .join("")}
      </div>
      <aside class="leadership-panel">
        <div class="founder-avatar">WL</div>
        <h3>Leadership you can talk to</h3>
        ${leadershipNotes.map((note) => `<p>${esc(note)}</p>`).join("")}
        ${renderButton(root, "Meet the Team", "about/#team", "secondary")}
      </aside>
    </div>
  </section>`;

const renderContactForm = () => `
  <form class="contact-form" id="contact-form" data-contact-form data-contact-email="${site.email}">
    <label>First name<input name="First name" autocomplete="given-name" required /></label>
    <label>Last name<input name="Last name" autocomplete="family-name" required /></label>
    <label>Company<input name="Company" autocomplete="organization" required /></label>
    <label>Email<input type="email" name="Email" autocomplete="email" required /></label>
    <label>Support need<select name="Support need" required><option value="">Select one</option><option>Managed IT</option><option>Co-managed IT</option><option>Cybersecurity</option><option>IT project</option><option>Not sure yet</option></select></label>
    <label>What should we look at first?<textarea name="Message" rows="5" required></textarea></label>
    <button class="button primary" type="submit">Send Message</button>
  </form>`;

const renderFinalCta = (root) => `
  <section class="final-cta">
    <div>
      <h2>Find the right IT support relationship.</h2>
      <p>Start with a practical conversation about your users, systems, risks, and support expectations. We will help identify whether managed, co-managed, project, or security support fits best.</p>
    </div>
    <div class="cta-actions">
      ${renderButton(root, "Talk With Techordia", "contact/", "light")}
    </div>
  </section>`;

const renderHome = (root) => `
  ${renderHero(root, pages.home, { home: true, secondaryLabel: "See How We Help", secondaryTarget: "services/" })}
  ${renderWhyTechordia()}
  <section class="section home-service-section">
    ${renderSectionHeader(
      "Choose the support model that fits",
      "Each service lane is built around a different operating need, from complete IT ownership to targeted project execution."
    )}
    ${renderServiceSummaryCards(root)}
  </section>
  ${renderClientExperience(root)}
  ${renderFaqs()}
  ${renderFinalCta(root)}`;

const renderServices = (root) => `
  ${renderHero(root, pages.services, { secondaryLabel: "Compare Service Models", secondaryTarget: "#packages" })}
  <section class="section services-section" id="packages">
    ${renderSectionHeader(
      "Service models",
      "Use these summaries to decide which conversation is most useful first. The right model depends on users, devices, risk, support expectations, and the work already on your plate."
    )}
    ${renderServiceSummaryCards(root)}
  </section>
  ${renderPricing()}
  ${renderFaqs()}
  ${renderFinalCta(root)}`;

const serviceProcessTitles = {
  managed: "How managed IT becomes stable",
  "co-managed": "How shared support gets defined",
  cybersecurity: "How practical risk reduction starts",
  projects: "How project work stays controlled"
};

const renderServiceSpecificSection = (page) => {
  if (page.key === "managed") {
    return `
  <section class="section service-specific managed-specific">
    ${renderSectionHeader("The managed support model")}
    <div class="support-model-grid">
      <article><span>01</span><h3>User support</h3><p>Ticket routing, remote help, onsite coordination, urgent escalation, onboarding, and day-to-day questions.</p></article>
      <article><span>02</span><h3>Systems ownership</h3><p>Microsoft 365, endpoints, backups, vendors, access paths, and infrastructure stay visible and supportable.</p></article>
      <article><span>03</span><h3>Operating rhythm</h3><p>Recurring issues, lifecycle needs, documentation, and security priorities are reviewed instead of ignored.</p></article>
    </div>
  </section>`;
  }

  if (page.key === "co-managed") {
    return `
  <section class="section service-specific co-specific">
    ${renderSectionHeader("Shared lanes prevent dropped work")}
    <div class="lane-compare">
      <article><h3>Internal team</h3><p>Business context, priorities, approvals, internal communication, and systems the company wants to keep close.</p></article>
      <div class="lane-center">Shared visibility</div>
      <article><h3>Techordia</h3><p>Overflow tickets, escalation, monitoring, documentation, project execution, security cleanup, and vendor follow-through.</p></article>
    </div>
  </section>`;
  }

  if (page.key === "cybersecurity") {
    return `
  <section class="section service-specific cyber-specific">
    ${renderSectionHeader("Security controls that support operations")}
    <div class="control-matrix">
      ${["Identity", "Endpoint", "Email", "Backup", "Admin access", "Documentation"]
        .map((item) => `<article><span>${iconSvg("shield")}</span><strong>${esc(item)}</strong><p>Practical checks, cleanup, and supportable controls that reduce day-to-day risk.</p></article>`)
        .join("")}
    </div>
  </section>`;
  }

  return `
  <section class="section service-specific project-specific">
    ${renderSectionHeader("From scope to supportable handoff")}
    <div class="cutover-track">
      ${["Business goal", "Dependencies", "Change window", "Testing", "Support handoff"]
        .map((item, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><strong>${esc(item)}</strong></article>`)
        .join("")}
    </div>
  </section>`;
};

const renderServicePage = (root, page) => `
  ${renderHero(root, page, {
    service: true,
    primaryLabel: "Book a Consultation",
    primaryTarget: "contact/",
    secondaryLabel: "See the Service Model",
    secondaryTarget: "#model"
  })}
  <section class="section service-model-section" id="model">
    ${renderSectionHeader("What Techordia owns", esc(page.intro))}
    <div class="service-model-card">
      <div>
        <span class="tile-icon">${iconSvg(page.icon)}</span>
        <h3>${esc(page.title)}</h3>
      </div>
      <dl>
        <div><dt>What it is</dt><dd>${esc(page.what)}</dd></div>
        <div><dt>Best for</dt><dd>${esc(page.bestFor)}</dd></div>
        <div><dt>How it works</dt><dd>${esc(page.how)}</dd></div>
      </dl>
    </div>
  </section>
  ${renderServiceSpecificSection(page)}
  <section class="section outcomes-section">
    ${renderSectionHeader("Business outcomes")}
    <div class="outcome-grid">
      ${page.outcomes.map(([title, text]) => `<article><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join("")}
    </div>
  </section>
  <section class="section process-section" data-process>
    ${renderSectionHeader(serviceProcessTitles[page.key] || "How the work gets done")}
    <div class="process-rail">
      ${page.steps.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join("")}
    </div>
  </section>
  ${renderFaqs(page.faqs, { title: `Questions about ${page.title.toLowerCase()}` })}
  ${renderFinalCta(root)}`;

const renderApproach = (root) => `
  ${renderHero(root, pages.approach, { actions: false })}
  <section class="section approach-detail-section">
    ${renderSectionHeader(
      "Support should leave the environment cleaner than it found it",
      "The process is intentionally practical: understand the business, stabilize what interrupts work, document what matters, and keep improving the operating model."
    )}
    <div class="process-rail">
      ${pages.approach.steps.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join("")}
    </div>
  </section>
  <section class="section approach-principles">
    ${renderSectionHeader("What the process protects")}
    <div class="outcome-grid">
      <article><h3>Continuity</h3><p>Support should reduce interruption, not create new dependency on one person or one undocumented workaround.</p></article>
      <article><h3>Clarity</h3><p>Owners, users, vendors, systems, and escalation paths should be understandable before a problem becomes urgent.</p></article>
      <article><h3>Judgment</h3><p>Good IT support uses technical depth, but the decision-making has to make sense to business operators.</p></article>
    </div>
  </section>`;

const renderAbout = (root) => {
  const groups = [...new Set(teamMembers.map((member) => member.group))];
  return `
  ${renderHero(root, pages.about, { actions: false })}
  <section class="section story-section" id="story">
    ${renderSectionHeader(
      "The Techordia Story",
      "Techordia started in Alameda in 2010 with a practical belief: small and mid-sized businesses should have IT support from people who know their environment, document the work, and stay accountable after the urgent issue is fixed."
    )}
    <div class="story-panel">
      <p>That operating style still guides the company. Techordia supports businesses that need daily issues handled, critical systems watched, vendors coordinated, security improved, and projects delivered without turning IT into a management burden.</p>
      <p>The work is technical, but the relationship is human: clear support paths, plain-language recommendations, and a team that understands how IT decisions affect operations.</p>
    </div>
  </section>
  <section class="section team-section" id="team">
    ${renderSectionHeader("Team")}
    ${groups
      .map(
        (group) => `
      <div class="team-group">
        <h3>${esc(group)}</h3>
        <div class="team-grid">
          ${teamMembers
            .filter((member) => member.group === group)
            .map(
              (member) => `
            <article class="team-card">
              <div class="team-photo" aria-label="${esc(member.name)} photo placeholder">${esc(member.initials)}</div>
              <div>
                <h4>${esc(member.name)}</h4>
                <p class="team-role">${esc(member.role)}</p>
                <p>${esc(member.bio)}</p>
                <a href="${esc(member.linkedin)}" target="_blank" rel="noopener">LinkedIn URL</a>
              </div>
            </article>`
            )
            .join("")}
        </div>
      </div>`
      )
      .join("")}
  </section>`;
};

const renderContact = (root) => `
  ${renderHero(root, pages.contact, { actions: false })}
  <section class="section contact-section">
    ${renderSectionHeader(
      "What happens next",
      "A useful first conversation usually covers the users you support, the systems that cannot go down, the issues that keep repeating, and the support relationship that would make the business easier to run."
    )}
    <div class="contact-layout">
      <div class="contact-details">
        <h3>Contact Techordia</h3>
        <a href="${site.phoneHref}">${esc(site.phone)}</a>
        <a href="mailto:${site.email}">${esc(site.email)}</a>
        <span>${esc(site.address)}</span>
        <div class="contact-expectations">
          ${contactFlow.map(([num, title, text]) => `<article><span>${esc(num)}</span><strong>${esc(title)}</strong><p>${esc(text)}</p></article>`).join("")}
        </div>
      </div>
      ${renderContactForm()}
    </div>
  </section>`;

const renderMain = (root, page) => {
  if (page.path === "") return renderHome(root);
  if (page.path === "services/") return renderServices(root);
  if (page.path === "approach/") return renderApproach(root);
  if (page.path === "about/") return renderAbout(root);
  if (page.path === "contact/") return renderContact(root);
  return renderServicePage(root, page);
};

const renderHtml = (page) => {
  const root = rootPrefix(page.path);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex,nofollow" />
    <title>${esc(page.seoTitle || page.title || site.brand)}</title>
    <meta name="description" content="${esc(page.summary || page.intro || site.description)}" />
    <script>
      try {
        const requestedTheme = new URLSearchParams(location.search).get("theme");
        const theme = requestedTheme === "light" || requestedTheme === "dark" ? requestedTheme : localStorage.getItem("techordia-theme");
        if (theme === "light" || theme === "dark") document.documentElement.dataset.theme = theme;
      } catch (error) {}
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link rel="icon" href="${root}assets/techordia-logo.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="${root}styles.css?v=${assetVersion}" />
    <script defer src="${root}script.js?v=${assetVersion}"></script>
  </head>
  <body data-page="${esc(page.path || "home")}" data-visual="${esc(page.visual || "home")}">
    ${renderHeader(root, page)}
    <main id="main">
      ${renderMain(root, page)}
    </main>
    ${renderFooter(root)}
  </body>
</html>`;
};

const cleanHtml = (html) =>
  `${html
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")}\n`;

const writePage = async (page) => {
  const fileDir = page.path ? path.join(outDir, page.path) : outDir;
  await mkdir(fileDir, { recursive: true });
  await writeFile(path.join(fileDir, "index.html"), cleanHtml(renderHtml(page)), "utf8");
};

for (const dir of generatedDirs) {
  await rm(path.join(outDir, dir), { recursive: true, force: true });
}

for (const page of allPages) {
  await writePage(page);
}

await writeFile(path.join(outDir, "robots.txt"), "User-agent: *\nDisallow: /\n", "utf8");

console.log(`Generated ${allPages.length} staging pages.`);
