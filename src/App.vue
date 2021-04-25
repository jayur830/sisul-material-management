<template>
    <div id="app-root">
        <!--        <input type="file" accept="image/*;capture=camera" capture="camera" />-->
        <app-header />
        <div>
            <app-side-menu />
            <app-contents />
        </div>
    </div>
</template>

<script>
    import AppHeader from "./components/header/AppHeader";
    import AppSideMenu from "./components/side_menu/AppSideMenu";
    import AppContents from "./components/contents/AppContents";

    export default {
        name: "App",
        components: {
            AppHeader,
            AppSideMenu,
            AppContents
        }
    }
</script>

<style>
    #app-root {
        height: 100%;
    }

    #app-root > div {
        display: flex;
    }

    #app-root > div:nth-child(2) {
        height: calc(100% - 62px);
    }
</style>
