import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import '@/assets/css/style.scss'
import router from  "./router"
import * as bootstrap from "bootstrap"
const app = createApp(App)
app.use(router)
app.mount("#app");
