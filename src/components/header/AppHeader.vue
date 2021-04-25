<template>
    <div id="app-header">
        <img src="../../assets/img/logo.png" width="69.6" height="41.6" alt="logo" />
        <div>응급보수자재관리</div>
        <div>Emergency maintenance material management</div>
    </div>
</template>

<style>
    #app-header {
        background-color: #404040;
        padding: 10px 15px;
        display: flex;
    }

    #app-header > div:nth-child(2) {
        font-family: 'NanumSquare_acEB', serif;
        color: #e7e6e6;
        font-size: 22pt;
        padding: 5px 15px 5px 30px;
        letter-spacing: 0.05em;
    }

    #app-header > div:nth-child(3) {
        font-family: 'NanumSquare_acR', serif;
        color: #e7e6e6;
        font-size: 8pt;
        padding-top: 30px;
    }
</style>
