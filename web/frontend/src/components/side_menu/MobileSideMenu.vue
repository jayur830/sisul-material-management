<template>
    <div id="mobile-side-menu" :class="['animate__animated', 'animate__slideInDown']">
        <ul>
            <li>
                <router-link to="/dashboard">입/출고 조회</router-link>
            </li>
            <li>
                <router-link to="/submit">입/출고 입력</router-link>
            </li>
            <li>
                <router-link to="/material">자재 추가</router-link>
            </li>
            <li>
                <router-link to="/management">항목 추가</router-link>
            </li>
        </ul>
    </div>
</template>

<style>
    @import "./MobileSideMenu.css";
</style>
