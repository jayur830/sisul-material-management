<template>
    <div id="app-contents">
        <router-view />
    </div>
</template>

<style>
    #app-contents {
        width: 100%;
        height: 100%;
        padding-left: 181.72px;
        background-color: #f2f2f2;
    }

    @media (max-width: 1000px) {
        #app-contents {
            height: calc(100% - 29px);
            padding-left: 0;
            padding-top: 38px;
        }
    }
</style>
