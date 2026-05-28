import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  allPages,
  brandValues,
  contactFlow,
  faqs,
  navItems,
  pages,
  pricing,
  proof,
  reviewWidget,
  servicePages,
  site
} from "./site-data.mjs";

const outDir = process.cwd();
const assetVersion = "20260528-staging-jones-inspired-6";
const generatedDirs = [
  "about",
  "approach",
  "blogs",
  "contact",
  "contact-us",
  "disclosure",
  "existing-clients",
  "faqs",
  "it-case-studies-white-papers",
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

const renderReviewWidget = () => `
  <aside class="review-widget" aria-label="Google review profile status">
    <div class="review-g">G</div>
    <div>
      <span>${esc(reviewWidget.source)}</span>
      <strong>${esc(reviewWidget.title)}</strong>
      <p>${esc(reviewWidget.status)}</p>
    </div>
  </aside>`;

const renderHeader = (root, page) => `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="topline">
      <span>Based in Alameda, serving Bay Area businesses</span>
      <a href="${site.phoneHref}">${esc(site.phone)}</a>
    </div>
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
        ${navItems
          .filter((item) => item.path !== "services/")
          .map((item) => `<a class="nav-link" href="${href(root, item.path)}"${current(page, item.path)}>${esc(item.title)}</a>`)
          .join("")}
        <a class="nav-cta" href="${href(root, "contact/")}">Book a Consultation</a>
      </div>
    </nav>
  </header>`;

const renderFooter = (root) => `
  <footer class="site-footer">
    <div class="footer-main">
      <div class="footer-brand">
        ${renderLogo(root)}
        <p>Responsive managed IT, cybersecurity, cloud, server, backup, and project support from Alameda.</p>
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
          <a href="${href(root, "about/")}">About</a>
          <a href="${href(root, "contact/")}">Contact</a>
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
      <div class="visual-label visual-label-left">Alameda</div>
      <div class="visual-label visual-label-right">Bay Area SMBs</div>
      ${renderReviewWidget()}
    </div>`,
  services: `
    <div class="visual visual-services" data-visual="services">
      <div class="service-orb">
        ${servicePages.map((service, index) => `<span style="--i:${index}">${esc(service.title)}</span>`).join("")}
        <strong>Techordia</strong>
      </div>
      <p>Four service lanes. One support conversation.</p>
    </div>`,
  managed: `
    <div class="visual visual-managed" data-visual="managed">
      <div class="ops-hub">Managed IT</div>
      ${["Users", "Devices", "M365", "Servers", "Backups", "Vendors"].map((item, index) => `<span class="ops-node node-${index + 1}">${esc(item)}</span>`).join("")}
    </div>`,
  "co-managed": `
    <div class="visual visual-co" data-visual="co-managed">
      <div class="team-lane internal"><span>Internal IT</span><strong>Control</strong></div>
      <div class="handoff-line"><i></i><i></i><i></i></div>
      <div class="team-lane techordia"><span>Techordia</span><strong>Capacity</strong></div>
    </div>`,
  cybersecurity: `
    <div class="visual visual-cyber" data-visual="cybersecurity">
      <div class="shield-core">Security</div>
      ${["Identity", "Email", "Endpoint", "Backup", "Access"].map((item) => `<span>${esc(item)}</span>`).join("")}
    </div>`,
  projects: `
    <div class="visual visual-projects" data-visual="projects">
      ${["Scope", "Prepare", "Cutover", "Test", "Handoff"].map((item, index) => `<div class="project-step" style="--i:${index}"><span>${String(index + 1).padStart(2, "0")}</span><strong>${esc(item)}</strong></div>`).join("")}
    </div>`,
  approach: `
    <div class="visual visual-approach" data-visual="approach">
      ${pages.approach.steps.map(([title], index) => `<span style="--i:${index}">${esc(title)}</span>`).join("")}
      <strong>Operate cleanly</strong>
    </div>`,
  about: `
    <div class="visual visual-about" data-visual="about">
      <div class="founder-avatar">WL</div>
      <h2>${esc(site.founder)}</h2>
      <p>Founder, Techordia</p>
      <span>Alameda, CA</span>
    </div>`,
  contact: `
    <div class="visual visual-contact" data-visual="contact">
      ${contactFlow.map(([num, title, text]) => `<div class="contact-step"><span>${esc(num)}</span><strong>${esc(title)}</strong><p>${esc(text)}</p></div>`).join("")}
    </div>`
};

const renderHero = (root, page, options = {}) => `
  <section class="hero ${options.home ? "home-hero" : "sub-hero"}" data-page-visual="${esc(page.visual || "home")}">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="hero-inner">
      <div class="hero-copy">
        ${options.home ? `<div class="brand-kicker">${renderLogo(root)}</div>` : ""}
        <h1>${esc(page.h1 || page.title)}</h1>
        <p>${esc(page.intro || page.hero || "")}</p>
        <div class="hero-actions">
          ${renderButton(root, "Book a Consultation", "contact/")}
          ${renderButton(root, options.secondaryLabel || "See Services", options.secondaryTarget || "services/", "secondary")}
        </div>
      </div>
      ${visualNodes[page.visual] || visualNodes.services}
    </div>
  </section>`;

const renderProof = () => `
  <section class="proof-strip" aria-label="Techordia proof points">
    ${proof.map(([title, text]) => `<article><strong>${esc(title)}</strong><span>${esc(text)}</span></article>`).join("")}
  </section>`;

const renderServiceCards = (root, compact = false) => `
  <div class="service-grid ${compact ? "compact" : ""}" data-service-selector>
    ${servicePages
      .map(
        (service, index) => `
        <article class="service-tile" data-service-card="${esc(service.key)}">
          <span class="tile-number">${String(index + 1).padStart(2, "0")}</span>
          <h3>${esc(service.title)}</h3>
          <p>${esc(service.summary)}</p>
          <dl>
            <div><dt>Best for</dt><dd>${esc(service.fit)}</dd></div>
            <div><dt>Includes</dt><dd>${esc(service.included.slice(0, 4).join(", "))}</dd></div>
          </dl>
          <a class="text-link" href="${href(root, service.path)}">${esc(service.cta)}</a>
        </article>`
      )
      .join("")}
  </div>`;

const renderPricing = () => `
  <section class="section pricing-section">
    <div class="section-copy">
      <span class="section-label">Pricing</span>
      <h2>${esc(pricing.title)}</h2>
      <p>${esc(pricing.intro)}</p>
    </div>
    <div class="pricing-factors">
      ${pricing.factors.map(([title, text]) => `<article><strong>${esc(title)}</strong><p>${esc(text)}</p></article>`).join("")}
    </div>
  </section>`;

const renderBrandValues = () => `
  <section class="section voice-section">
    <div class="section-copy">
      <span class="section-label">How Techordia Works</span>
      <h2>Human support with serious technical depth.</h2>
      <p>Small and mid-sized teams need more than a ticket queue. They need responsive people who can own the issue, explain the work, and get the environment cleaner as they go.</p>
    </div>
    <div class="voice-grid">
      ${brandValues
        .map(
          ([title, text], index) => `
        <article class="voice-card" style="--i:${index}">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <h3>${esc(title)}</h3>
          <p>${esc(text)}</p>
        </article>`
        )
        .join("")}
    </div>
  </section>`;

const renderFaqs = (items = faqs) => `
  <section class="section faq-section">
    <div class="section-copy">
      <span class="section-label">FAQ</span>
      <h2>Questions decision-makers ask first.</h2>
    </div>
    <div class="faq-list">
      ${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}
    </div>
  </section>`;

const renderContactForm = () => `
  <form class="contact-form" id="contact-form" data-contact-form data-contact-email="${site.email}">
    <label>First name<input name="First name" autocomplete="given-name" required /></label>
    <label>Last name<input name="Last name" autocomplete="family-name" required /></label>
    <label>Company<input name="Company" autocomplete="organization" required /></label>
    <label>Email<input type="email" name="Email" autocomplete="email" required /></label>
    <label>Support need<select name="Support need" required><option value="">Select one</option><option>Fully managed IT</option><option>Co-managed IT</option><option>Cybersecurity</option><option>IT project</option><option>Not sure yet</option></select></label>
    <label>What should we look at first?<textarea name="Message" rows="5" required></textarea></label>
    <button class="button primary" type="submit">Start the Conversation</button>
  </form>`;

const renderFinalCta = (root) => `
  <section class="final-cta">
    <div>
      <h2>Ready to quiet the IT noise?</h2>
      <p>Talk through users, devices, Microsoft 365, security, backups, and support coverage.</p>
    </div>
    <div class="cta-actions">
      ${renderButton(root, "Book a Consultation", "contact/", "light")}
      ${renderButton(root, `Call ${site.phone}`, site.phoneHref, "ghost")}
    </div>
  </section>`;

const renderHome = (root) => `
  ${renderHero(root, pages.home, { home: true, secondaryLabel: "See How We Help", secondaryTarget: "services/" })}
  ${renderProof()}
  <section class="section split-section">
    <div class="section-copy">
      <span class="section-label">Services</span>
      <h2>Four ways to get IT under control.</h2>
      <p>Start with the support lane that matches your team. Techordia can own the whole environment, work beside internal IT, improve security, or deliver a focused project.</p>
    </div>
    ${renderServiceCards(root, true)}
  </section>
  ${renderBrandValues()}
  ${renderPricing()}
  <section class="section review-section">
    <div class="section-copy">
      <span class="section-label">Reviews</span>
      <h2>A review widget without a fake claim.</h2>
      <p>The staging site includes the Jones-style social proof placement. Verified Google Business Profile details can be connected before launch.</p>
    </div>
    ${renderReviewWidget()}
  </section>
  <section class="section approach-preview">
    <div class="section-copy">
      <span class="section-label">Approach</span>
      <h2>Discover. Stabilize. Document. Support. Improve.</h2>
      <p>That rhythm keeps support practical after the first consultation.</p>
      ${renderButton(root, "See the Approach", "approach/", "secondary")}
    </div>
    ${visualNodes.approach}
  </section>
  ${renderFinalCta(root)}`;

const renderServices = (root) => `
  ${renderHero(root, pages.services, { secondaryLabel: "Compare Packages", secondaryTarget: "#packages" })}
  <section class="section services-section" id="packages">
    <div class="section-copy">
      <span class="section-label">Service Packages</span>
      <h2>No filler pages. Just the support models that matter.</h2>
      <p>Each package has a different job, scope, and operating model.</p>
    </div>
    ${renderServiceCards(root)}
  </section>
  ${renderPricing()}
  ${renderFaqs()}
  ${renderFinalCta(root)}`;

const renderServicePage = (root, page) => `
  ${renderHero(root, page, { secondaryLabel: "What's Included", secondaryTarget: "#included" })}
  <section class="section split-section" id="included">
    <div class="section-copy">
      <span class="section-label">${esc(page.title)}</span>
      <h2>${esc(page.hero)}</h2>
      <p>${esc(page.intro)}</p>
    </div>
    <div class="included-list">
      ${page.included.map((item) => `<span>${esc(item)}</span>`).join("")}
    </div>
  </section>
  <section class="section outcomes-section">
    <div class="section-copy">
      <span class="section-label">Outcomes</span>
      <h2>What gets better.</h2>
    </div>
    <div class="outcome-grid">
      ${page.outcomes.map(([title, text]) => `<article><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join("")}
    </div>
  </section>
  <section class="section process-section" data-process>
    <div class="section-copy">
      <span class="section-label">How it works</span>
      <h2>Clear steps, clean handoff.</h2>
    </div>
    <div class="process-rail">
      ${page.steps.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join("")}
    </div>
  </section>
  ${renderFaqs(page.faqs)}
  ${renderFinalCta(root)}`;

const renderApproach = (root) => `
  ${renderHero(root, pages.approach, { secondaryLabel: "Talk to Techordia", secondaryTarget: "contact/" })}
  <section class="section process-section large-process" data-process>
    <div class="section-copy">
      <span class="section-label">Operating Model</span>
      <h2>Support should leave the environment cleaner than it found it.</h2>
      <p>Each stage turns unclear IT into owned, documented work.</p>
    </div>
    <div class="process-rail">
      ${pages.approach.steps.map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join("")}
    </div>
  </section>
  ${renderPricing()}
  ${renderFinalCta(root)}`;

const renderAbout = (root) => `
  ${renderHero(root, pages.about, { secondaryLabel: "Contact Techordia", secondaryTarget: "contact/" })}
  <section class="section founder-section">
    <div class="founder-panel">
      <div class="founder-avatar large">WL</div>
      <div>
        <span class="section-label">Founder</span>
        <h2>${esc(site.founder)}</h2>
        <p>Founder image space reserved for Wilson Lee.</p>
      </div>
    </div>
    <div class="section-copy">
      <h2>Alameda-based support with operational discipline.</h2>
      <p>Techordia serves SMBs that need IT to be responsive, documented, security-minded, and practical. The site avoids fake partner badges and thin claims; proof stays tied to real Techordia context.</p>
      <div class="about-facts">
        <span>Founded ${esc(site.founded)}</span>
        <span>${esc(site.region)}</span>
        <span>${esc(site.phone)}</span>
      </div>
    </div>
  </section>
  ${renderFinalCta(root)}`;

const renderContact = (root) => `
  ${renderHero(root, pages.contact, { secondaryLabel: `Call ${site.phone}`, secondaryTarget: site.phoneHref })}
  <section class="section contact-section">
    <div class="section-copy">
      <span class="section-label">Consultation</span>
      <h2>What happens next.</h2>
      <p>Techordia reviews the support need, the environment shape, and the right service lane before recommending next steps.</p>
      <div class="contact-direct">
        <a href="${site.phoneHref}">${esc(site.phone)}</a>
        <a href="mailto:${site.email}">${esc(site.email)}</a>
        <span>${esc(site.address)}</span>
      </div>
    </div>
    ${renderContactForm()}
  </section>
  ${renderFinalCta(root)}`;

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

await writeFile(
  path.join(outDir, "robots.txt"),
  "User-agent: *\nDisallow: /\n",
  "utf8"
);

console.log(`Generated ${allPages.length} staging pages.`);
