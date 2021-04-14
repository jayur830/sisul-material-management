<template>
    <div id="app-side-menu">
        <ul>
            <li>
                <a>입/출고 조회</a>
            </li>
            <li>
                <a>입/출고 입력</a>
            </li>
            <li>
                <a>항목 추가</a>
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
        cursor: pointer;
        transition: color 0.2s;
    }

    #app-side-menu ul li a:hover {
        color: #0070c0;
    }
</style>
