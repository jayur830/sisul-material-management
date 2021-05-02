<template>
    <div id="app-root">
        <app-header />
        <div>
            <app-side-menu />
            <app-contents />
        </div>
        <alert v-show="alert.show"
               :title="alert.title"
               :ok-button-text="alert.okButtonText"
               @ok="alert.onOk" />
        <confirm v-show="confirm.show"
                 :title="confirm.title"
                 :ok-button-text="confirm.okButtonText"
                 :cancel-button-text="confirm.cancelButtonText"
                 @ok="confirm.onOk" />
    </div>
</template>

<script>
    import { mapState } from "vuex";

    import AppHeader from "./components/header/AppHeader";
    import AppSideMenu from "./components/side_menu/AppSideMenu";
    import AppContents from "./components/contents/AppContents";
    import Alert from "./components/common/Alert";
    import Confirm from "./components/common/Confirm";

    export default {
        name: "App",
        computed: {
            ...mapState({
                alert: state => state.common.alert,
                confirm: state => state.common.confirm
            })
        },
        components: {
            AppHeader,
            AppSideMenu,
            AppContents,
            Alert,
            Confirm
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
