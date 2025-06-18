import { createApp } from "vue";
import { createPinia } from "pinia";
import i18next from "i18next";
import httpBackend from "i18next-http-backend";
import I18NextVue from "i18next-vue";
import App from "./App.vue";
import router from "./router";
import "./styles/carbon-white.css";
import "./styles/tailwind.css";
import { useErrorStore } from "@/stores/useErrorStore.js";

const localLang = localStorage.getItem("language") || "en";
const i18nInitialized = i18next.use(httpBackend).init({
  lng: localLang,
  fallbackLng: "en",
  backend: {
    loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
  },
});
i18nInitialized.then(() => {
  const app = createApp(App);

  app.use(createPinia());
  app.use(router);
  app.use(I18NextVue, { i18next });

  app.config.errorHandler = (err, instance, info) => {
    console.error("Global error:", err);
    try {
      const error = useErrorStore();
      error.$reset();
      error.$patch({ err, instance, info });
    }
    catch (error) {
      console.error(error);
    }
    router.push({ name: "ErrorView" });
  };

  app.mount("#app");
});
