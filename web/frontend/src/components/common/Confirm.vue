<template>
    <div id="confirm">
        <div>
            <div>
                <div>
                    <div>
                        <div>{{ title }}</div>
                        <div>
                            <input type="button" :value="okButtonText" @click="ok" />
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
            cancelButtonText: String
        },
        methods: {
            ...mapActions({
                setInvisible: "SET_CONFIRM_INVISIBLE"
            }),

            async ok() {
                await this.setInvisible();
                await this.$emit("ok");
            }
        }
    }
</script>

<style>
    @import "./Confirm.css";
</style>
