import Vue from "vue";
import App from "./App.vue";

import "./index.css";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
    faRedoAlt,
    faArrowLeft,
    faChevronLeft,
    faChevronRight
} from "@fortawesome/free-solid-svg-icons";

Vue.component("font-awesome-icon", FontAwesomeIcon);
library.add(
    faRedoAlt,
    faArrowLeft,
    faChevronLeft,
    faChevronRight);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
