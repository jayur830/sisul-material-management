<template>
    <div id="mobile-side-menu" :class="['animate__animated', 'animate__slideInDown']">
        <ul>
            <li>
                <router-link to="/dashboard" active-class="on">입/출고 조회</router-link>
            </li>
            <li v-show="isAuthenticated">
                <router-link to="/submit" active-class="on">입/출고 입력</router-link>
            </li>
            <li v-show="isAuthenticated && isAdmin">
                <router-link to="/material" active-class="on">자재 추가</router-link>
            </li>
            <li v-show="isAuthenticated && isAdmin">
                <router-link to="/management" active-class="on">항목 추가</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "MobileSideMenu",
        computed: {
            ...mapState({
                isAuthenticated: state => state.member.isAuthenticated,
                isAdmin: state => state.member.isAdmin
            })
        }
    }
</script>

<style>
    @import "./MobileSideMenu.css";
</style>
