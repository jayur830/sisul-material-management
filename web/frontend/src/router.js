import Vue from "vue";
import VueRouter from "vue-router";

import store from "./store/store";

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
            component: () => import("./components/contents/dashboard/Dashboard"),
            async beforeEnter(to, from, next) {
                await store.dispatch("SET_AUTHENTICATED");
                if (store.state.member.isAuthenticated && store.state.member.isConfirmed) return next();
                next("/member/login");
            }
        },
        {
            path: "/dashboard/view",
            component: () => import("./components/contents/dashboard/view/DashboardView"),
            async beforeEnter(to, from, next) {
                await store.dispatch("SET_AUTHENTICATED");
                if (store.state.member.isAuthenticated && store.state.member.isConfirmed) return next();
                next("/member/login");
            }
        },
        {
            name: "dashboardEdit",
            props: true,
            path: "/dashboard/edit",
            component: () => import("./components/contents/dashboard/edit/DashboardEdit"),
            async beforeEnter(to, from, next) {
                await store.dispatch("SET_AUTHENTICATED");
                if (store.state.member.isAuthenticated && store.state.member.isConfirmed && store.state.member.isAdmin) return next();
                next("/dashboard");
            }
        },
        {
            path: "/submit",
            component: () => import("./components/contents/submit/Submit"),
            async beforeEnter(to, from, next) {
                await store.dispatch("SET_AUTHENTICATED");
                if (store.state.member.isAuthenticated && store.state.member.isConfirmed) return next();
                next("/member/login");
            }
        },
        {
            path: "/material",
            component: () => import("./components/contents/material/Material"),
            async beforeEnter(to, from, next) {
                await store.dispatch("SET_AUTHENTICATED");
                if (store.state.member.isAuthenticated && store.state.member.isConfirmed) return next();
                next("/member/login");
            }
        },
        {
            path: "/management",
            component: () => import("./components/contents/management/Management"),
            async beforeEnter(to, from, next) {
                await store.dispatch("SET_AUTHENTICATED");
                if (store.state.member.isAuthenticated && store.state.member.isConfirmed) return next();
                next("/member/login");
            }
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
            component: () => import("./components/contents/member/my_page/MyPage"),
            async beforeEnter(to, from, next) {
                await store.dispatch("SET_AUTHENTICATED");
                if (store.state.member.isAuthenticated && store.state.member.isConfirmed) return next();
                next("/member/login");
            }
        },
        {
            path: "/member/changePassword",
            component: () => import("./components/contents/member/change_password/ChangePassword"),
            async beforeEnter(to, from, next) {
                await store.dispatch("SET_AUTHENTICATED");
                if (store.state.member.isAuthenticated && store.state.member.isConfirmed) return next();
                next("/member/login");
            }
        },
        {
            path: "/member/confirm",
            component: () => import("./components/contents/member/confirm/MemberConfirm"),
            async beforeEnter(to, from, next) {
                await store.dispatch("SET_AUTHENTICATED");
                if (store.state.member.isAuthenticated && store.state.member.isConfirmed) return next();
                next("/member/login");
            }
        }
    ]
});
