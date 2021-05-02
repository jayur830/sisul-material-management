<template>
    <div id="confirm">
        <div>
            <div>
                <div>
                    <div class="animate__animated animate__bounceIn">
                        <div>{{ title }}</div>
                        <div>
                            <input type="button" :value="okButtonText" @click="onOk" />
                            <input type="button" :value="cancelButtonText" @click="setInvisible" />
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
        name: "Confirm",
        props: {
            title: String,
            okButtonText: String,
            cancelButtonText: String,
            ok: Function
        },
        methods: {
            ...mapActions({
                setInvisible: "SET_CONFIRM_INVISIBLE"
            }),

            async onOk() {
                await this.$emit("ok");
                await this.setInvisible();
            }
        }
    }
</script>

<style>
    @import "./Confirm.css";
</style>
