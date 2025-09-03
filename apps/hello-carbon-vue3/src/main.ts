import { createApp } from "vue";
import { createPinia } from "pinia";
import CarbonVue3 from "@carbon/vue";
import i18next, { type i18n } from "i18next";
import httpBackend from "i18next-http-backend";
import I18NextVue from "i18next-vue";
import App from "./App.vue";
import router from "./router/index.ts";

import "./styles/tailwind.css";

const localLang = (typeof localStorage !== "undefined" && localStorage.getItem("language")) || "en";
const i18nInitialized = i18next.use(httpBackend).init({
  lng: localLang,
  fallbackLng: "en",
  backend: {
    loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
  },
});

i18nInitialized.then(() => {
  const app = createApp(App);

  // @ts-expect-error - CarbonVue3 types are not up to date
  app.use(CarbonVue3);
  app.use(createPinia());
  app.use(router);
  app.use(I18NextVue, { i18next: i18next as unknown as i18n });

  // Global error handler: redirect to ErrorView with details
  app.config.errorHandler = (err, instance, info) => {
    const current = router.currentRoute?.value;
    const alreadyOnError = current && current.name === "error";
    try {
      console.error("Global error captured:", err, info);
    }
    catch {
      // ignore logging failure
    }
    if (!alreadyOnError) {
      const message: string = "" + (err && ((err as Error).message || String(err))) || "Unexpected error";
      router.replace({ name: "error", query: { code: "500", message } }).catch(() => {});
    }
  };

  app.mount("#app");
});
