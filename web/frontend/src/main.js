import Vue from "vue";
import App from "./App.vue";

import "./index.css";
import router from "./router";
import store from "./store/store";

import "animate.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
    faRedoAlt,
    faArrowLeft,
    faChevronLeft,
    faChevronRight,
    faFileDownload,
    faSort,
    faTimes,
    faEdit,
    faUser,
    faSignInAlt,
    faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

import "vue2-datepicker/index.css";
import DatePicker from "vue2-datepicker";

import "vue2-timepicker/dist/VueTimepicker.css";
import VueTimePicker from "vue2-timepicker";

Vue.component("font-awesome-icon", FontAwesomeIcon);
library.add(
    faRedoAlt,
    faArrowLeft,
    faChevronLeft,
    faChevronRight,
    faFileDownload,
    faSort,
    faTimes,
    faEdit,
    faUser,
    faSignInAlt,
    faSignOutAlt);

Vue.component("date-picker", DatePicker);
Vue.component("time-picker", VueTimePicker);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
