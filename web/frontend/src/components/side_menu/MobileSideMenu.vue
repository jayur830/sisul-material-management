<template>
    <div id="mobile-side-menu" :class="['animate__animated', 'animate__slideInDown']">
        <ul>
            <li>
                <router-link to="/dashboard" active-class="on">입/출고 조회</router-link>
            </li>
            <li>
                <router-link to="/submit" active-class="on">입/출고 입력</router-link>
            </li>
            <li>
                <router-link to="/material" active-class="on">자재 추가</router-link>
            </li>
            <li>
                <router-link to="/management" active-class="on">항목 추가</router-link>
            </li>
        </ul>
    </div>
</template>

<style>
    @import "./MobileSideMenu.css";
</style>
