/**
 * Textos del sitio en español. `en.ts` debe tener exactamente la misma forma
 * (TypeScript lo verifica con `npm run check`).
 */
export const es = {
  lang: "es",
  locale: "es_AR",
  htmlLang: "es",

  meta: {
    title: "NoeLiza (Noelia Lizárraga) | Marketing Technologist & MarTech Specialist",
    description:
      "Noelia Lizárraga (Noeliza), Marketing Technologist. Tracking, integraciones del martech stack y arquitectura de datos en web, webviews y app móvil.",
    ogTitle: "NoeLiza (Noelia Lizárraga) | Marketing Technologist",
    ogAlt: "NoeLiza · Marketing Technologist y MarTech Specialist",
    jsonLdDescription:
      "Marketing Technologist. Diseño y gobierno la medición, las integraciones del martech stack y la arquitectura de datos de marketing en productos digitales de alta escala, en web, webviews y app móvil.",
  },

  common: {
    skip: "Saltar al contenido",
    langSwitch: { label: "Cambiar a inglés", short: "EN", href: "/en.html" },
    privacy: "Política de privacidad",
    cookieSettings: "Configuración de cookies",
  },

  nav: {
    label: "Principal",
    about: "Sobre mí",
    stack: "Stack",
    projects: "Proyectos",
    plan: "Plan",
    contact: "Contacto",
    theme: "Tema",
    themeLabel: "Cambiar entre tema claro y oscuro",
  },

  hero: {
    role: "Marketing Technologist",
    titleBefore: "Datos de marketing que se pueden ",
    titleEm: "auditar",
    titleAfter: ".",
    lead: "Diseño y gobierno la medición, las integraciones y la experimentación de productos digitales de alta escala, en web, webviews y app móvil. Este sitio es mi laboratorio: cada clic que hagas aquí pasa por el dataLayer y aparece en la consola de al lado.",
    ctaPrimary: "Probar la consola",
    ctaSecondary: "Hablemos",
    photoAlt: "Retrato de Noelia Lizárraga",
    jobTitle: "Technical MarTech Specialist",
  },

  console: {
    region: "Consola del dataLayer en vivo",
    live: "dataLayer · en vivo",
    paused: "dataLayer · en pausa",
    simulate: "Simular clic",
    pause: "Pausar",
    resume: "Reanudar",
    clear: "Limpiar",
    consentLabel: "Estado actual del consentimiento",
    filtersLabel: "Filtrar eventos",
    filters: {
      all: "todos",
      consent: "consentimiento",
      interaccion: "interacción",
      conversion: "conversión",
      sistema: "sistema",
    },
    empty: "// sin eventos. Haz clic en algo o abre el formulario.",
    js: {
      event: "evento",
      events: "eventos",
      visible: "visibles",
      queued: "en cola",
      noParams: "// sin parámetros adicionales",
      cleared: "Consola limpia",
      simulatedSummary: "clic simulado",
      simulatedMessage: "Probando el debugger en tiempo real de noeliza.com",
    },
  },

  flow: {
    kicker: "Cómo se mide esta página",
    title: "Así viaja cada evento",
    lead: "Interactúa con la página. La ruta se ilumina y cambia según el consentimiento que hayas dado en el banner. Las tarjetas de destino muestran qué recibiría cada herramienta.",
    browser: { name: "Navegador", note: "dataLayer.push" },
    consent: { name: "Consent Mode v2", defaultNote: "default: denied", note: "analytics: {a} · ads: {m}" },
    gtm: { name: "GTM · /b3ev", note: "proxy en Cloudflare" },
    ga4: { name: "GA4", full: "hit completo con cookies", limited: "ping sin cookies" },
    meta: { name: "Meta Pixel", sent: "evento enviado", waiting: "espera ad_storage" },
    idle: "Esperando el primer evento…",
    consentUpdated: " actualizó el estado de Consent Mode.",
    systemLogged: " se registró en el dataLayer.",
    routed: " → GA4: {ga} · Meta Pixel: {meta}",
    gaFull: "hit completo",
    gaLimited: "ping sin cookies",
    metaSent: "enviado",
    metaWaiting: "en espera",
  },

  about: {
    kicker: "Sobre mí",
    title: "Conecto marketing, producto y datos",
    paragraphs: [
      "Soy <strong>Noelia Lizárraga</strong>, también conocida como <strong>Noeliza</strong>. Soy Marketing Technologist y llevo más de 4 años en la intersección entre Marketing, Producto, Data y Desarrollo: traduzco objetivos de negocio en planes de medición, conecto las herramientas del stack y hago que el dato llegue limpio, consistente y con consentimiento a donde se usa.",
      "Trabajo con productos digitales de alta escala que combinan web, webviews y app móvil. Mi terreno va desde definir el dataLayer y la taxonomía de eventos hasta integrar plataformas como Braze, Amplitude y Singular, unificar usuarios entre canales y modelar los datos en BigQuery o Snowflake para analizarlos.",
      "Este sitio es donde practico lo que propongo: consentimiento, tracking declarativo, datos personales hasheados y documentación abierta, todo funcionando en producción.",
    ],
    facts: [
      {
        label: "Roles",
        value: "Web Analytics Developer · Analytics Developer · MarTech Specialist · Marketing Technologist",
      },
      { label: "Industrias", value: "E-commerce · Agencia Global MarTech · Fintech" },
      { label: "Modalidad", value: "Remoto (Argentina, UTC -3)" },
      { label: "Idiomas", value: "Español nativo · Inglés B2, con experiencia en entornos de habla nativa" },
    ],
  },

  stack: {
    kicker: "Especialización",
    title: "Lo que hago, por capacidades",
    lead: "Cuatro áreas que se apoyan entre sí, con un foco común: que el dato fluya consistente entre web, webviews y app móvil, y llegue a cada plataforma que lo usa.",
    areas: [
      {
        title: "Medición y arquitectura de tracking",
        lead: "Planes de medición, dataLayer y taxonomía de eventos para productos híbridos, con el consentimiento como regla de entrada.",
        items: [
          { name: "Google Tag Manager", text: "Web y server-side. Uso avanzado de las APIs de GTM, scripts a medida en JavaScript y eventos complejos." },
          { name: "Google Analytics 4", text: "Propiedades, modelos de atribución y tracking para productos, eCommerce y apps móviles." },
          { name: "Consent Mode v2", text: "Banner, estados de consentimiento y tratamiento de datos personales con hash en el navegador." },
        ],
      },
      {
        title: "Integración del martech stack",
        lead: "Flujos de datos entre plataformas híbridas y entre las herramientas que los consumen, sin perder el recorrido del usuario.",
        items: [
          { name: "Braze", text: "Audiencias y segmentación avanzada, flujos multicanal con Canvas e integración de datos para campañas en tiempo real." },
          { name: "Amplitude", text: "Análisis de comportamiento, reportes y dashboards de producto, y experimentación con Amplitude Experiment." },
          { name: "Singular", text: "Atribución móvil y deeplinks, con eventos consistentes entre la app y el resto de las plataformas." },
          { name: "Identidad web y app", text: "Unificación de usuarios entre web, webviews y app móvil para conservar el recorrido completo." },
        ],
      },
      {
        title: "Datos y arquitectura de marketing",
        lead: "Del evento crudo al dato listo para analizar.",
        items: [
          { name: "Snowflake y BigQuery", text: "Almacenamiento en data warehouses corporativos, exportación y consulta directa." },
          { name: "SQL y Looker Studio", text: "Agregación de eventos, cruces de atribución y dashboards de negocio." },
          { name: "Esquemas de eventos", text: "Modelos limpios construidos a partir del dataLayer, con exportación y agregación automatizadas." },
        ],
      },
      {
        title: "Gobierno del dato y calidad",
        lead: "Que el dato siga siendo confiable después de publicar.",
        items: [
          { name: "Plan de medición", text: "Eventos, parámetros y nomenclatura documentados, con reglas claras para evolucionarlos." },
          { name: "QA y validación", text: "Verificación de cada implementación en todas las plataformas, antes y después de publicar." },
        ],
      },
    ],
  },

  arch: {
    kicker: "Arquitectura de referencia",
    title: "Del dato crudo a la decisión",
    lead: "Mi trabajo cubre el flujo completo: recolección, identidad, almacenamiento y análisis, en un producto que vive en la web, en webviews y en la app.",
    label: "Diagrama de arquitectura de datos de marketing, de las fuentes al análisis y la activación",
    stages: [
      {
        title: "Fuentes",
        nodes: [
          { name: "Web", note: "navegador" },
          { name: "Webviews", note: "web dentro de la app" },
          { name: "App móvil", note: "SDKs nativos" },
        ],
      },
      {
        title: "Recolección",
        nodes: [
          { name: "dataLayer y GTM", note: "web y server-side" },
          { name: "SDKs de app", note: "Braze · Amplitude · Singular" },
          { name: "Consent Mode", note: "el consentimiento decide qué viaja", dashed: true },
        ],
      },
      {
        title: "Identidad y atribución",
        nodes: [
          { name: "Unificación de usuarios", note: "web ↔ webview ↔ app" },
          { name: "Atribución y deeplinks", note: "Singular" },
        ],
      },
      {
        title: "Almacenamiento",
        nodes: [
          { name: "BigQuery", note: "exportación y pipelines" },
          { name: "Snowflake", note: "data warehouse corporativo" },
        ],
      },
      {
        title: "Análisis y activación",
        nodes: [
          { name: "Amplitude", note: "producto y experimentación" },
          { name: "GA4 · Looker Studio", note: "reportes y dashboards" },
          { name: "Braze", note: "campañas y Canvas" },
        ],
      },
    ],
    band: { name: "Gobierno del dato", text: "plan de medición · taxonomía y nomenclatura · consentimiento · QA continuo" },
  },

  process: {
    kicker: "Cómo trabajo",
    title: "Del descubrimiento al gobierno del dato",
    lead: "Un proceso que se repite en cada proyecto, para que la medición sea predecible, verificable y fácil de mantener.",
    steps: [
      { name: "Descubrimiento", text: "Entiendo el producto, los objetivos de negocio y las decisiones que el dato debe informar." },
      { name: "Plan de medición", text: "Defino eventos, parámetros y nomenclatura, y cómo viajan entre web, webviews y app." },
      { name: "Implementación", text: "Configuro tags, SDKs e integraciones respetando el consentimiento de cada persona." },
      { name: "QA y validación", text: "Verifico cada evento en todas las plataformas, antes y después de publicar." },
      { name: "Documentación", text: "Dejo todo por escrito para que otra persona pueda mantenerlo y auditarlo." },
      { name: "Gobierno y mejora", text: "Monitoreo la calidad del dato y evoluciono el plan junto con el producto." },
    ],
  },

  cases: {
    kicker: "Casos de estudio",
    title: "Implementaciones destacadas",
    lead: "Soluciones técnicas a medida para retos de atribución, rendimiento web y gobierno del dato.",
    items: [
      {
        tag: "Server-side analytics",
        state: "Producción",
        title: "Implementación de server-side tracking",
        text: "Contenedores de Google Tag Manager Server-Side en cloud y en plataformas como Stape y Google Cloud Platform. Integración de la API de Conversiones de Meta y TikTok para reforzar la atribución, sortear bloqueos del navegador y mitigar la pérdida de cookies por ITP.",
        core: "Core: sGTM · Stape · CAPI",
      },
      {
        tag: "MarTech stack integration",
        state: "Data integration",
        title: "Integraciones del marketing tech stack",
        text: "Flujos de datos unificados entre plataformas híbridas (web, webviews y app móvil) y entre Braze, Amplitude y Mobile Measurement Partners como Singular. Aseguro la consistencia de los eventos a lo largo del ciclo de vida del dato para campañas hiperpersonalizadas y atribución multicanal precisa.",
        core: "Core: Braze · Amplitude · Singular",
      },
      {
        tag: "Data pipelines",
        state: "Automatizado",
        title: "Pipeline analytics y BigQuery",
        text: "Exportación y agregación automatizada a BigQuery. Esquemas limpios a partir del dataLayer, consultados con SQL y visualizados en Looker Studio. Pensado para marcas que quieren unificar sus bases internas con el comportamiento de adquisición.",
        core: "Core: BigQuery · SQL · Looker Studio",
      },
    ],
  },

  plan: {
    kicker: "Predico con el ejemplo",
    title: "El plan de medición de este sitio",
    lead: "Cada evento que ves en la consola está definido, documentado y mapeado a su destino. Este es el resumen; el plan completo está en un documento aparte.",
    cols: { event: "Evento", when: "Cuándo se dispara", destination: "Destino" },
    cta: "Solicitar acceso al plan completo",
    ctaNote: "Definiciones, parámetros y reglas de gobierno del dato.",
  },

  contact: {
    kicker: "Conexión",
    title: "Conversemos",
    lead: "¿Buscas incorporar un Marketing Technologist a tu equipo o quieres charlar de una implementación? Escríbeme y te respondo pronto.",
    direct: "También puedes escribirme o conectar por aquí:",
    emailLabel: "Enviar un email a {email}",
    linkedinLabel: "LinkedIn de Noelia Lizárraga",
    form: {
      name: "Nombre",
      namePh: "Ada Lovelace",
      email: "Email",
      emailPh: "ada@empresa.com",
      reason: "Motivo del contacto",
      reasons: {
        noeliza_contact_job: "Oportunidad Laboral / Contratación",
        noeliza_contact_stack: "Consulta sobre mi Stack técnico",
        noeliza_contact_collab: "Colaboración / Charla",
        noeliza_contact_other: "Otro motivo",
      },
      web: "Sitio web (opcional)",
      webPh: "https://ejemplo.com",
      message: "Mensaje",
      messagePh: "Cuéntame qué perfil buscas o en qué te gustaría colaborar.",
      honeypot: "No completar este campo",
      send: "Enviar mensaje",
      sending: "Enviando…",
      note: "Tu email se hashea con SHA-256 en el navegador antes de llegar al dataLayer. El mensaje se guarda en una hoja privada.",
      errorRequired: "Completa los campos obligatorios.",
      errorEmail: "Revisa el email: parece incompleto.",
      errorSend: "No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme por email.",
    },
    ok: {
      title: "Mensaje enviado",
      text: "Gracias por escribirme. Mira la consola: el evento <span class=\"mono\">form_submission_success</span> llevó tu email como hash, nunca en texto plano.",
      hash: "Hash:",
      again: "Enviar otro mensaje",
    },
  },

  footer: {
    logoAlt: "NoeLiza",
    credit: "Sitio web diseñado y desarrollado por <strong>Noeliza</strong>.",
    rights: "© 2026 Todos los derechos reservados.",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    emailLabel: "Enviar un email a {email}",
  },

  banner: {
    title: "Tu privacidad, tú decides",
    text: "Uso cookies de analítica y de publicidad solo si tú lo permites. Sin tu permiso, la medición se limita a señales anónimas sin cookies.",
    reject: "Rechazar todo",
    accept: "Aceptar todo",
    customize: "Personalizar",
    analytics: "Analítica",
    analyticsNote: "analytics_storage: mide visitas y uso de forma agregada.",
    ads: "Publicidad",
    adsNote: "ad_storage, ad_user_data y ad_personalization.",
    save: "Guardar selección",
    policy: "Política de privacidad",
  },

  notFound: {
    title: "404 · Página no encontrada | NoeLiza",
    heading: "Ruta sin salida",
    text: "La página que buscas no existe o se movió.",
    back: "Volver al inicio",
  },

  privacyPage: {
    title: "Política de privacidad | NoeLiza",
    back: "← Volver al inicio",
    h1: "Política de privacidad",
    updated: "Última actualización: 28 de septiembre de 2026.",
    intro:
      "Esta política describe cómo trato tus datos personales y las tecnologías de medición que uso en este sitio.",
    sections: [
      {
        title: "1. Responsable del tratamiento",
        body: "El responsable de los datos recogidos en este sitio es <strong>Noelia Lizárraga</strong>. Puedes contactarme por cualquier duda o para ejercer tus derechos en <a href=\"mailto:noe@noeliza.com\">noe@noeliza.com</a>.",
      },
      {
        title: "2. Qué información recojo",
        list: [
          "<strong>Formulario de contacto:</strong> nombre, email, sitio web (opcional), motivo y mensaje. Estos datos se envían tal cual los escribes a una hoja de cálculo privada de Google Sheets, mediante Google Apps Script, solo para poder responderte.",
          "<strong>Datos de navegación:</strong> solo si lo permites en el banner, uso cookies de analítica (Google Analytics 4) y, si aceptas la publicidad, también de Meta Pixel, para entender de forma agregada cómo se usa el sitio.",
          "<strong>Preferencias en tu navegador:</strong> guardo en el almacenamiento local tu decisión sobre las cookies (durante 12 meses) y tu preferencia de tema claro u oscuro. No salen de tu dispositivo.",
        ],
      },
      {
        title: "3. Arquitectura privacy-first",
        highlight: true,
        list: [
          "<strong>Google Consent Mode v2:</strong> hasta que decides, todo está denegado. Si rechazas, no se guardan cookies de analítica ni de publicidad; Google solo puede recibir señales agregadas, sin cookies ni identificadores persistentes.",
          "<strong>Hash en el navegador:</strong> antes de registrar el envío del formulario en el dataLayer, tu email se transforma con SHA-256 en tu propio navegador. A las herramientas de analítica solo llega ese hash, nunca el email en texto plano. El mensaje del formulario sí se guarda en claro en mi hoja privada, como indico arriba.",
          "<strong>Scripts desde mi dominio:</strong> los scripts de medición se sirven desde este mismo dominio a través de Cloudflare. Mejora la carga y la fiabilidad de la medición; no cambia qué datos se recogen ni sustituye tu control del consentimiento.",
          "<strong>Tipografías propias:</strong> las fuentes se sirven desde este sitio, sin pedir recursos a Google Fonts.",
        ],
      },
      {
        title: "4. Terceros que intervienen",
        body: "Google (Tag Manager, Analytics, Sheets y Apps Script), Meta (Pixel, solo si aceptas la publicidad) y Cloudflare (proxy y entrega del sitio). Cada uno trata los datos según sus propias políticas.",
      },
      {
        title: "5. Tus derechos",
        body: "Puedes acceder, rectificar, limitar o pedir la eliminación de los datos que enviaste con el formulario. Escríbeme a <a href=\"mailto:noe@noeliza.com\">noe@noeliza.com</a>. Puedes cambiar tu decisión sobre las cookies en cualquier momento desde «Configuración de cookies», al pie de la página.",
      },
    ],
    footer: "© 2026 NoeLiza · Política de privacidad",
  },
};

export type Dict = typeof es;
