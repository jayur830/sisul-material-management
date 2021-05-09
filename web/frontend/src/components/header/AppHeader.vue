<template>
    <div id="app-header">
        <div @click="$router.push('/dashboard')">
            <img src="../../assets/img/logo.png" width="69.6" height="41.6" alt="logo" />
            <div>응급보수자재관리</div>
            <div>Emergency maintenance material management</div>
        </div>
        <div>
            <router-link to="/member/login">
                <div><font-awesome-icon size="2x" :icon="['fa', 'sign-in-alt']" /></div>
                <div>Sign in</div>
            </router-link>
            <router-link to="/member/myPage">
                <div><font-awesome-icon size="2x" :icon="['fa', 'user']" /></div>
                <div>My page</div>
            </router-link>
            <a>
                <div><font-awesome-icon size="2x" :icon="['fa', 'sign-out-alt']" /></div>
                <div>Sign out</div>
            </a>
        </div>
    </div>
</template>

<style>
    @import "./AppHeader.css";
</style>
