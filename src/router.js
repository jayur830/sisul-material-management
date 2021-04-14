import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "/dashboard"
        },
        {
            path: "/dashboard",
            component: () => import("./components/contents/dashboard/Dashboard")
        },
        {
            path: "/submit",
            component: () => import("./components/contents/submit/Submit")
        },
        {
            path: "/management",
            component: () => import("./components/contents/management/Management")
        }
    ]
});
