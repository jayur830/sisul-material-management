import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
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
            path: "/dashboard/view",
            component: () => import("./components/contents/dashboard/view/DashboardView")
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
