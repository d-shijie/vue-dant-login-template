import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/base.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/style/global.scss";
import "./mock/index";
import "@/router/permission";
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.mount("#app");
