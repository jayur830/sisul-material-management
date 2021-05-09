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
            path: "/material",
            component: () => import("./components/contents/material/Material")
        },
        {
            path: "/management",
            component: () => import("./components/contents/management/Management")
        },
        {
            path: "/member",
            redirect: "/member/login"
        },
        {
            path: "/member/login",
            component: () => import("./components/contents/member/login/Login")
        },
        {
            path: "/member/signUp",
            component: () => import("./components/contents/member/sign_up/SignUp")
        },
        {
            path: "/member/findUsername",
            component: () => import("./components/contents/member/find_username/FindUsername")
        },
        {
            path: "/member/findPassword",
            component: () => import("./components/contents/member/find_password/FindPassword")
        },
        {
            path: "/member/myPage",
            component: () => import("./components/contents/member/my_page/MyPage")
        }
    ]
});
