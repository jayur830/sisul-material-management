<template>
    <div id="app-header">
        <div @click="$route.path !== '/dashboard' ? $router.push('/dashboard') : null">
            <img src="../../assets/img/logo.png" width="69.6" height="41.6" alt="logo" />
            <div>응급보수자재관리</div>
            <div>Emergency maintenance material management</div>
        </div>
        <div>
            <router-link to="/member/login" v-show="!isAuthenticated">
                <div><font-awesome-icon size="2x" :icon="['fa', 'sign-in-alt']" /></div>
                <div>로그인</div>
            </router-link>
            <router-link to="/member/myPage" v-show="isAuthenticated">
                <div><font-awesome-icon size="2x" :icon="['fa', 'user']" /></div>
                <div>내 정보</div>
            </router-link>
            <a v-show="isAuthenticated" @click="logout">
                <div><font-awesome-icon size="2x" :icon="['fa', 'sign-out-alt']" /></div>
                <div>로그아웃</div>
            </a>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    import { alert, confirm } from "../../common";

    import axios from "axios";

    export default {
        name: "AppHeader",
        computed: {
            ...mapState({
                isAuthenticated: state => state.member.isAuthenticated
            })
        },
        methods: {
            ...mapActions({
                setAuthenticated: "SET_AUTHENTICATED"
            }),

            async logout() {
                await new Promise(resolve => confirm("로그아웃 하시겠습니까?", resolve));
                await axios.post("/api/member/logout");
                await this.setAuthenticated();
                sessionStorage.removeItem("username");
                await new Promise(resolve => alert("로그아웃 되었습니다.", resolve));
                await this.$router.push("/");
            }
        }
    }
</script>

<style>
    @import "./AppHeader.css";
</style>
