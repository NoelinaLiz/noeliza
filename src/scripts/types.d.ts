export {};

type ConsentValue = "granted" | "denied";
export type ConsentState = Record<
  "analytics_storage" | "ad_storage" | "ad_user_data" | "ad_personalization",
  ConsentValue
>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    /** Lo define consent-default.js (inline en el <head>). */
    __consent: {
      key: string;
      keys: string[];
      months: number;
      state: ConsentState;
      decided: boolean;
    };
  }
  interface WindowEventMap {
    "dataLayer-push": CustomEvent<unknown>;
    "noe:consent": CustomEvent<ConsentState>;
  }
}
