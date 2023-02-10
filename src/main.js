import { createApp } from "vue";
import { createPinia } from "pinia";
import CarbonVue3 from "@carbon/vue3";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(CarbonVue3);
app.use(createPinia());
app.use(router);

app.mount("#app");
