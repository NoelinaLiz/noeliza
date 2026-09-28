import type { Dict } from "./es";

/** English copy. It must keep the exact shape of `es.ts`. */
export const en: Dict = {
  lang: "en",
  locale: "en_US",
  htmlLang: "en",

  meta: {
    title: "NoeLiza (Noelia Lizárraga) | Marketing Technologist & MarTech Specialist",
    description:
      "Noelia Lizárraga (Noeliza), Marketing Technologist. Tracking, martech stack integrations and marketing data architecture across web, webviews and mobile apps.",
    ogTitle: "NoeLiza (Noelia Lizárraga) | Marketing Technologist",
    ogAlt: "NoeLiza · Marketing Technologist and MarTech Specialist",
    jsonLdDescription:
      "Marketing Technologist. I design and govern measurement, martech stack integrations and marketing data architecture for high-scale digital products across web, webviews and mobile apps.",
  },

  common: {
    skip: "Skip to content",
    langSwitch: { label: "Switch to Spanish", short: "ES", href: "/" },
    privacy: "Privacy policy",
    cookieSettings: "Cookie settings",
  },

  nav: {
    label: "Main",
    about: "About",
    stack: "Stack",
    projects: "Projects",
    plan: "Plan",
    contact: "Contact",
    theme: "Theme",
    themeLabel: "Switch between light and dark theme",
  },

  hero: {
    role: "Marketing Technologist",
    titleBefore: "Marketing data you can ",
    titleEm: "audit",
    titleAfter: ".",
    lead: "I design and govern measurement, integrations and experimentation for high-scale digital products across web, webviews and mobile apps. This site is my lab: every click you make here goes through the dataLayer and shows up in the console next to it.",
    ctaPrimary: "Try the console",
    ctaSecondary: "Let's talk",
    photoAlt: "Portrait of Noelia Lizárraga",
    jobTitle: "Technical MarTech Specialist",
  },

  console: {
    region: "Live dataLayer console",
    live: "dataLayer · live",
    paused: "dataLayer · paused",
    simulate: "Simulate click",
    pause: "Pause",
    resume: "Resume",
    clear: "Clear",
    consentLabel: "Current consent state",
    filtersLabel: "Filter events",
    filters: {
      all: "all",
      consent: "consent",
      interaccion: "interaction",
      conversion: "conversion",
      sistema: "system",
    },
    empty: "// no events. Click something or open the form.",
    js: {
      event: "event",
      events: "events",
      visible: "visible",
      queued: "queued",
      noParams: "// no additional parameters",
      cleared: "Console cleared",
      simulatedSummary: "simulated click",
      simulatedMessage: "Testing the real-time debugger on noeliza.com",
    },
  },

  flow: {
    kicker: "How this page is measured",
    title: "How every event travels",
    lead: "Interact with the page. The route lights up and changes according to the consent you gave in the banner. The destination cards show what each tool would receive.",
    browser: { name: "Browser", note: "dataLayer.push" },
    consent: { name: "Consent Mode v2", defaultNote: "default: denied", note: "analytics: {a} · ads: {m}" },
    gtm: { name: "GTM · /b3ev", note: "proxy on Cloudflare" },
    ga4: { name: "GA4", full: "full hit with cookies", limited: "cookieless ping" },
    meta: { name: "Meta Pixel", sent: "event sent", waiting: "waiting for ad_storage" },
    idle: "Waiting for the first event…",
    consentUpdated: " updated the Consent Mode state.",
    systemLogged: " was logged in the dataLayer.",
    routed: " → GA4: {ga} · Meta Pixel: {meta}",
    gaFull: "full hit",
    gaLimited: "cookieless ping",
    metaSent: "sent",
    metaWaiting: "on hold",
  },

  about: {
    kicker: "About",
    title: "I connect marketing, product and data",
    paragraphs: [
      "I'm <strong>Noelia Lizárraga</strong>, also known as <strong>Noeliza</strong>. I'm a Marketing Technologist with over 4 years at the intersection of Marketing, Product, Data and Engineering: I turn business goals into measurement plans, connect the tools in the stack and make sure data arrives clean, consistent and with consent wherever it's used.",
      "I work on high-scale digital products that combine web, webviews and mobile apps. My ground runs from defining the dataLayer and the event taxonomy to integrating platforms such as Braze, Amplitude and Singular, unifying users across channels and modeling data in BigQuery or Snowflake for analysis.",
      "This site is where I practice what I propose: consent, declarative tracking, hashed personal data and open documentation, all running in production.",
    ],
    facts: [
      {
        label: "Roles",
        value: "Web Analytics Developer · Analytics Developer · MarTech Specialist · Marketing Technologist",
      },
      { label: "Industries", value: "E-commerce · Global MarTech Agency · Fintech" },
      { label: "Work mode", value: "Remote (Argentina, UTC -3)" },
      { label: "Languages", value: "Native Spanish · English B2, with experience in native English-speaking environments" },
    ],
  },

  stack: {
    kicker: "Specialization",
    title: "What I do, by capability",
    lead: "Four areas that support each other, with one common focus: data that flows consistently across web, webviews and mobile app, and reaches every platform that uses it.",
    areas: [
      {
        title: "Measurement and tracking architecture",
        lead: "Measurement plans, dataLayer and event taxonomy for hybrid products, with consent as the entry rule.",
        items: [
          { name: "Google Tag Manager", text: "Web and server-side. Advanced use of GTM APIs, custom JavaScript scripts and complex events." },
          { name: "Google Analytics 4", text: "Properties, attribution models and tracking for products, eCommerce and mobile apps." },
          { name: "Consent Mode v2", text: "Banner, consent states and handling of personal data with hashing in the browser." },
        ],
      },
      {
        title: "Martech stack integration",
        lead: "Data flows across hybrid platforms and across the tools that consume them, without losing the user journey.",
        items: [
          { name: "Braze", text: "Advanced audiences and segmentation, multichannel flows with Canvas and data integration for real-time campaigns." },
          { name: "Amplitude", text: "Behavior analysis, product reports and dashboards, and experimentation with Amplitude Experiment." },
          { name: "Singular", text: "Mobile attribution and deeplinks, with consistent events between the app and the rest of the platforms." },
          { name: "Web and app identity", text: "User unification across web, webviews and mobile app to keep the full journey." },
        ],
      },
      {
        title: "Marketing data and architecture",
        lead: "From the raw event to data ready for analysis.",
        items: [
          { name: "Snowflake and BigQuery", text: "Storage in corporate data warehouses, exports and direct querying." },
          { name: "SQL and Looker Studio", text: "Event aggregation, attribution joins and business dashboards." },
          { name: "Event schemas", text: "Clean models built from the dataLayer, with automated export and aggregation." },
        ],
      },
      {
        title: "Data governance and quality",
        lead: "So data stays reliable after it ships.",
        items: [
          { name: "Measurement plan", text: "Events, parameters and naming documented, with clear rules to evolve them." },
          { name: "QA and validation", text: "Verification of every implementation across all platforms, before and after release." },
        ],
      },
    ],
  },

  arch: {
    kicker: "Reference architecture",
    title: "From raw data to decision",
    lead: "My work covers the full flow: collection, identity, storage and analysis, in a product that lives on the web, in webviews and in the app.",
    label: "Marketing data architecture diagram, from sources to analysis and activation",
    stages: [
      {
        title: "Sources",
        nodes: [
          { name: "Web", note: "browser" },
          { name: "Webviews", note: "web inside the app" },
          { name: "Mobile app", note: "native SDKs" },
        ],
      },
      {
        title: "Collection",
        nodes: [
          { name: "dataLayer and GTM", note: "web and server-side" },
          { name: "App SDKs", note: "Braze · Amplitude · Singular" },
          { name: "Consent Mode", note: "consent decides what travels", dashed: true },
        ],
      },
      {
        title: "Identity and attribution",
        nodes: [
          { name: "User unification", note: "web ↔ webview ↔ app" },
          { name: "Attribution and deeplinks", note: "Singular" },
        ],
      },
      {
        title: "Storage",
        nodes: [
          { name: "BigQuery", note: "export and pipelines" },
          { name: "Snowflake", note: "corporate data warehouse" },
        ],
      },
      {
        title: "Analysis and activation",
        nodes: [
          { name: "Amplitude", note: "product and experimentation" },
          { name: "GA4 · Looker Studio", note: "reports and dashboards" },
          { name: "Braze", note: "campaigns and Canvas" },
        ],
      },
    ],
    band: { name: "Data governance", text: "measurement plan · taxonomy and naming · consent · continuous QA" },
  },

  process: {
    kicker: "How I work",
    title: "From discovery to data governance",
    lead: "A process that repeats on every project, so measurement is predictable, verifiable and easy to maintain.",
    steps: [
      { name: "Discovery", text: "I learn the product, the business goals and the decisions the data must inform." },
      { name: "Measurement plan", text: "I define events, parameters and naming, and how they travel across web, webviews and app." },
      { name: "Implementation", text: "I configure tags, SDKs and integrations while respecting each person's consent." },
      { name: "QA and validation", text: "I verify every event on every platform, before and after release." },
      { name: "Documentation", text: "I write everything down so someone else can maintain and audit it." },
      { name: "Governance and improvement", text: "I monitor data quality and evolve the plan alongside the product." },
    ],
  },

  cases: {
    kicker: "Case studies",
    title: "Featured implementations",
    lead: "Custom technical solutions for attribution, web performance and data governance challenges.",
    items: [
      {
        tag: "Server-side analytics",
        state: "Production",
        title: "Server-side tracking deployment",
        text: "Google Tag Manager Server-Side containers in the cloud and on platforms such as Stape and Google Cloud Platform. Meta and TikTok Conversions API integration to strengthen attribution, bypass browser blocking and mitigate cookie loss from ITP.",
        core: "Core: sGTM · Stape · CAPI",
      },
      {
        tag: "MarTech stack integration",
        state: "Data integration",
        title: "Marketing tech stack integrations",
        text: "Unified data flows across hybrid platforms (web, webviews and mobile app) and across Braze, Amplitude and Mobile Measurement Partners such as Singular. I keep events consistent across the data lifecycle for hyper-personalized campaigns and precise multichannel attribution.",
        core: "Core: Braze · Amplitude · Singular",
      },
      {
        tag: "Data pipelines",
        state: "Automated",
        title: "Pipeline analytics and BigQuery",
        text: "Automated export and aggregation to BigQuery. Clean schemas built from the dataLayer, queried with SQL and visualized in Looker Studio. Built for brands that want to merge internal databases with acquisition behavior.",
        core: "Core: BigQuery · SQL · Looker Studio",
      },
    ],
  },

  plan: {
    kicker: "Leading by example",
    title: "This site's measurement plan",
    lead: "Every event you see in the console is defined, documented and mapped to its destination. This is the summary; the full plan lives in a separate document.",
    cols: { event: "Event", when: "When it fires", destination: "Destination" },
    cta: "Request access to the full plan",
    ctaNote: "Definitions, parameters and data governance rules.",
  },

  contact: {
    kicker: "Connect",
    title: "Let's talk",
    lead: "Looking to hire a Marketing Technologist or want to talk about an implementation? Write to me and I'll get back to you soon.",
    direct: "You can also write to me or connect here:",
    emailLabel: "Send an email to {email}",
    linkedinLabel: "Noelia Lizárraga on LinkedIn",
    form: {
      name: "Name",
      namePh: "Ada Lovelace",
      email: "Email",
      emailPh: "ada@company.com",
      reason: "Reason for contact",
      reasons: {
        noeliza_contact_job: "Job Opportunity / Hiring",
        noeliza_contact_stack: "MarTech Stack Inquiry",
        noeliza_contact_collab: "Collaboration / Speaking",
        noeliza_contact_other: "Other reason",
      },
      web: "Website (optional)",
      webPh: "https://example.com",
      message: "Message",
      messagePh: "Tell me what profile you're looking for or how you'd like to collaborate.",
      honeypot: "Do not fill in this field",
      send: "Send message",
      sending: "Sending…",
      note: "Your email is hashed with SHA-256 in the browser before it reaches the dataLayer. Your message is stored in a private sheet.",
      errorRequired: "Fill in the required fields.",
      errorEmail: "Check the email: it looks incomplete.",
      errorSend: "The message couldn't be sent. Try again or write to me by email.",
    },
    ok: {
      title: "Message sent",
      text: "Thanks for writing. Look at the console: the <span class=\"mono\">form_submission_success</span> event carried your email as a hash, never in plain text.",
      hash: "Hash:",
      again: "Send another message",
    },
  },

  footer: {
    logoAlt: "NoeLiza",
    credit: "Website designed and developed by <strong>Noeliza</strong>.",
    rights: "© 2026 All rights reserved.",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    emailLabel: "Send an email to {email}",
  },

  banner: {
    title: "Your privacy, your call",
    text: "I use analytics and advertising cookies only if you allow it. Without your permission, measurement is limited to anonymous, cookieless signals.",
    reject: "Reject all",
    accept: "Accept all",
    customize: "Customize",
    analytics: "Analytics",
    analyticsNote: "analytics_storage: measures visits and usage in aggregate.",
    ads: "Advertising",
    adsNote: "ad_storage, ad_user_data and ad_personalization.",
    save: "Save selection",
    policy: "Privacy policy",
  },

  notFound: {
    title: "404 · Page not found | NoeLiza",
    heading: "Dead end",
    text: "The page you're looking for doesn't exist or has moved.",
    back: "Back to home",
  },

  privacyPage: {
    title: "Privacy policy | NoeLiza",
    back: "← Back to home",
    h1: "Privacy policy",
    updated: "Last updated: September 28, 2026.",
    intro:
      "This policy describes how I handle your personal data and the measurement technologies I use on this site.",
    sections: [
      {
        title: "1. Data controller",
        body: "The controller of the data collected on this site is <strong>Noelia Lizárraga</strong>. You can contact me with any question or to exercise your rights at <a href=\"mailto:noe@noeliza.com\">noe@noeliza.com</a>.",
      },
      {
        title: "2. What information I collect",
        list: [
          "<strong>Contact form:</strong> name, email, website (optional), reason and message. This data is sent exactly as you type it to a private Google Sheets spreadsheet through Google Apps Script, only so I can reply to you.",
          "<strong>Browsing data:</strong> only if you allow it in the banner, I use analytics cookies (Google Analytics 4) and, if you accept advertising, Meta Pixel too, to understand in aggregate how the site is used.",
          "<strong>Preferences in your browser:</strong> I store your cookie decision (for 12 months) and your light or dark theme preference in local storage. They never leave your device.",
        ],
      },
      {
        title: "3. Privacy-first architecture",
        highlight: true,
        list: [
          "<strong>Google Consent Mode v2:</strong> until you decide, everything is denied. If you reject, no analytics or advertising cookies are stored; Google can only receive aggregate signals, without cookies or persistent identifiers.",
          "<strong>Hashing in the browser:</strong> before the form submission is logged in the dataLayer, your email is transformed with SHA-256 in your own browser. Analytics tools only receive that hash, never the plain-text email. The form message itself is stored in clear text in my private sheet, as stated above.",
          "<strong>Scripts from my domain:</strong> measurement scripts are served from this same domain through Cloudflare. It improves loading and measurement reliability; it doesn't change what data is collected or replace your control over consent.",
          "<strong>Own typefaces:</strong> fonts are served from this site, without requesting resources from Google Fonts.",
        ],
      },
      {
        title: "4. Third parties involved",
        body: "Google (Tag Manager, Analytics, Sheets and Apps Script), Meta (Pixel, only if you accept advertising) and Cloudflare (proxy and site delivery). Each processes data under its own policies.",
      },
      {
        title: "5. Your rights",
        body: "You can access, rectify, restrict or request deletion of the data you sent through the form. Write to me at <a href=\"mailto:noe@noeliza.com\">noe@noeliza.com</a>. You can change your cookie decision at any time from “Cookie settings” at the bottom of the page.",
      },
    ],
    footer: "© 2026 NoeLiza · Privacy policy",
  },
};
