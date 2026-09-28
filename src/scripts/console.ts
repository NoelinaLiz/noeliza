import type { ConsentState } from "./types";

/**
 * Consola en vivo del dataLayer + recorrido animado del evento.
 *
 * Los eventos son los reales: se leen de `window.dataLayer` al cargar y se siguen
 * con el CustomEvent "dataLayer-push" que emite tracking.ts. El recorrido
 * (navegador → consentimiento → GTM → destinos) es una representación visual de
 * cómo el consentimiento condiciona lo que recibe cada herramienta.
 */

type Category = "consent" | "interaccion" | "conversion" | "sistema";
type Payload = Record<string, unknown>;
interface LogEvent {
  data: Payload;
  cat: Category;
  summary: string;
  time: Date;
}

interface Strings {
  console: {
    event: string;
    events: string;
    visible: string;
    queued: string;
    noParams: string;
    copied: string;
    copyFailed: string;
    cleared: string;
    simulatedSummary: string;
    simulatedMessage: string;
  };
  labels: { pause: string; resume: string; live: string; paused: string };
  flow: {
    consent: { defaultNote: string; note: string };
    ga4: { full: string; limited: string };
    meta: { sent: string; waiting: string };
    idle: string;
    consentUpdated: string;
    systemLogged: string;
    routed: string;
    gaFull: string;
    gaLimited: string;
    metaSent: string;
    metaWaiting: string;
  };
}

const MAX_ROWS = 60;
const $ = <T extends HTMLElement>(selector: string) => document.querySelector<T>(selector);

const list = $<HTMLOListElement>("#ev-list");
const stringsEl = document.getElementById("i18n-live");

if (list && stringsEl) init(list, JSON.parse(stringsEl.textContent || "{}") as Strings);

function init(list: HTMLOListElement, s: Strings): void {
  const term = $("#term")!;
  const empty = $("#ev-empty")!;
  const countEl = $("#ev-count")!;
  const statusEl = $("#ev-status")!;
  const pauseBtn = $<HTMLButtonElement>("#pause")!;
  const liveLabel = $("#live-label")!;

  const events: LogEvent[] = [];
  let queue: LogEvent[] = [];
  let paused = false;
  let filter: "all" | Category = "all";
  let statusTimer: number | undefined;

  const fill = (template: string, values: Record<string, string>) =>
    template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? "");

  const flash = (message: string) => {
    statusEl.textContent = message;
    window.clearTimeout(statusTimer);
    statusTimer = window.setTimeout(() => (statusEl.textContent = ""), 2600);
  };

  /* ---------- normalización de lo que llega al dataLayer ---------- */

  /** gtag() empuja un objeto `arguments`; se convierte a un evento legible. */
  function normalize(item: unknown): Payload | null {
    if (!item || typeof item !== "object") return null;
    if (Object.prototype.toString.call(item) === "[object Arguments]") {
      const [command, sub, params] = Array.from(item as ArrayLike<unknown>);
      if (command === "consent") {
        return { event: "consent", command: sub, ...(params as Payload) };
      }
      return { event: "gtag", command, args: Array.from(item as ArrayLike<unknown>).slice(1) };
    }
    return item as Payload;
  }

  function categorize(d: Payload): Category {
    const name = String(d.event ?? "");
    if (name === "consent" || name === "consent_banner_view" || name === "cookie_consent_update") return "consent";
    if (name === "form_submission_success") return "conversion";
    if (name === "trackEvent" || name === "visitor_test_click") return "interaccion";
    return "sistema";
  }

  function summarize(d: Payload): string {
    const name = String(d.event ?? "");
    if (name === "trackEvent") {
      const info = (d.event_info ?? {}) as Payload;
      return [d.event_name, info.element].filter(Boolean).join(" · ");
    }
    if (name === "consent") {
      const a = d.analytics_storage;
      const m = d.ad_storage;
      return d.command === "default" ? "default · todo denied" : `${d.command} · analytics ${a} · ads ${m}`;
    }
    if (name === "form_submission_success") {
      const info = (d.event_info ?? {}) as Payload;
      return `lead · ${String(info.service_id ?? "").replace("noeliza_contact_", "")}`;
    }
    if (name === "visitor_test_click") return s.console.simulatedSummary;
    if (name === "gtm.js") return "GTM · /b3ev";
    return "";
  }

  /* ---------- consentimiento y recorrido ---------- */

  const chips = $("#cstrip")!;
  const node = (id: string) => document.getElementById(id)!;
  const consentState = (): ConsentState => window.__consent.state;

  function renderConsent(): void {
    const state = consentState();
    chips.textContent = "";
    for (const key of Object.keys(state) as (keyof ConsentState)[]) {
      const chip = document.createElement("span");
      chip.className = "cchip";
      chip.dataset.s = state[key];
      const dot = document.createElement("i");
      dot.setAttribute("aria-hidden", "true");
      chip.append(dot, `${key} · ${state[key]}`);
      chips.append(chip);
    }
    const ga = state.analytics_storage === "granted";
    const ads = state.ad_storage === "granted";
    const decided = ga || ads;
    node("n-consent-s").textContent = decided
      ? fill(s.flow.consent.note, { a: state.analytics_storage, m: state.ad_storage })
      : s.flow.consent.defaultNote;
    node("n-ga4-s").textContent = ga ? s.flow.ga4.full : s.flow.ga4.limited;
    node("n-ga4").classList.toggle("dashed", !ga);
    node("n-meta-s").textContent = ads ? s.flow.meta.sent : s.flow.meta.waiting;
    node("n-meta").classList.toggle("dashed", !ads);
  }

  function pulse(e: LogEvent): void {
    const state = consentState();
    const ga = state.analytics_storage === "granted";
    const ads = state.ad_storage === "granted";
    const route =
      e.cat === "consent"
        ? ["n-consent"]
        : e.cat === "sistema"
          ? ["n-browser", "n-consent", "n-gtm"]
          : ["n-browser", "n-consent", "n-gtm", "n-ga4", ...(ads ? ["n-meta"] : [])];
    route.forEach((id, i) => {
      window.setTimeout(() => {
        const el = node(id);
        el.classList.add("lit");
        window.setTimeout(() => el.classList.remove("lit"), 650);
      }, i * 200);
    });

    const status = node("flow-status");
    const name = String(e.data.event_name ?? e.data.event ?? "");
    const strong = document.createElement("b");
    strong.textContent = name;
    const tail =
      e.cat === "consent"
        ? s.flow.consentUpdated
        : e.cat === "sistema"
          ? s.flow.systemLogged
          : fill(s.flow.routed, {
              ga: ga ? s.flow.gaFull : s.flow.gaLimited,
              meta: ads ? s.flow.metaSent : s.flow.metaWaiting,
            });
    status.replaceChildren(strong, tail);
  }

  /* ---------- lista de eventos ---------- */

  function buildRow(e: LogEvent): HTMLLIElement {
    const li = document.createElement("li");
    li.className = "row";
    li.dataset.cat = e.cat;
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    const time = document.createElement("span");
    time.className = "t";
    time.textContent = e.time.toLocaleTimeString(document.documentElement.lang === "en" ? "en-US" : "es-AR", {
      hour12: false,
    });
    const name = document.createElement("span");
    name.className = "n";
    name.textContent = String(e.data.event ?? "push");
    const sum = document.createElement("span");
    sum.className = "s";
    sum.textContent = e.summary;
    summary.append(time, name, sum);

    const pre = document.createElement("pre");
    const { event: _omit, ...rest } = e.data;
    pre.textContent = Object.keys(rest).length ? JSON.stringify(rest, null, 2) : s.console.noParams;

    summary.addEventListener("click", () => (details.dataset.touched = "1"));
    details.append(summary, pre);
    li.append(details);
    return li;
  }

  function refresh(): void {
    let shown = 0;
    for (const li of Array.from(list.children) as HTMLLIElement[]) {
      const hide = filter !== "all" && li.dataset.cat !== filter;
      li.hidden = hide;
      if (!hide) shown++;
    }
    empty.hidden = shown > 0;
    const total = events.length;
    countEl.textContent =
      `${total} ${total === 1 ? s.console.event : s.console.events}` +
      (filter !== "all" ? ` · ${shown} ${s.console.visible}` : "") +
      (queue.length ? ` · ${queue.length} ${s.console.queued}` : "");
  }

  function render(e: LogEvent): void {
    for (const d of Array.from(list.querySelectorAll("details"))) {
      if (!d.dataset.touched) d.open = false;
    }
    const li = buildRow(e);
    li.querySelector("details")!.open = true;
    list.prepend(li);
    while (list.children.length > MAX_ROWS) list.lastElementChild?.remove();
    refresh();
    pulse(e);
  }

  function record(raw: unknown): void {
    const data = normalize(raw);
    if (!data) return;
    if (Object.keys(data).length === 1 && "event_info" in data && data.event_info === null) return;
    const e: LogEvent = { data, cat: categorize(data), summary: summarize(data), time: new Date() };
    events.push(e);
    if (paused) {
      queue.push(e);
      refresh();
      return;
    }
    render(e);
  }

  /* ---------- controles ---------- */

  pauseBtn.addEventListener("click", () => {
    paused = !paused;
    pauseBtn.setAttribute("aria-pressed", String(paused));
    pauseBtn.textContent = paused ? s.labels.resume : s.labels.pause;
    term.classList.toggle("paused", paused);
    liveLabel.textContent = paused ? s.labels.paused : s.labels.live;
    if (!paused) {
      const pending = queue;
      queue = [];
      pending.forEach(render);
    }
  });

  $("#clear")!.addEventListener("click", () => {
    events.length = 0;
    queue = [];
    list.textContent = "";
    refresh();
    flash(s.console.cleared);
  });

  $("#copy")!.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(events.map((e) => e.data), null, 2));
      flash(s.console.copied);
    } catch {
      flash(s.console.copyFailed);
    }
  });

  document.querySelectorAll<HTMLButtonElement>(".filters button").forEach((button) => {
    button.addEventListener("click", () => {
      filter = button.dataset.f as "all" | Category;
      document
        .querySelectorAll<HTMLButtonElement>(".filters button")
        .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      refresh();
    });
  });

  $("#sim")!.addEventListener("click", () => {
    window.dataLayer.push({
      event: "visitor_test_click",
      visitor_action: "simulated_debug_click",
      details: { simulated_by: "visitor", message: s.console.simulatedMessage, success: true },
    });
  });

  /* ---------- arranque ---------- */

  renderConsent();
  window.addEventListener("noe:consent", renderConsent);
  window.addEventListener("dataLayer-push", (e) => record((e as CustomEvent).detail));
  // Eventos que ya estaban en el dataLayer (consent default, gtm.js, banner…).
  [...window.dataLayer].forEach(record);
}
