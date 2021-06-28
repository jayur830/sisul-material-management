<template>
    <div id="mobile-header">
        <div @click="$route.path !== '/dashboard' ? $router.push('/dashboard') : null">
            <img src="../../assets/img/logo.png" width="55.7" height="33.3" alt="logo" />
            <div>
                <div>응급보수자재관리</div>
                <div>Emergency maintenance material management</div>
            </div>
        </div>
        <div>
            <router-link to="/member/login" v-show="!(isAuthenticated && isConfirmed)">
                <div><font-awesome-icon size="4x" :icon="['fa', 'sign-in-alt']" /></div>
                <div>로그인</div>
            </router-link>
            <router-link to="/member/myPage" v-show="isAuthenticated && isConfirmed">
                <div><font-awesome-icon size="4x" :icon="['fa', 'user']" /></div>
                <div>내 정보</div>
            </router-link>
            <a v-show="isAuthenticated && isConfirmed" @click="logout">
                <div><font-awesome-icon size="4x" :icon="['fa', 'sign-out-alt']" /></div>
                <div>로그아웃</div>
            </a>
        </div>
    </div>
</template>

<script>
    import HeaderMixin from "./HeaderMixin";

    export default {
        name: "AppHeader",
        mixins: [HeaderMixin]
    }
</script>

<style>
    @import "./MobileHeader.css";
</style>
