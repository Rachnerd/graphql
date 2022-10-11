import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";

const app = createApp(App);

app.config.compilerOptions.isCustomElement = (tag: string) =>
  tag === "ov-default-template";

app.mount("#app");
