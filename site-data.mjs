export const site = {
  brand: "Techordia",
  phone: "877-925-4785",
  email: "support@techordia.com",
  address: "887 Island Drive, Suite C, Alameda, CA 94502",
  tagline: "Managed IT services for Bay Area SMBs.",
  description:
    "Techordia provides managed IT, Microsoft 365, cybersecurity, cloud, server, backup, and project support for Bay Area SMBs from Alameda.",
  logo: "assets/techordia-logo-official.png"
};

const serviceComponents = [
  ["Help Desk", "Responsive user support, remote sessions, access fixes, and daily troubleshooting."],
  ["Emergency Support", "Urgent issue response for downtime, access loss, outages, and critical blockers."],
  ["Cloud Services", "Microsoft 365, Teams, SharePoint, OneDrive, licensing, permissions, and security."],
  ["Server Management", "Windows Server, identity, patching, monitoring, vendors, and infrastructure support."],
  ["Backups & Recovery", "Backup coverage checks, restore expectations, continuity planning, and recovery support."],
  ["Security", "MFA, endpoint protection, email safety, access reviews, and risk cleanup."]
];

const commonFaqs = [
  ["How fast can we start?", "We begin with a discovery call, then map users, devices, cloud systems, risks, and priorities."],
  ["How do users get help?", "Email, phone, remote sessions, ticketing, and clear escalation paths."],
  ["Can you work with our IT person?", "Yes. Co-managed support adds capacity, tools, project help, and escalation backup."],
  ["Where do you work?", "Techordia is based in Alameda and supports the Bay Area, hybrid teams, and remote users."]
];

const serviceCards = [
  {
    title: "Managed IT",
    path: "services/fully-managed-it-services/",
    summary: "Day-to-day IT ownership for users, devices, Microsoft 365, networks, vendors, and support.",
    cta: "Get Managed IT",
    details: [
      ["What it is", "Your outsourced IT team."],
      ["Includes", "Help desk, devices, cloud, network, security, backup."],
      ["Best for", "Teams without full internal IT."],
      ["How it works", "Recurring support with clear ownership."]
    ]
  },
  {
    title: "Co-Managed IT",
    path: "services/co-managed-it-services/",
    summary: "Extra hands, tools, documentation, and escalation backup for internal IT teams.",
    cta: "Extend Your Team",
    details: [
      ["What it is", "MSP support beside your IT staff."],
      ["Includes", "Overflow, tooling, projects, monitoring, escalation."],
      ["Best for", "Lean teams that need backup."],
      ["How it works", "Shared lanes and clean handoffs."]
    ]
  },
  {
    title: "IT Projects",
    path: "services/short-term-it-projects/",
    summary: "Clean execution for migrations, office moves, endpoint refreshes, networks, and rollouts.",
    cta: "Plan a Project",
    details: [
      ["What it is", "Focused execution for a defined outcome."],
      ["Includes", "Scope, rollout, testing, vendors, documentation."],
      ["Best for", "Moves, migrations, refreshes, upgrades."],
      ["How it works", "Clear plan, tight timeline, usable handoff."]
    ]
  },
  {
    title: "Cybersecurity",
    path: "services/cybersecurity/",
    summary: "Practical controls for identity, endpoints, email, backup, access, and risk reviews.",
    cta: "Improve Security",
    details: [
      ["What it is", "Security work your team can live with."],
      ["Includes", "MFA, endpoint care, email safety, backups, access."],
      ["Best for", "Teams that need fewer weak spots."],
      ["How it works", "Prioritize, fix, document, repeat."]
    ]
  }
];

const industryCards = [
  ["Artificial Intelligence", "services/ai-it-services/", "Secure devices, cloud access, and fast-moving technical teams."],
  ["Biotech and Health", "services/biotech-and-health-it-services/", "Careful support for sensitive data, users, and regulated workflows."],
  ["Aerospace", "services/aerospace-it-services/", "Reliable infrastructure, access control, and vendor coordination."],
  ["Fintech & Crypto", "services/fintech-and-crypto-it-services/", "Security-first IT for identity, endpoints, cloud, and audits."],
  ["SaaS", "services/saas-it-services/", "Scalable onboarding, offboarding, Microsoft 365, and endpoint operations."],
  ["Defense Tech", "services/defense-tech-it-services/", "Practical security operations, documentation, and device control."]
];

const aboutCards = [
  ["Testimonials", "about/reviews/", "Service outcomes without private client names."],
  ["Clients and Partners", "about/clients-partners/", "Who Techordia is built to support."],
  ["The Techordia Story", "about/story/", "Responsive support. Clear ownership. Practical security."],
  ["Careers", "about/jobs/", "Work on real client problems with a local MSP team."],
  ["Team", "about/team/", "Founder Wilson Lee and the service roles behind Techordia."],
  ["Employee Stories", "about/employee-stories/", "How Techordia approaches support, projects, and trust."]
];

const resourceCards = [
  ["IT Case Studies & White Papers", "it-case-studies-white-papers/", "Security, migration, cloud, and support resources."],
  ["Blog", "blogs/", "Short guidance for managed IT and security decisions."],
  ["FAQs", "faqs/", "Answers about services, support, pricing, and onboarding."],
  ["Free IT Resources", "resources/free-it-resources/", "Checklists for MSP readiness, Microsoft 365, backup, and security."]
];

const locationCards = [
  ["San Francisco", "managed-it-services/locations/san-francisco/", "Managed IT and cybersecurity support for San Francisco businesses."],
  ["Bay Area", "managed-it-services/locations/bay-area/", "Local support for Alameda, Oakland, San Francisco, San Jose, and distributed teams."],
  ["San Jose", "managed-it-services/locations/san-jose/", "Operational IT support for South Bay teams and growth-stage businesses."]
];

const policyCards = [
  ["Terms of Service", "terms-of-service/", "Placeholder terms for future review."],
  ["Privacy Policy", "privacy-policy/", "Placeholder privacy language for review."],
  ["Disclosure", "disclosure/", "Placeholder disclosure language for review."],
  ["Trust and Security", "trust-and-security/", "Security practices and client-safe commitments."]
];

export const navGroups = [
  { label: "Services", items: serviceCards.map(({ title, path }) => ({ title, path })) },
  { label: "Industries", items: industryCards.map(([title, path]) => ({ title, path })) },
  { label: "About", items: aboutCards.map(([title, path]) => ({ title, path })) },
  { label: "Resources", items: resourceCards.map(([title, path]) => ({ title, path })) }
];

export const footerGroups = [
  { label: "About Us", items: aboutCards.map(([title, path]) => ({ title, path })) },
  { label: "Services", items: serviceCards.map(({ title, path }) => ({ title, path })) },
  { label: "Industries", items: industryCards.map(([title, path]) => ({ title, path })) },
  { label: "Resources", items: [...resourceCards.map(([title, path]) => ({ title, path })), { title: "Existing Clients", path: "existing-clients/" }, { title: "Contact Us", path: "contact/" }] },
  { label: "Locations", items: locationCards.map(([title, path]) => ({ title, path })) }
];

export const homePage = {
  path: "",
  title: "Techordia | Managed IT Services, IT Support, IT Consulting",
  description: site.description,
  hero: {
    eyebrow: "Managed IT services for Bay Area small and midsize businesses.",
    title: "Fast Support. Clean Systems. Less IT Noise.",
    text: "Techordia helps Bay Area SMBs stay productive with responsive IT support, Microsoft 365 management, security, backups, and day-to-day operational support.",
    primary: "Book a Consultation",
    secondary: "See How We Help",
    microcopy:
      "Book a consultation to review your current IT setup and identify support, security, or infrastructure gaps.",
    proof: [
      "Serving SMBs since 2010",
      "Help desk and emergency support",
      "Cloud, server, and security expertise"
    ],
    location: "Based in Alameda, serving Bay Area businesses"
  },
  sections: {
    trustTitle: "Supporting SMBs since 2010.",
    serviceTitle: "Four Simple Ways We Help",
    outcome:
      "We help your team stay productive, reduce downtime, and keep critical systems supported as your business grows.",
    whyTitle: "Why Techordia",
    why: [
      ["Fast response", "Support for users, devices, access, and urgent issues."],
      ["Clean systems", "Microsoft 365, servers, backups, and endpoints kept organized."],
      ["Local ownership", "Alameda-based support for Bay Area SMBs."],
      ["Security built in", "Identity, email, devices, and backups stay covered."]
    ],
    testimonials: [
      ["Support that moves", "Issues get routed, worked, and documented without extra noise."],
      ["Security that fits", "Controls focus on access, devices, email, backups, and real operations."],
      ["Projects that land", "Cutovers come with testing, vendor coordination, and handoff notes."]
    ]
  }
};

const baseServicePages = [
  {
    path: "services/fully-managed-it-services/",
    title: "Fully Managed IT Services | Techordia",
    h1: "Fully Managed IT",
    kicker: "Your users, devices, cloud, network, vendors, and security handled in one place.",
    intro:
      "Techordia becomes your day-to-day IT team. We support users, manage Microsoft 365, keep devices covered, coordinate vendors, and document the environment.",
    packageTitle: "Managed IT Details",
    components: serviceComponents,
    benefitsTitle: "Clean daily IT operations",
    benefits: [
      ["Local and remote", "Bay Area presence with remote reach for hybrid teams."],
      ["Security included", "MFA, endpoint protection, email safety, backup checks, and access reviews."],
      ["Documented", "Devices, vendors, access paths, and support notes stay usable."],
      ["Steady improvement", "Monitoring, maintenance, and planning keep IT moving."]
    ],
    faqs: commonFaqs
  },
  {
    path: "services/co-managed-it-services/",
    title: "Co-Managed IT Services | Techordia",
    h1: "Co-Managed IT",
    kicker: "Extra capacity for internal IT teams that need help without losing control.",
    intro:
      "Techordia works beside your IT lead or internal team. We take on support overflow, monitoring, projects, documentation, Microsoft 365, and escalation work.",
    packageTitle: "Co-Managed IT Details",
    components: [
      ["Overflow Support", "Extra hands when tickets, onboarding, or escalations pile up."],
      ["Shared Ownership", "Clear lines between your team and ours."],
      ["Monitoring", "RMM alerts, patching, endpoint health, and recurring maintenance."],
      ["Security Support", "Identity, endpoint, email, backup, and admin controls."],
      ["Planning", "Roadmaps, lifecycle notes, vendor support, and budget input."],
      ["Projects", "Migrations, rollouts, network changes, and cleanup work."]
    ],
    benefitsTitle: "Support without stepping on toes",
    benefits: [
      ["More capacity", "Take pressure off internal IT."],
      ["Specialist backup", "Microsoft 365, endpoints, network, backup, and security depth."],
      ["Clean escalation", "Users and technical teams know where work goes."],
      ["Flexible coverage", "Scale up for projects, peak work, or maintenance."]
    ],
    faqs: commonFaqs
  },
  {
    path: "services/short-term-it-projects/",
    title: "Short-Term IT Projects | Techordia",
    h1: "IT Projects",
    kicker: "Focused execution for migrations, office moves, upgrades, rollouts, and cleanup work.",
    intro:
      "Techordia scopes the work, coordinates vendors, handles the technical steps, tests the result, and leaves useful handoff notes. T&M support is available for scoped project work.",
    packageTitle: "Project Support Details",
    components: [
      ["Scope", "Goals, owners, timeline, prerequisites, and success criteria."],
      ["Microsoft 365", "Mailbox, Teams, SharePoint, OneDrive, licensing, and permissions."],
      ["Endpoint Rollouts", "Workstations, RMM, remote support, security baseline, and cutover."],
      ["Network Work", "Firewall, Wi-Fi, VPN, switching, cleanup, and vendor coordination."],
      ["Office Moves", "Connectivity, printers, rooms, workstations, and go-live support."],
      ["Handoff", "Documentation, remediation, and stabilization after launch."]
    ],
    benefitsTitle: "Projects that finish cleanly",
    benefits: [
      ["Defined scope", "Know what is included and what blocks go-live."],
      ["Usable handoff", "Project work becomes supportable documentation."],
      ["User-ready", "Testing and support planning reduce cutover noise."],
      ["Vendor coordination", "Carriers, software vendors, hardware partners, and support teams stay aligned."]
    ],
    faqs: commonFaqs
  },
  {
    path: "services/cybersecurity/",
    title: "Cybersecurity | Techordia",
    h1: "Cybersecurity",
    kicker: "Practical controls for identity, endpoints, email, backups, and access.",
    intro:
      "Techordia helps reduce avoidable risk without turning security into theater. We focus on the controls that protect daily work.",
    packageTitle: "Cybersecurity Details",
    components: [
      ["Identity", "MFA, admin access, groups, lifecycle reviews, and access notes."],
      ["Endpoints", "Inventory, patching, endpoint security, encryption, RMM, and remediation."],
      ["Email", "Microsoft 365 controls, mailbox settings, phishing risk, and permissions."],
      ["Backup", "Coverage checks, restore expectations, and continuity notes."],
      ["Risk Reviews", "Plain findings, priorities, and recurring improvement tracking."],
      ["Security Documentation", "Useful notes for access, devices, backups, remediation, and ownership."]
    ],
    benefitsTitle: "Security that helps operations",
    benefits: [
      ["Reduce risk", "Protect users, devices, email, data, and admin access."],
      ["Prepare for reviews", "Keep useful evidence and documentation close."],
      ["Keep it maintainable", "Security runs in the same rhythm as IT support."],
      ["Make ownership clear", "Alerts, access, backup, and remediation have owners."]
    ],
    faqs: commonFaqs
  }
];

const industryPages = industryCards.map(([title, path, summary]) => ({
  path,
  title: `${title} IT Services | Techordia`,
  h1: `${title} IT Services`,
  kicker: summary,
  intro:
    "Secure users, devices, Microsoft 365, vendors, and support workflows without slowing the team down.",
  packageTitle: `${title} support lanes`,
  components: [
    ["Users", "Onboarding, offboarding, access, laptops, apps, and remote work."],
    ["Cloud", "Microsoft 365, Teams, SharePoint, OneDrive, permissions, and licensing."],
    ["Security", "MFA, endpoint protection, patching, backup, email safety, and admin access."],
    ["Vendors", "Software, hardware, ISP, carrier, SaaS, and specialty escalations."],
    ["Docs", "Workflows, devices, access paths, and support notes."],
    ["Roadmap", "Lifecycle, budget, risk, and project planning."]
  ],
  benefitsTitle: `Managed IT for ${title} teams`,
  benefits: [
    ["Flexible lane", "Managed, co-managed, or project support."],
    ["Security-minded", "Protect identities, devices, data, and vendor access."],
    ["Bay Area base", "Alameda presence with remote reach."],
    ["Clear updates", "Support, risk, maintenance, and next steps."]
  ],
  faqs: commonFaqs
}));

const standardPages = [
  {
    path: "services/",
    title: "IT Services | Techordia",
    h1: "IT Service Packages",
    kicker: "Four clear support models for managed IT, co-managed IT, projects, and cybersecurity.",
    intro: "Pick the support lane that fits how your team works now.",
    cards: serviceCards
  },
  {
    path: "about/story/",
    title: "The Techordia Story | Techordia",
    h1: "The Techordia Story",
    kicker: "Local IT support with ownership, speed, and practical security.",
    intro: "Founder Wilson Lee built Techordia around a simple idea: IT should be clear, responsive, and owned end to end.",
    cards: [
      { title: "Local roots", path: "contact/", summary: "Techordia is based in Alameda and serves the Bay Area and beyond." },
      { title: "Operational focus", path: "services/fully-managed-it-services/", summary: "Support, documentation, security, and project work are handled as one system." },
      { title: "Security built in", path: "services/cybersecurity/", summary: "Identity, devices, backup, and cloud controls are part of daily IT operations." }
    ]
  },
  {
    path: "about/team/",
    title: "Team | Techordia",
    h1: "The Techordia Team",
    kicker: "Led by founder Wilson Lee, supported by practical MSP operators.",
    intro: "Meet the service roles behind Techordia. Full team bios can be added as approved.",
    people: [
      ["Wilson Lee", "Founder", "Responsive support, practical security, and technology operations clients can trust."],
      ["Service Desk", "Client Support", "Daily user support, ticket coordination, remote sessions, and documentation."],
      ["Project Team", "Infrastructure and Cloud", "Migrations, endpoint rollouts, Microsoft 365, network, and security projects."]
    ]
  },
  {
    path: "about/clients-partners/",
    title: "Clients and Partners | Techordia",
    h1: "Clients and Partners",
    kicker: "Built for teams that need reliable IT without extra noise.",
    intro: "Client names stay private until approved. These are the types of teams Techordia is built to support.",
    cards: [
      { title: "Housing and public-sector-adjacent teams", path: "services/fully-managed-it-services/", summary: "Support for users, devices, cloud, phones, access, and documentation." },
      { title: "Professional services", path: "services/co-managed-it-services/", summary: "Reliable support, Microsoft 365 administration, and security-minded operations." },
      { title: "Growth-stage companies", path: "services/saas-it-services/", summary: "Scalable endpoint, onboarding, cloud, and vendor operations." }
    ]
  },
  {
    path: "about/reviews/",
    title: "Testimonials | Techordia",
    h1: "Testimonials",
    kicker: "The outcomes Techordia is built to deliver.",
    intro: "Approved client quotes can be added here later. For now, these cards describe the service standard.",
    testimonials: homePage.sections.testimonials
  },
  {
    path: "about/jobs/",
    title: "Careers | Techordia",
    h1: "Careers",
    kicker: "Solve real IT problems for Bay Area teams.",
    intro: "Open roles can be added here as the team grows.",
    cards: [
      { title: "Support Specialist", path: "contact/", summary: "Remote and onsite support, ticket ownership, documentation, and user communication." },
      { title: "Systems Engineer", path: "contact/", summary: "Microsoft 365, endpoint tools, networking, backup, security, and project execution." },
      { title: "Client Success", path: "contact/", summary: "Service reviews, documentation quality, client communication, and operational follow-through." }
    ]
  },
  {
    path: "about/employee-stories/",
    title: "Employee Stories | Techordia",
    h1: "Employee Stories",
    kicker: "How Techordia thinks about support, projects, and trust.",
    intro: "Future team stories can live here. For now, these cards show the operator mindset.",
    cards: [
      { title: "Support with context", path: "services/fully-managed-it-services/", summary: "Good support is faster when the MSP knows the environment and documents the fix." },
      { title: "Projects with handoff", path: "services/short-term-it-projects/", summary: "Project work should leave the client easier to support afterward." },
      { title: "Security as habit", path: "services/cybersecurity/", summary: "Security is strongest when it is built into normal operations." }
    ]
  },
  {
    path: "it-case-studies-white-papers/",
    title: "IT Case Studies and White Papers | Techordia",
    h1: "IT Case Studies & White Papers",
    kicker: "Short resources for IT planning and security decisions.",
    intro: "Future client-safe case studies and guides can live here.",
    cards: [
      { title: "Microsoft 365 migration readiness", path: "resources/free-it-resources/", summary: "A planning framework for mailboxes, files, permissions, identities, and cutover support." },
      { title: "Security baseline checklist", path: "services/cybersecurity/", summary: "Identity, endpoint, backup, email, and administrative control priorities." },
      { title: "Managed IT onboarding guide", path: "services/fully-managed-it-services/", summary: "What to collect before bringing a new MSP into the environment." }
    ]
  },
  {
    path: "blogs/",
    title: "Blog | Techordia",
    h1: "Blog",
    kicker: "Practical IT notes for Bay Area businesses.",
    intro: "Short posts about managed IT, cybersecurity, Microsoft 365, cloud, backup, and support.",
    cards: [
      { title: "What to expect from a local MSP", path: "services/fully-managed-it-services/", summary: "Support paths, onboarding, documentation, security, reporting, and recurring maintenance." },
      { title: "When co-managed IT makes sense", path: "services/co-managed-it-services/", summary: "How internal IT teams use an MSP for capacity, tooling, and specialist support." },
      { title: "Security controls that matter first", path: "services/cybersecurity/", summary: "MFA, device coverage, patching, backup, access reviews, and email safety." }
    ]
  },
  {
    path: "resources/free-it-resources/",
    title: "Free IT Resources | Techordia",
    h1: "Free IT Resources",
    kicker: "Checklists and planning guides for IT decision makers.",
    intro: "Downloadable assets can be added later. These cards are ready for the first guides.",
    cards: [
      { title: "MSP readiness checklist", path: "services/fully-managed-it-services/", summary: "Users, devices, vendors, cloud tools, access paths, and support expectations." },
      { title: "Microsoft 365 security checklist", path: "services/cybersecurity/", summary: "MFA, admin accounts, mailbox controls, SharePoint permissions, and device security." },
      { title: "Project cutover checklist", path: "services/short-term-it-projects/", summary: "Scope, prerequisites, users, rollback, testing, documentation, and support coverage." }
    ]
  },
  {
    path: "faqs/",
    title: "FAQs | Techordia",
    h1: "Frequently Asked Questions",
    kicker: "Quick answers about support, service models, onboarding, and pricing.",
    intro: "Start here, then talk through the details with Techordia.",
    faqGroups: [
      ["General Questions", commonFaqs],
      ["Services", [
        ["What services are included?", "Managed IT can include help desk, monitoring, patching, Microsoft 365, network support, backup, vendor coordination, security controls, and project work."],
        ["Do you provide onsite support?", "Yes. Techordia is based in Alameda and can support local Bay Area work where onsite help is needed."],
        ["Do you support Microsoft 365?", "Yes. Microsoft 365 administration, Exchange, Teams, SharePoint, OneDrive, licensing, security, and permissions are common Techordia work."]
      ]],
      ["Contract and Pricing", [
        ["How are services priced?", "Pricing depends on users, devices, tools, risk, scope, and service model. The consultation is used to define the right package."],
        ["Do you offer project-only work?", "Yes. Short-term IT projects can be scoped independently from recurring managed services."],
        ["Can services scale?", "Yes. Techordia can support fully managed, co-managed, project, and cybersecurity-focused engagements."]
      ]]
    ]
  },
  {
    path: "existing-clients/",
    title: "Existing Clients | Techordia",
    h1: "Existing Clients",
    kicker: "Support paths for current Techordia clients.",
    intro: "Need help? Email support@techordia.com or call 877-925-4785.",
    cards: [
      { title: "Email Support", path: "mailto:support@techordia.com", summary: "Send user issues, access requests, and service questions to support@techordia.com." },
      { title: "Call Support", path: "tel:+18779254785", summary: "Call 877-925-4785 for urgent support or escalation." },
      { title: "Remote Support", path: "contact/", summary: "Remote session links and client-specific instructions can be added here." }
    ]
  },
  {
    path: "contact/",
    title: "Contact Techordia | Managed IT Services",
    h1: "IT That Works As Hard As You Do.",
    kicker: "Tell us what is noisy, risky, or slowing the team down.",
    intro: "Start with users, devices, Microsoft 365, security risk, and the support coverage you need.",
    contact: true
  },
  {
    path: "contact-us/",
    title: "Contact Techordia | Managed IT Services",
    h1: "IT That Works As Hard As You Do.",
    kicker: "Tell us what is noisy, risky, or slowing the team down.",
    intro: "Start with users, devices, Microsoft 365, security risk, and the support coverage you need.",
    contact: true
  },
  ...policyCards.map(([title, path, summary]) => ({
    path,
    title: `${title} | Techordia`,
    h1: title,
    kicker: summary,
    intro: "Placeholder only. Review before using as formal policy language.",
    cards: [
      { title: "Current status", path: "contact/", summary: "Placeholder content is present so the page exists in the site structure." },
      { title: "Review needed", path: "contact/", summary: "Replace with approved Techordia language before relying on it for policy or legal use." },
      { title: "Contact Techordia", path: "contact/", summary: "For questions, contact Techordia directly at support@techordia.com or 877-925-4785." }
    ]
  })),
  ...locationCards.map(([title, path, summary]) => ({
    path,
    title: `Managed IT Services in ${title} | Techordia`,
    h1: `Managed IT Services in ${title}`,
    kicker: summary,
    intro: "Techordia provides responsive managed IT, cybersecurity, Microsoft 365, cloud, network, backup, and project support for local and distributed teams.",
    cards: serviceCards
  }))
];

export const allPages = [
  homePage,
  ...baseServicePages,
  ...industryPages,
  ...standardPages
];

export { serviceCards, industryCards, aboutCards, resourceCards, locationCards, policyCards, serviceComponents, commonFaqs };
