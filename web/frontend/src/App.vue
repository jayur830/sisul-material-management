<template>
    <div id="app-root" class="text-no-drag">
        <app-header v-show="windowWidth >= 1000" />
        <mobile-header v-show="windowWidth < 1000" />
        <div>
            <app-side-menu v-show="windowWidth >= 1000" />
            <mobile-side-menu v-show="windowWidth < 1000" />
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
        <prompt v-show="prompt.show"
                :title="prompt.title"
                :default-value="prompt.defaultValue"
                :ok-button-text="prompt.okButtonText"
                :cancel-button-text="prompt.cancelButtonText"
                @ok="prompt.onOk" />
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";

    import AppHeader from "./components/header/AppHeader";
    import MobileHeader from "./components/header/MobileHeader";
    import AppSideMenu from "./components/side_menu/AppSideMenu";
    import MobileSideMenu from "./components/side_menu/MobileSideMenu";
    import AppContents from "./components/contents/AppContents";
    import Alert from "./components/common/Alert";
    import Confirm from "./components/common/Confirm";
    import Prompt from "./components/common/Prompt";

    export default {
        name: "App",
        computed: {
            ...mapState({
                windowWidth: state => state.common.windowWidth,
                alert: state => state.common.alert,
                confirm: state => state.common.confirm,
                prompt: state => state.common.prompt
            })
        },
        components: {
            AppHeader,
            MobileHeader,
            AppSideMenu,
            MobileSideMenu,
            AppContents,
            Alert,
            Confirm,
            Prompt
        },
        methods: {
            ...mapActions({
                setWindowSize: "SET_WINDOW_SIZE"
            })
        },
        mounted() {
            let isResizing;
            window.addEventListener("resize", () => {
                if (isResizing) clearTimeout(isResizing);
                isResizing = setTimeout(() => this.setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight
                }), 200);
            });
        }
    }
</script>

<style>
    #app-root {
        height: 100%;
        overflow: hidden;
    }

    #app-root > div {
        display: flex;
    }

    #app-root > div:nth-child(3) {
        height: calc(100% - 62px);
    }
</style>
