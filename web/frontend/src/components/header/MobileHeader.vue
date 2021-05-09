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
            <router-link to="/member/login">
                <div><font-awesome-icon size="4x" :icon="['fa', 'sign-in-alt']" /></div>
                <div>Sign in</div>
            </router-link>
            <router-link to="/member/myPage">
                <div><font-awesome-icon size="4x" :icon="['fa', 'user']" /></div>
                <div>My page</div>
            </router-link>
            <a>
                <div><font-awesome-icon size="4x" :icon="['fa', 'sign-out-alt']" /></div>
                <div>Sign out</div>
            </a>
        </div>
    </div>
</template>

<style>
    @import "./MobileHeader.css";
</style>
