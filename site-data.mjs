export const site = {
  brand: "Techordia",
  phone: "877-925-4785",
  phoneHref: "tel:+18779254785",
  email: "info@techordia.com",
  address: "887 Island Drive, Suite C, Alameda, CA 94502",
  founded: "2010",
  founder: "Wilson Lee",
  region: "Alameda and the Bay Area",
  logo: "assets/techordia-logo-official.png",
  description:
    "Techordia provides responsive managed IT, Microsoft 365, cybersecurity, server, backup, and project support for Bay Area SMBs."
};

export const reviewWidget = {
  source: "Google reviews",
  title: "Client Feedback on Google",
  note: "See current public reviews from people who have worked with Techordia. Verified Google Business Profile details can be connected before launch.",
  status: "Rating verification pending"
};

export const servicePages = [
  {
    key: "managed",
    title: "Fully Managed IT",
    path: "services/fully-managed-it-services/",
    seoTitle: "Fully Managed IT Services | Techordia",
    summary: "Day-to-day IT ownership for users, devices, Microsoft 365, servers, vendors, backups, and support.",
    hero:
      "Your users, devices, cloud, network, vendors, and security handled in one accountable support lane.",
    fit: "SMBs without a full internal IT team.",
    included: ["Help desk", "Microsoft 365", "Endpoints", "Servers", "Backups", "Vendor coordination"],
    visual: "managed",
    cta: "Get Managed IT",
    intro:
      "Techordia becomes the operating layer for daily IT. Users get support, systems stay documented, and recurring work has an owner.",
    outcomes: [
      ["Faster support", "Users know where to go and urgent issues have a clear escalation path."],
      ["Cleaner systems", "Microsoft 365, devices, backups, and servers are tracked and maintained."],
      ["Less vendor noise", "Carriers, software vendors, hardware partners, and cloud providers stay coordinated."]
    ],
    steps: [
      ["Discover", "Users, devices, vendors, licenses, access paths, and risks."],
      ["Stabilize", "Support routes, security basics, backup checks, and endpoint coverage."],
      ["Operate", "Help desk, recurring maintenance, vendor coordination, and documentation."],
      ["Improve", "Roadmap, lifecycle planning, security cleanup, and project handoff."]
    ],
    faqs: [
      ["How fast can we start?", "We start with discovery, then prioritize support paths, access, devices, cloud, backups, and urgent gaps."],
      ["Do you support onsite work?", "Yes. Techordia is based in Alameda and supports Bay Area teams with remote and onsite help where it makes sense."],
      ["What is included?", "Support can include help desk, Microsoft 365, endpoints, servers, network, backup, vendors, security, and documentation."]
    ]
  },
  {
    key: "co-managed",
    title: "Co-Managed IT",
    path: "services/co-managed-it-services/",
    seoTitle: "Co-Managed IT Services | Techordia",
    summary: "Extra capacity, tooling, documentation, and escalation support for internal IT teams.",
    hero: "Keep control of IT while Techordia adds capacity where your team needs backup.",
    fit: "Internal IT teams that need overflow, projects, or specialist depth.",
    included: ["Overflow support", "Escalation", "Monitoring", "Projects", "Security support", "Documentation"],
    visual: "co-managed",
    cta: "Extend Your Team",
    intro:
      "Techordia works beside your IT lead. The model is explicit: your team keeps the lanes it owns, and Techordia handles the pressure points.",
    outcomes: [
      ["More capacity", "Tickets, onboarding, maintenance, and projects do not all bottleneck on one person."],
      ["Cleaner escalation", "Users and internal IT know when work moves to Techordia."],
      ["Better continuity", "Documentation, monitoring, and handoff notes make support less fragile."]
    ],
    steps: [
      ["Map lanes", "Define what internal IT owns and what Techordia owns."],
      ["Connect tools", "Set support paths, access, monitoring, and documentation expectations."],
      ["Absorb work", "Take overflow, maintenance, escalations, and project tasks."],
      ["Review", "Track recurring issues, risk, lifecycle needs, and next projects."]
    ],
    faqs: [
      ["Can you work under our IT manager?", "Yes. Co-managed support is built around shared ownership and clear handoffs."],
      ["Can you handle projects only?", "Yes. Co-managed support can include scoped project work and escalation coverage."],
      ["Do users contact Techordia directly?", "That is decided during onboarding. Some clients route users directly; others route through internal IT first."]
    ]
  },
  {
    key: "cybersecurity",
    title: "Cybersecurity",
    path: "services/cybersecurity/",
    seoTitle: "Cybersecurity Services | Techordia",
    summary: "Practical controls for identity, endpoints, email, backup, admin access, and risk cleanup.",
    hero: "Security work that protects daily operations without turning into theater.",
    fit: "SMBs that need stronger controls, cleaner access, and better recovery readiness.",
    included: ["MFA", "Endpoint care", "Email security", "Backup review", "Access reviews", "Risk cleanup"],
    visual: "cybersecurity",
    cta: "Improve Security",
    intro:
      "Techordia focuses on controls your team can actually maintain: identity, devices, email, backup, admin access, and documentation.",
    outcomes: [
      ["Reduce obvious risk", "Lock down access, endpoints, email, and administrative paths first."],
      ["Improve recovery", "Backups, restore expectations, and continuity notes are checked and documented."],
      ["Make security operational", "Security work becomes part of normal support, not a one-time report."]
    ],
    steps: [
      ["Assess", "Review identity, endpoints, email, backup, admins, and exposed gaps."],
      ["Prioritize", "Separate urgent risk from nice-to-have cleanup."],
      ["Remediate", "Apply controls and document what changed."],
      ["Maintain", "Fold reviews, updates, and recurring checks into support rhythm."]
    ],
    faqs: [
      ["Do you provide compliance certification?", "No fake certification claims. Techordia helps with practical controls and documentation that support reviews."],
      ["What comes first?", "Identity, admin access, endpoints, email, backup coverage, and recovery expectations."],
      ["Can security be part of managed IT?", "Yes. Security should be built into daily IT operations, not treated as a separate mystery project."]
    ]
  },
  {
    key: "projects",
    title: "IT Projects",
    path: "services/short-term-it-projects/",
    seoTitle: "IT Projects | Techordia",
    summary: "Focused execution for migrations, office moves, endpoint rollouts, network changes, and cleanup.",
    hero: "Defined IT projects with scope, cutover planning, testing, and handoff.",
    fit: "Teams with a clear change to make and no room for messy execution.",
    included: ["Scoping", "Migration", "Rollout", "Vendor coordination", "Testing", "Handoff"],
    visual: "projects",
    cta: "Plan a Project",
    intro:
      "Techordia scopes the work, coordinates dependencies, executes the technical pieces, tests the result, and leaves the environment easier to support.",
    outcomes: [
      ["Cleaner cutovers", "Users, vendors, timing, rollback, and support coverage are planned before go-live."],
      ["Less project drift", "Scope, owners, prerequisites, and blockers stay visible."],
      ["Usable handoff", "The final state is documented so support does not collapse after launch."]
    ],
    steps: [
      ["Scope", "Goals, systems, dependencies, owners, and timing."],
      ["Prepare", "Access, backups, vendors, users, hardware, and change windows."],
      ["Execute", "Migration, rollout, cutover, testing, and live support."],
      ["Handoff", "Documentation, stabilization, open items, and next-step recommendations."]
    ],
    faqs: [
      ["Do you do project-only work?", "Yes. Projects can be scoped independently from recurring managed services."],
      ["What projects fit?", "Microsoft 365 migrations, endpoint rollouts, office moves, network work, server changes, cleanup, and security remediation."],
      ["How is pricing handled?", "Project pricing depends on scope, timing, dependencies, risk, and support expectations."]
    ]
  }
];

export const approach = {
  path: "approach/",
  title: "Our Approach | Techordia",
  h1: "A practical process before a proposal.",
  intro:
    "We do not quote from a guess. We look at how your team works, what systems matter, where risk sits, and what support path your users need.",
  visual: "approach",
  steps: [
    ["Discover", "Map users, devices, cloud systems, vendors, support paths, risks, and recurring pain."],
    ["Stabilize", "Fix urgent gaps, clarify escalation, check backup coverage, and get core tooling visible."],
    ["Document", "Capture users, devices, vendors, access, recurring fixes, and support notes where they belong."],
    ["Support", "Handle tickets, maintenance, changes, and urgent issues with clear ownership."],
    ["Improve", "Review lifecycle needs, security priorities, project opportunities, and preventable noise."]
  ]
};

export const pages = {
  home: {
    path: "",
    title: "Techordia | Managed IT Services for Bay Area SMBs",
    h1: "Business IT support without the runaround.",
    intro:
      "Techordia helps small and mid-sized teams manage users, devices, Microsoft 365, security, backups, and day-to-day support.",
    visual: "home"
  },
  services: {
    path: "services/",
    title: "IT Services | Techordia",
    h1: "Managed IT, security, cloud, and project support.",
    intro:
      "Choose the level of help your team needs now. We can run IT for you, support your internal team, tighten security, or execute a defined project.",
    visual: "services"
  },
  approach,
  about: {
    path: "about/",
    title: "About Techordia | Alameda Managed IT",
    h1: "Techordia is a managed IT services company based in Alameda.",
    intro:
      "Since 2010, Techordia has supported small and mid-sized businesses with practical IT support, management, cloud services, and infrastructure help.",
    visual: "about"
  },
  contact: {
    path: "contact/",
    title: "Contact Techordia | Managed IT Services",
    h1: "Tell us what is not working.",
    intro:
      "Use the form or call Techordia to start a practical conversation about support, security, cloud, backup, or project work.",
    visual: "contact"
  }
};

export const navItems = [
  { title: "Services", path: "services/" },
  { title: "Approach", path: "approach/" },
  { title: "About", path: "about/" },
  { title: "Contact", path: "contact/" }
];

export const proof = [
  ["Serving SMBs since 2010", "Long-running support for Bay Area business operations."],
  ["Based in Alameda", "Local presence for Alameda, Oakland, San Francisco, San Jose, and remote teams."],
  ["Help desk and emergency support", "Responsive user support plus escalation when work stops."],
  ["Cloud, server, and security expertise", "Microsoft 365, endpoints, servers, backup, and risk cleanup."]
];

export const brandValues = [
  ["Real people, real answers", "You work with humans who learn your team, your systems, and the context behind the ticket."],
  ["White-glove IT support", "Careful support for the small details: onboarding, handoffs, vendors, access, and follow-through."],
  ["Fast when work stops", "Urgent issues get clear ownership, practical triage, and escalation when the business is blocked."],
  ["Can-do ownership", "Techordia looks for a path forward, coordinates the moving pieces, and stays with the problem."],
  ["Not scripted. Not robotic.", "Support is handled with judgment, plain language, and the flexibility real environments need."],
  ["Top-tier technical depth", "Strong troubleshooting across Microsoft 365, endpoints, servers, backups, security, and infrastructure."]
];

export const pricing = {
  title: "Pricing starts with the shape of your environment.",
  intro:
    "Techordia scopes support around users, devices, systems, risk, and service model instead of forcing every client into the same package.",
  factors: [
    ["Users and devices", "How many people, laptops, desktops, mobile devices, and shared systems need support."],
    ["Support model", "Fully managed, co-managed, cybersecurity-focused, or project-based coverage."],
    ["Risk and complexity", "Servers, backups, identity, vendors, compliance needs, and urgent cleanup."],
    ["Project scope", "Migrations, office moves, endpoint refreshes, network changes, and cutover support."]
  ]
};

export const contactFlow = [
  ["1", "Tell us what is happening", "Users, systems, risk, support gaps, or a project you need handled."],
  ["2", "We review the environment", "Techordia looks at users, devices, Microsoft 365, security, backup, and vendors."],
  ["3", "You get a support path", "We recommend the right service lane, priorities, and next steps."]
];

export const faqs = [
  ["Where does Techordia work?", "Techordia is based in Alameda and supports Bay Area businesses plus distributed teams."],
  ["What does the consultation cover?", "Users, devices, Microsoft 365, support pain, security gaps, backups, vendors, and any urgent projects."],
  ["Can Techordia replace our IT person?", "Yes for fully managed IT, or Techordia can support your existing IT lead through co-managed service."],
  ["Do you publish standard prices?", "The staging site uses process-based pricing language because support depends on users, devices, risk, scope, and service model."]
];

export const allPages = [
  pages.home,
  pages.services,
  ...servicePages,
  pages.approach,
  pages.about,
  pages.contact
];
