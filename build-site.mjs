import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  aboutCards,
  allPages,
  commonFaqs,
  footerGroups,
  homePage,
  industryCards,
  navGroups,
  policyCards,
  resourceCards,
  serviceCards,
  site
} from "./site-data.mjs";

const outDir = process.cwd();
const generatedDirs = [
  "services",
  "about",
  "resources",
  "it-case-studies-white-papers",
  "blogs",
  "faqs",
  "existing-clients",
  "contact",
  "contact-us",
  "managed-it-services",
  "terms-of-service",
  "privacy-policy",
  "disclosure",
  "trust-and-security"
];
const assetVersion = "20260528-bay-area-pro-2";

const esc = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const rootPrefix = (pagePath) => {
  if (!pagePath) return "";
  const levels = pagePath.split("/").filter(Boolean).length;
  return "../".repeat(levels);
};

const href = (root, target) => {
  if (target.startsWith("http") || target.startsWith("mailto:") || target.startsWith("tel:")) return target;
  if (target.startsWith("#")) return target;
  return `${root}${target}`;
};

const slug = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const renderLogo = (root) => `<img class="brand-logo" src="${root}${site.logo}" alt="${site.brand}" />`;

const renderHeader = (root, pagePath) => `
  <a class="skip-link" href="#main">Skip to Content</a>
  <header class="site-header">
    <div class="header-utility">
      <span>${esc(homePage.hero.location)}</span>
      <a href="${href(root, `tel:+1${site.phone.replaceAll("-", "")}`)}">${esc(site.phone)}</a>
    </div>
    <nav class="nav-shell" aria-label="Primary navigation">
      <a class="brand" href="${root}" aria-label="Techordia home">${renderLogo(root)}</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-menu" aria-label="Open navigation">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-menu" id="primary-menu">
        ${navGroups
          .map(
            (group) => `
            <div class="nav-group">
              <button class="nav-trigger" type="button" aria-expanded="false">${esc(group.label)}</button>
              <div class="mega-menu">
                ${group.items
                  .map((item) => `<a href="${href(root, item.path)}"${item.path === pagePath ? ' aria-current="page"' : ""}>${esc(item.title)}</a>`)
                  .join("")}
              </div>
            </div>`
          )
          .join("")}
        <a class="nav-link" href="${href(root, "existing-clients/")}"${pagePath === "existing-clients/" ? ' aria-current="page"' : ""}>Existing Clients</a>
        <a class="nav-cta" href="${href(root, "contact/")}">Contact Us</a>
      </div>
    </nav>
  </header>`;

const renderFooter = (root) => `
  <footer class="site-footer">
    <div class="footer-top">
      <div class="footer-brand">
        ${renderLogo(root)}
        <p>${esc(site.tagline)}</p>
        <p>${esc(site.address)}</p>
      </div>
      <div class="footer-links">
        ${footerGroups
          .map(
            (group) => `
            <div>
              <h2>${esc(group.label)}</h2>
              ${group.items.map((item) => `<a href="${href(root, item.path)}">${esc(item.title)}</a>`).join("")}
            </div>`
          )
          .join("")}
      </div>
    </div>
    <div class="footer-bottom">
      <span>Managed IT Services from Alameda, CA</span>
      <div class="footer-legal">
        ${policyCards.map(([title, path]) => `<a href="${href(root, path)}">${esc(title)}</a>`).join("")}
        <a href="#main">Back to top</a>
      </div>
    </div>
  </footer>`;

const renderButton = (root, label, target, variant = "primary") => `<a class="button ${variant}" href="${href(root, target)}">${esc(label)}</a>`;

const renderBadgeRow = () => `
  <div class="badge-row" aria-label="Techordia service focus areas">
    <span>Help Desk</span>
    <span>Emergency Support</span>
    <span>Cloud Services</span>
    <span>Server Management</span>
    <span>Backups &amp; Recovery</span>
  </div>`;

const renderTrustStrip = () => `
  <div class="trust-strip" aria-label="Techordia credibility markers">
    ${homePage.hero.proof.map((item) => `<span>${esc(item)}</span>`).join("")}
  </div>`;

const renderLogoRail = () => `
  <section class="logo-rail-section" aria-labelledby="trusted-heading">
    <div class="section-inner">
      <h2 id="trusted-heading">${esc(homePage.sections.trustTitle)}</h2>
      <div class="logo-rail" aria-label="Representative client categories">
        <div class="logo-track">
          ${["Housing", "Healthcare", "Professional Services", "SaaS", "Remote Teams", "Nonprofits", "Hybrid Offices", "Growing Teams"].map((name) => `<span>${esc(name)}</span>`).join("")}
          ${["Housing", "Healthcare", "Professional Services", "SaaS", "Remote Teams", "Nonprofits", "Hybrid Offices", "Growing Teams"].map((name) => `<span>${esc(name)}</span>`).join("")}
        </div>
      </div>
    </div>
  </section>`;

const renderHomeHero = (root) => `
  <section class="hero home-hero" data-hero>
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="hero-inner">
      <div class="hero-copy reveal">
        <p class="eyebrow">${esc(homePage.hero.eyebrow)}</p>
        <h1>${esc(homePage.hero.title)}</h1>
        <p>${esc(homePage.hero.text)}</p>
        ${renderTrustStrip()}
        <div class="hero-actions">
          ${renderButton(root, homePage.hero.primary, "contact/")}
          ${renderButton(root, homePage.hero.secondary, "#services", "secondary")}
        </div>
        <p class="cta-note">${esc(homePage.hero.microcopy)}</p>
        ${renderBadgeRow()}
      </div>
      <div class="coverage-panel reveal">
        <canvas class="coverage-canvas" width="760" height="620" data-coverage aria-label="Animated Bay Area managed IT service network"></canvas>
        <div class="coverage-card">
          <span>Alameda hub</span>
          <strong>Bay Area SMB support</strong>
          <p>Help desk, cloud, servers, security, and recovery connected in one support lane.</p>
        </div>
      </div>
    </div>
  </section>`;

const renderServiceCards = (root) => `
  <section class="section package-list" id="services">
    <div class="section-inner">
      <div class="section-heading">
        <p class="eyebrow">${esc(homePage.sections.serviceTitle)}</p>
        <h2>See how we help.</h2>
      </div>
      <div class="service-card-grid">
        ${serviceCards
          .map(
            (card, index) => `
            <a class="service-card reveal tilt-card" href="${href(root, card.path)}">
              <span class="service-icon" aria-hidden="true"></span>
              <span class="card-index">${String(index + 1).padStart(2, "0")}</span>
              <h3>${esc(card.title)}</h3>
              <p>${esc(card.summary)}</p>
              ${card.details ? `<dl class="package-points">${card.details.map(([label, text]) => `<div><dt>${esc(label)}</dt><dd>${esc(text)}</dd></div>`).join("")}</dl>` : ""}
              <span class="text-link">${esc(card.cta)}</span>
            </a>`
          )
          .join("")}
      </div>
    </div>
  </section>`;

const renderWhy = () => `
  <section class="section split-proof">
    <div class="section-inner split-layout">
      <div>
        <p class="eyebrow">Why Techordia</p>
        <h2>${esc(homePage.sections.whyTitle)}</h2>
        <p class="section-lead">${esc(homePage.sections.outcome)}</p>
      </div>
      <div class="proof-grid">
        ${homePage.sections.why.map(([title, text]) => `<article class="proof-card reveal"><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join("")}
      </div>
    </div>
  </section>`;

const renderTestimonials = () => `
  <section class="section testimonial-band">
    <div class="section-inner">
      <div class="section-heading">
        <p class="eyebrow">What clients should feel</p>
        <h2>Clear support. Less noise. Better control.</h2>
      </div>
      <div class="testimonial-grid">
        ${homePage.sections.testimonials.map(([title, text]) => `<article class="quote-card reveal"><p>${esc(text)}</p><strong>${esc(title)}</strong></article>`).join("")}
      </div>
    </div>
  </section>`;

const renderFaq = (faqs = commonFaqs, title = "Frequently Asked Questions") => `
  <section class="section faq-section">
    <div class="section-inner faq-layout">
      <aside class="faq-tabs" aria-label="FAQ categories">
        <span>General Questions</span>
        <span>Services</span>
        <span>Contract</span>
        <span>Pricing</span>
        <span>Scalability</span>
      </aside>
      <div>
        <p class="eyebrow">FAQ</p>
        <h2>${esc(title)}</h2>
        <div class="faq-list">
          ${faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}
        </div>
      </div>
    </div>
  </section>`;

const renderCta = (root) => `
  <section class="section final-cta">
    <div class="section-inner cta-panel">
      <div class="cta-icon" aria-hidden="true">T</div>
      <div>
        <h2>Ready to quiet the IT noise?</h2>
        <p>Talk through users, devices, Microsoft 365, risk, and support coverage.</p>
      </div>
      <div class="cta-actions">
        ${renderButton(root, "Book a Consultation", "contact/", "light")}
        ${renderButton(root, `Call ${site.phone}`, `tel:+1${site.phone.replaceAll("-", "")}`, "ghost")}
      </div>
    </div>
  </section>`;

const renderServiceMap = (page = {}) => `
  <div class="service-map" data-service-map aria-label="Managed IT operating model">
    <div class="map-hub">
      <span>Techordia</span>
      <strong>${esc(page.h1 || "Managed IT")}</strong>
    </div>
    <div class="map-lane lane-one"><span>Users</span><strong>Help Desk</strong></div>
    <div class="map-lane lane-two"><span>Cloud</span><strong>Microsoft 365</strong></div>
    <div class="map-lane lane-three"><span>Infrastructure</span><strong>Servers &amp; Network</strong></div>
    <div class="map-lane lane-four"><span>Protection</span><strong>Security &amp; Backups</strong></div>
    <div class="map-line line-one"></div>
    <div class="map-line line-two"></div>
    <div class="map-line line-three"></div>
    <div class="map-line line-four"></div>
  </div>`;

const renderContactForm = () => `
  <form class="contact-form" id="contact-form" data-contact-form data-contact-email="${site.email}">
    <div class="form-row">
      <label>First Name<span>*</span><input name="First name" required /></label>
      <label>Last Name<span>*</span><input name="Last name" required /></label>
    </div>
    <div class="form-row">
      <label>Company name<span>*</span><input name="Company" required /></label>
      <label>Number of employees<span>*</span><select name="Employees" required><option value="">Please Select</option><option>1-25</option><option>26-75</option><option>76-200</option><option>200+</option></select></label>
    </div>
    <label>Email address<span>*</span><input type="email" name="Email" required /></label>
    <label>Message<span>*</span><textarea name="Message" rows="5" required></textarea></label>
    <button class="button primary" type="submit">Let's Talk</button>
  </form>`;

const renderDetailHero = (root, page) => `
  <section class="hero detail-hero" data-hero>
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="hero-inner detail-inner">
      <div class="hero-copy reveal">
        <p class="eyebrow">${page.contact ? "Contact Techordia" : "Techordia services"}</p>
        <h1>${esc(page.h1)}</h1>
        <p>${esc(page.kicker || page.intro)}</p>
        <div class="hero-actions">
          ${renderButton(root, page.contact ? "Let's Talk" : "Book a Consultation", page.contact ? "#contact-form" : "contact/")}
          ${renderButton(root, "Call Techordia", `tel:+1${site.phone.replaceAll("-", "")}`, "secondary")}
        </div>
      </div>
      <div class="detail-art reveal">
        ${page.contact ? `<div class="founder-video"><div class="play-button">T</div><h2>Wilson Lee</h2><p>Founder, Techordia</p></div>` : renderServiceMap(page)}
      </div>
    </div>
  </section>`;

const renderPackageDetails = (page) => `
  <section class="section package-detail">
    <div class="section-inner">
      <div class="copy-form-grid">
        <div>
          <p class="eyebrow">${esc(page.packageTitle || "Package Details")}</p>
          <h2>${esc(page.benefitsTitle || page.h1)}</h2>
          <p class="section-lead">${esc(page.intro)}</p>
          <div class="detail-grid">
            ${(page.details || serviceCards.find((card) => card.path === page.path)?.details || page.benefits || []).slice(0, 4).map(([label, text]) => `<article class="detail-box reveal"><h3>${esc(label)}</h3><p>${esc(text)}</p></article>`).join("")}
          </div>
        </div>
        ${renderContactForm()}
      </div>
    </div>
  </section>`;

const renderComponents = (components, title = "Key Components") => `
  <section class="section component-section">
    <div class="section-inner">
      <div class="section-heading">
        <p class="eyebrow">${esc(title)}</p>
        <h2>The pieces that keep IT moving.</h2>
      </div>
      <div class="component-grid">
        ${components.map(([title, text]) => `<article class="component-card reveal"><div class="line-icon">${esc(title.charAt(0))}</div><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join("")}
      </div>
    </div>
  </section>`;

const renderBenefits = (page) => `
  <section class="section benefits-section">
    <div class="section-inner split-layout">
      <div>
        <p class="eyebrow">Why it works</p>
        <h2>${esc(page.benefitsTitle || "Practical IT outcomes")}</h2>
      </div>
      <div class="benefit-stack">
        ${(page.benefits || []).map(([title, text]) => `<article class="benefit-row reveal"><span></span><div><h3>${esc(title)}</h3><p>${esc(text)}</p></div></article>`).join("")}
      </div>
    </div>
  </section>`;

const renderCardPage = (root, page) => `
  ${renderDetailHero(root, page)}
  <section class="section card-page-section">
    <div class="section-inner">
      <div class="copy-form-grid">
        <div>
          <p class="eyebrow">Overview</p>
          <h2>${esc(page.h1)}</h2>
          <p class="section-lead">${esc(page.intro)}</p>
        </div>
        ${page.contact ? renderContactForm() : `<div class="info-panel"><h3>Talk to Techordia</h3><p>Email ${esc(site.email)} or call ${esc(site.phone)} to discuss the right support model.</p>${renderButton(root, "Contact Us", "contact/")}</div>`}
      </div>
      ${page.cards ? `<div class="service-card-grid compact">${page.cards.map((card) => `<a class="service-card reveal" href="${href(root, card.path)}"><h3>${esc(card.title)}</h3><p>${esc(card.summary)}</p><span class="text-link">Open page</span></a>`).join("")}</div>` : ""}
      ${page.people ? `<div class="people-grid">${page.people.map(([name, role, text]) => `<article class="person-card reveal"><div class="person-avatar">${esc(name.charAt(0))}</div><h3>${esc(name)}</h3><strong>${esc(role)}</strong><p>${esc(text)}</p></article>`).join("")}</div>` : ""}
      ${page.testimonials ? `<div class="testimonial-grid">${page.testimonials.map(([title, text]) => `<article class="quote-card reveal"><p>${esc(text)}</p><strong>${esc(title)}</strong></article>`).join("")}</div>` : ""}
      ${page.faqGroups ? renderFaqGroups(page.faqGroups) : ""}
    </div>
  </section>`;

const renderFaqGroups = (groups) => `
  <div class="faq-groups">
    ${groups
      .map(
        ([label, faqs]) => `
        <section class="faq-group" id="${slug(label)}">
          <h2>${esc(label)}</h2>
          <div class="faq-list">${faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
        </section>`
      )
      .join("")}
  </div>`;

const renderHome = (root) => `
  ${renderHomeHero(root)}
  ${renderWhy()}
  ${renderServiceCards(root)}
  ${renderLogoRail()}
  ${renderComponents([
    ["Help Desk", "User support, remote sessions, access requests, and daily fixes."],
    ["Emergency Support", "Urgent response for outages, access loss, and critical blockers."],
    ["Cloud Services", "Microsoft 365, Teams, SharePoint, OneDrive, licensing, and permissions."],
    ["Server Management", "Server health, patching, monitoring, vendors, and infrastructure support."],
    ["Backups & Recovery", "Coverage checks, restore expectations, continuity planning, and recovery support."],
    ["Security", "MFA, endpoints, email safety, backup checks, and access reviews."]
  ], "How Techordia Helps")}
  ${renderTestimonials()}
  ${renderFaq(commonFaqs)}
  ${renderCta(root)}`;

const isDetailedService = (page) => Boolean(page.components && page.benefits);

const renderMain = (root, page) => {
  if (page.path === "") return renderHome(root);
  if (isDetailedService(page)) {
    return `
      ${renderDetailHero(root, page)}
      ${renderPackageDetails(page)}
      ${renderFaq(page.faqs || commonFaqs)}
      ${renderLogoRail()}
      ${renderComponents(page.components)}
      ${renderBenefits(page)}
      ${renderCta(root)}`;
  }
  return `${renderCardPage(root, page)}${renderCta(root)}`;
};

const renderHtml = (page) => {
  const root = rootPrefix(page.path);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(page.title || site.brand)}</title>
    <meta name="description" content="${esc(page.description || page.kicker || site.description)}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link rel="icon" href="${root}assets/techordia-logo.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="${root}styles.css?v=${assetVersion}" />
    <script defer src="${root}script.js?v=${assetVersion}"></script>
  </head>
  <body data-page="${esc(page.path || "home")}">
    <div class="scroll-progress" aria-hidden="true"></div>
    ${renderHeader(root, page.path)}
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

console.log(`Generated ${allPages.length} pages.`);
