export const site = {
  brand: "Techordia",
  phone: "877-925-4785",
  phoneHref: "tel:+18779254785",
  email: "support@techordia.com",
  address: "887 Island Drive, Suite C, Alameda, CA 94502",
  founded: "2010",
  founder: "Wilson Lee",
  region: "Bay Area",
  logo: "assets/techordia-logo-official.png",
  description:
    "Techordia provides relationship-driven managed IT, co-managed IT, cybersecurity, and IT project support for Bay Area SMBs."
};

export const reviewWidget = {
  source: "Google reviews",
  title: "Client feedback",
  note: "Verified Google Business Profile rating and review count can be connected before launch.",
  status: "Rating verification pending"
};

export const servicePages = [
  {
    key: "managed",
    icon: "headset",
    title: "Managed IT",
    path: "services/fully-managed-it-services/",
    seoTitle: "Managed IT Services | Techordia",
    summary: "A complete IT support lane for users, devices, Microsoft 365, vendors, backups, and daily operations.",
    what: "Techordia becomes the primary IT partner for day-to-day support, systems management, documentation, vendor coordination, and recurring maintenance.",
    bestFor: "SMBs with 10-200 employees that need dependable IT ownership without hiring a full internal team.",
    how: "We map the environment, stabilize support paths, document critical systems, and operate IT with clear ticket ownership and escalation.",
    hero:
      "A dependable IT operating model for teams that need support, security, and continuity handled under one accountable partner.",
    fit: "SMBs without a full internal IT team.",
    visual: "managed",
    intro:
      "Managed IT is built for businesses that want users supported, critical systems watched, vendors coordinated, and recurring IT work owned without adding management burden.",
    outcomes: [
      ["Stay productive", "Users have a clear support path when work is blocked, and urgent issues can escalate beyond the normal ticket queue."],
      ["Reduce downtime", "Devices, Microsoft 365, backups, servers, and vendors stay visible so preventable outages are caught earlier."],
      ["Grow with less IT drag", "Documentation, onboarding, access, and lifecycle planning improve as the business adds people and systems."]
    ],
    steps: [
      ["Discover", "Identify users, devices, cloud systems, vendors, support paths, risk areas, and recurring pain."],
      ["Stabilize", "Clarify ticket routing, remote support access, backup visibility, endpoint coverage, and priority gaps."],
      ["Operate", "Handle help desk, maintenance, vendor coordination, documentation, and escalation for daily operations."],
      ["Improve", "Review lifecycle needs, recurring issues, security cleanup, and projects that will reduce future noise."]
    ],
    faqs: [
      ["How does Techordia take over from our current IT provider?", "We start by collecting access, documentation, vendor contacts, backup status, Microsoft 365 details, endpoint coverage, and open issues. The first goal is continuity, then cleanup."],
      ["Will our employees contact Techordia directly?", "Most managed IT clients route users directly to Techordia for support. During onboarding, we define ticket paths, urgent escalation, onsite expectations, and who approves larger changes."],
      ["What happens when an issue is urgent?", "Urgent issues are triaged for business impact. Ticket-based support handles normal requests, and after-hours or on-call escalation can be defined for events that stop work."],
      ["How do you keep our environment from becoming undocumented again?", "Documentation is part of the operating rhythm: users, devices, access paths, vendors, recurring fixes, and project handoffs are captured as support work happens."]
    ]
  },
  {
    key: "co-managed",
    icon: "lanes",
    title: "Co-Managed IT",
    path: "services/co-managed-it-services/",
    seoTitle: "Co-Managed IT Services | Techordia",
    summary: "Extra capacity, escalation, documentation, tooling, and project support for internal IT teams.",
    what: "Techordia works beside your internal IT lead or small IT team with explicit ownership lanes for overflow, escalation, maintenance, and projects.",
    bestFor: "Businesses with internal IT that need more capacity, better documentation, or a dependable escalation partner.",
    how: "We define shared lanes, connect support tooling, absorb agreed work, and review recurring issues so internal IT is not carrying everything alone.",
    hero: "Support your internal IT team with a practical partner that can absorb tickets, projects, escalation, and operational follow-through.",
    fit: "Internal IT teams that need overflow, projects, or specialist depth.",
    visual: "co-managed",
    intro:
      "Co-managed IT is strongest when ownership is explicit. Your team keeps the lanes it should own, and Techordia handles the pressure points that need more capacity or specialized follow-through.",
    outcomes: [
      ["Protect internal focus", "Your IT lead is not forced to choose between urgent tickets, projects, documentation, and strategic work every day."],
      ["Create clean handoffs", "Users and internal IT know what goes to Techordia, what stays internal, and when issues should escalate."],
      ["Reduce single-person risk", "Documentation, monitoring, and shared support history make the environment less dependent on one person."]
    ],
    steps: [
      ["Map lanes", "Define what internal IT owns, what Techordia owns, and what needs joint approval."],
      ["Connect tools", "Set support paths, remote access, monitoring, documentation locations, and escalation expectations."],
      ["Absorb work", "Take agreed tickets, maintenance, onboarding, security cleanup, and project tasks."],
      ["Review", "Use recurring reviews to adjust ownership, reduce repeat issues, and plan the next operational improvements."]
    ],
    faqs: [
      ["Can Techordia work under our IT manager?", "Yes. Co-managed IT is built around internal leadership, clear ownership lanes, and practical escalation instead of replacing the team by default."],
      ["Can our users still go to internal IT first?", "Yes. Some clients route users through internal IT first; others allow direct Techordia tickets for agreed categories. The model is defined during onboarding."],
      ["Can you help with projects while we keep daily support internal?", "Yes. Co-managed support can focus on projects, overflow, documentation, monitoring, or escalations depending on where the internal team needs relief."],
      ["How do you avoid stepping on internal processes?", "We document the operating lanes, approval points, ticket routing, and communication rhythm before taking over work."]
    ]
  },
  {
    key: "cybersecurity",
    icon: "shield",
    title: "Cybersecurity",
    path: "services/cybersecurity/",
    seoTitle: "Cybersecurity Services | Techordia",
    summary: "Practical security controls for identity, endpoints, email, backups, admin access, and recovery readiness.",
    what: "Techordia helps SMBs strengthen the controls that matter most to daily operations: identity, endpoints, email, backup, access, and recovery.",
    bestFor: "Teams that need stronger protection and better recovery readiness without turning security into a confusing side project.",
    how: "We assess practical risk, prioritize the most important gaps, implement controls, and fold security maintenance into normal IT operations.",
    hero: "Security that protects the business without burying your team in jargon or one-time reports.",
    fit: "SMBs that need stronger controls, cleaner access, and better recovery readiness.",
    visual: "cybersecurity",
    intro:
      "Cybersecurity should make the business more resilient. Techordia focuses on controls your team can actually maintain and understand.",
    outcomes: [
      ["Reduce obvious risk", "Identity, admin access, endpoint health, email security, and backup gaps are prioritized first."],
      ["Improve continuity", "Recovery expectations, backup visibility, and critical-system dependencies become clearer."],
      ["Make security operational", "Security improvements become part of the support model instead of a separate annual panic."]
    ],
    steps: [
      ["Assess", "Review identity, endpoints, email, backup, admin access, exposed gaps, and business-critical systems."],
      ["Prioritize", "Separate urgent risk from cleanup that can be sequenced over time."],
      ["Remediate", "Apply controls, clean up access, improve visibility, and document what changed."],
      ["Maintain", "Fold recurring checks, updates, and review items into the IT support rhythm."]
    ],
    faqs: [
      ["Do you provide fake compliance badges or certification claims?", "No. The staging site avoids fake SOC, HIPAA, or ISO claims. Techordia focuses on practical controls and documentation that support real reviews."],
      ["What security controls usually come first?", "Identity, MFA, admin access, endpoint coverage, email protection, backup visibility, and recovery expectations usually come before low-value complexity."],
      ["Can security be included with managed IT?", "Yes. Security works best when it is integrated into daily IT operations, onboarding, offboarding, patching, backup checks, and support work."],
      ["How disruptive is a security cleanup?", "The goal is controlled improvement. Techordia sequences changes, communicates user impact, and avoids pushing unnecessary complexity all at once."]
    ]
  },
  {
    key: "projects",
    icon: "timeline",
    title: "IT Projects",
    path: "services/short-term-it-projects/",
    seoTitle: "IT Projects | Techordia",
    summary: "Scoped execution for migrations, office moves, endpoint rollouts, network changes, cleanup, and cutovers.",
    what: "Techordia plans and executes defined IT projects with scope, prerequisites, vendor coordination, cutover planning, testing, and support handoff.",
    bestFor: "Teams that have a clear change to make and need it delivered without chaos or lingering support problems.",
    how: "We clarify goals, dependencies, owners, timing, testing, rollback considerations, and documentation before and after the work.",
    hero: "IT projects planned around business continuity, clean cutovers, and supportable handoff.",
    fit: "Teams with a clear change to make and no room for messy execution.",
    visual: "projects",
    intro:
      "Projects are where hidden IT gaps often surface. Techordia scopes the change, coordinates dependencies, executes the technical work, and leaves the final state easier to support.",
    outcomes: [
      ["Cleaner cutovers", "Users, vendors, timing, rollback, and support coverage are planned before go-live."],
      ["Less project drift", "Scope, prerequisites, owners, and blockers stay visible."],
      ["Better handoff", "The final state is documented so support does not collapse after launch."]
    ],
    steps: [
      ["Scope", "Define goals, systems, dependencies, stakeholders, timing, and risk."],
      ["Prepare", "Confirm access, backups, vendors, users, hardware, licenses, and change windows."],
      ["Execute", "Handle migration, rollout, cutover, testing, communication, and live support."],
      ["Handoff", "Document the final state, open items, support notes, and recommendations."]
    ],
    faqs: [
      ["Do you do project-only work?", "Yes. Projects can be scoped independently from recurring managed services when the work and handoff expectations are clear."],
      ["What projects are a fit?", "Microsoft 365 migrations, endpoint rollouts, office moves, network work, server changes, cleanup, security remediation, and vendor-dependent cutovers."],
      ["How do you reduce cutover risk?", "We identify dependencies, confirm access and backups, plan timing, define rollback expectations, and communicate support coverage before go-live."],
      ["What happens after the project?", "Techordia documents the final state, reviews open items, and can either hand off support or continue under a managed/co-managed model."]
    ]
  }
];

export const approach = {
  path: "approach/",
  title: "Our Approach | Techordia",
  h1: "A practical process before a proposal.",
  intro:
    "We look at how your team works, which systems matter, where risk sits, and what support path users need before recommending a model.",
  visual: "approach",
  steps: [
    ["Discover", "Map users, devices, cloud systems, vendors, support paths, risks, and recurring pain."],
    ["Stabilize", "Fix urgent gaps, clarify escalation, check backup visibility, and make core support tooling reliable."],
    ["Document", "Capture users, devices, vendors, access, recurring fixes, and support notes where they belong."],
    ["Support", "Handle tickets, maintenance, changes, and urgent issues with clear ownership."],
    ["Improve", "Review lifecycle needs, security priorities, project opportunities, and preventable downtime."]
  ]
};

export const pages = {
  home: {
    path: "",
    title: "Techordia | Managed IT Services for Bay Area SMBs",
    h1: "IT that works. So you can.",
    intro:
      "Responsive IT support for Bay Area businesses with 10-200 employees that need fewer interruptions, cleaner systems, and a long-term partner who learns how the business runs.",
    visual: "home"
  },
  services: {
    path: "services/",
    title: "IT Services | Techordia",
    h1: "Choose the IT support model that fits how your business works.",
    intro:
      "Techordia supports Bay Area SMBs through managed IT, co-managed IT, cybersecurity, and focused IT projects.",
    visual: "services"
  },
  approach,
  about: {
    path: "about/",
    title: "About Techordia | Alameda Managed IT",
    h1: "The Techordia story starts with practical, relationship-driven IT support.",
    intro:
      "Since 2010, Techordia has helped Bay Area businesses keep users supported, critical systems stable, and technology easier to manage.",
    visual: "about"
  },
  contact: {
    path: "contact/",
    title: "Contact Techordia | Managed IT Services",
    h1: "Start with a conversation about what your team needs from IT.",
    intro:
      "Tell us about the support gaps, risks, projects, or recurring issues you want handled. We will help identify the right next step.",
    visual: "contact"
  }
};

export const navItems = [
  { title: "Services", path: "services/" },
  { title: "Approach", path: "approach/" },
  { title: "About", path: "about/" },
  { title: "Contact", path: "contact/" }
];

export const whyTechordia = [
  ["Stay productive", "Users get a clear place to go for help, so preventable IT issues do not quietly drain the workday."],
  ["Reduce downtime", "Ticket support, escalation, monitoring, backups, and vendor coordination work together instead of living in silos."],
  ["Keep critical systems supported", "Microsoft 365, endpoints, networks, backups, vendors, and access paths stay visible as the business grows."],
  ["Local presence", "Bay Area availability gives clients a partner who can combine remote support with onsite help when the situation calls for it."]
];

export const clientExperience = [
  ["IT feels owned", "Support requests, projects, security concerns, and vendor issues have a path forward instead of landing back on the owner or operations team."],
  ["Leaders see the road ahead", "Techordia helps management understand risks, lifecycle needs, and priorities in business language."],
  ["Work keeps moving", "The goal is not more IT activity. The goal is fewer surprises, cleaner handoffs, and a team that can stay focused."],
  ["Technology becomes an asset", "IT moves from liability and distraction toward a managed operating function that supports growth."]
];

export const leadershipNotes = [
  "Techordia leadership combines technical ownership with operational follow-through.",
  "Prospects work with people who learn the business context behind the ticket, not a rotating script."
];

export const pricing = {
  title: "Pricing depends on the shape of the environment.",
  intro:
    "A useful proposal has to account for users, devices, business-critical systems, support expectations, security risk, and project scope.",
  factors: [
    ["Users and devices", "How many people, endpoints, mobile devices, shared systems, and locations need support."],
    ["Support model", "Fully managed, co-managed, cybersecurity-focused, project-based, or a blend."],
    ["Risk and complexity", "Servers, backups, identity, vendors, compliance needs, access cleanup, and urgent gaps."],
    ["Project scope", "Migrations, office moves, endpoint refreshes, network changes, security remediation, and cutover support."]
  ]
};

export const contactFlow = [
  ["1", "Tell us what is happening", "Users, systems, risk, support gaps, or a project you need handled."],
  ["2", "We review the operating picture", "Techordia looks at users, devices, Microsoft 365, security, backup, vendors, and support paths."],
  ["3", "You get a practical next step", "We recommend the right service lane, priorities, and consultation path."]
];

export const faqGroups = [
  {
    key: "onboarding",
    label: "Onboarding",
    items: [
      ["What happens during the first few weeks with Techordia?", "We focus first on continuity: support routing, access, remote tools, documentation, backup visibility, vendor contacts, Microsoft 365, endpoints, and urgent gaps. Cleanup follows once the support path is stable."],
      ["How much time does our team need to spend during onboarding?", "Most clients need to help with access, priorities, vendor contacts, and key business context. Techordia does the technical mapping and turns that into an operating plan."]
    ]
  },
  {
    key: "response",
    label: "Responsiveness",
    items: [
      ["How do you handle urgent issues that stop work?", "Urgent issues are triaged by business impact. Ticket-based support covers normal work, while defined escalation and after-hours/on-call coverage can be used when downtime cannot wait."],
      ["Will users know how to get help?", "Yes. A clear support path is part of onboarding so users know when to submit a ticket, what information helps, and how urgent issues escalate."]
    ]
  },
  {
    key: "risk",
    label: "Risk",
    items: [
      ["How does Techordia reduce IT risk without overcomplicating everything?", "We prioritize practical controls first: identity, admin access, endpoint visibility, email protection, backup checks, recovery expectations, documentation, and vendor coordination."],
      ["What if our current environment is messy or undocumented?", "That is common. Techordia starts by making the environment supportable, then cleans up documentation, access, devices, vendors, and recurring issues in priority order."]
    ]
  },
  {
    key: "model",
    label: "Support model",
    items: [
      ["Can Techordia replace our IT person or support an internal IT lead?", "Both models are possible. Managed IT gives Techordia primary ownership; co-managed IT adds capacity and escalation while internal IT keeps defined lanes."],
      ["How are new services or projects added after the first consultation?", "We clarify the business goal, scope, prerequisites, timing, support impact, and handoff plan before recommending implementation."]
    ]
  }
];

export const teamMembers = [
  {
    group: "Partners",
    name: "Benjamin Schuyler",
    role: "Partner & Operations Project Manager",
    initials: "BS",
    linkedin: "https://www.linkedin.com/search/results/people/?keywords=Benjamin%20Schuyler%20Techordia",
    bio:
      "Benjamin helps turn support needs, project work, vendor dependencies, and operations priorities into organized execution."
  },
  {
    group: "Partners",
    name: "Wilson Lee",
    role: "CTO and Founder",
    initials: "WL",
    linkedin: "https://www.linkedin.com/search/results/people/?keywords=Wilson%20Lee%20Techordia",
    bio:
      "Wilson founded Techordia around the idea that business technology should be dependable, understandable, and actively managed."
  },
  {
    group: "Management",
    name: "Sara Schuyler",
    role: "Accounts Specialist and Benefits Administrator",
    initials: "SS",
    linkedin: "https://www.linkedin.com/search/results/people/?keywords=Sara%20Schuyler%20Techordia",
    bio:
      "Sara supports the account and administrative side of the client relationship so operational details stay organized."
  },
  {
    group: "Management",
    name: "Gunnar De Young",
    role: "Business Operations Manager",
    initials: "GD",
    linkedin: "https://www.linkedin.com/search/results/people/?keywords=Gunnar%20De%20Young%20Techordia",
    bio:
      "Gunnar helps keep service operations, communication, and internal follow-through aligned with the client experience."
  }
];

export const allPages = [
  pages.home,
  pages.services,
  ...servicePages,
  pages.approach,
  pages.about,
  pages.contact
];
