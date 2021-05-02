<template>
    <div id="alert">
        <div>
            <div>
                <div>
                    <div class="animate__animated animate__bounceIn">
                        <div>{{ title }}</div>
                        <div>
                            <input type="button" :value="okButtonText" @click="onOk" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from "vuex";

    export default {
        name: "Alert",
        props: {
            title: String,
            okButtonText: String,
            ok: Function
        },
        methods: {
            ...mapActions({
                setInvisible: "SET_ALERT_INVISIBLE"
            }),

            onOk() {
                this.$emit("ok");
                this.setInvisible();
            }
        }
    }
</script>

<style>
    @import "./Alert.css";
</style>
