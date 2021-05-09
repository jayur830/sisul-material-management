<template>
    <div id="my-page">
        <desktop v-show="windowWidth >= 1000" />
        <mobile v-show="windowWidth < 1000" />
    </div>
</template>

<script>
    import { mapState } from "vuex";

    import Desktop from "./Desktop";
    import Mobile from "./Mobile";

    export default {
        name: "MyPage",
        components: {
            Desktop,
            Mobile
        },
        computed: {
            ...mapState({
                windowWidth: state => state.common.windowWidth
            })
        },
    }
</script>

<style>
    @import "./MyPage.css";
</style>
