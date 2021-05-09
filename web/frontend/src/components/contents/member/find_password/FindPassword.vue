<template>
    <div id="find-password">
        <desktop v-show="windowWidth >= 1000" />
        <mobile v-show="windowWidth < 1000" />
    </div>
</template>

<script>
    import { mapState } from "vuex";

    import Desktop from "./Desktop";
    import Mobile from "./Mobile";

    export default {
        name: "FindPassword",
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
    @import "./FindPassword.css";
</style>
