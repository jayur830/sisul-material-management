<template>
    <div id="app-side-menu" :class="['animate__animated', 'animate__slideInLeft']">
        <ul>
            <li v-show="isAuthenticated && isConfirmed">
                <router-link to="/dashboard" active-class="on">입/출고 조회</router-link>
            </li>
            <li v-show="isAuthenticated && isConfirmed">
                <router-link to="/submit" active-class="on">입/출고 입력</router-link>
            </li>
            <li v-show="isAuthenticated && isConfirmed && isAdmin">
                <router-link to="/material" active-class="on">자재 추가</router-link>
            </li>
            <li v-show="isAuthenticated && isConfirmed && isAdmin">
                <router-link to="/management" active-class="on">항목 추가</router-link>
            </li>
            <li v-show="isAuthenticated && isConfirmed && isAdmin">
                <router-link to="/member/confirm" active-class="on">관리자 승인 목록</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "AppSideMenu",
        computed: {
            ...mapState({
                isAuthenticated: state => state.member.isAuthenticated,
                isConfirmed: state => state.member.isConfirmed,
                isAdmin: state => state.member.isAdmin
            })
        }
    }
</script>

<style>
    @import "./AppSideMenu.css";
</style>
