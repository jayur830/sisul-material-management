<template>
    <div id="app-side-menu">
        <ul>
            <li>
                <router-link to="/dashboard">입/출고 조회</router-link>
            </li>
            <li>
                <router-link to="/submit">입/출고 입력</router-link>
            </li>
            <li>
                <router-link to="/management">항목 추가</router-link>
            </li>
        </ul>
    </div>
</template>

<style>
    #app-side-menu {
        height: calc(100% - 40px);
        background-color: #3b3838;
        padding: 20px;
    }

    #app-side-menu ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
        color: #e7e6e6;
        font-size: 16pt;
        font-family: 'NanumSquareB', sans-serif;
    }

    #app-side-menu ul li {
        padding: 30px 15px;
        text-align: center;
    }

    #app-side-menu ul li a {
        color: #e7e6e6;
        text-decoration: none;
        outline: none;
        cursor: pointer;
        transition: color 0.2s;
    }

    #app-side-menu ul li a:hover {
        color: #0070c0;
    }
</style>
