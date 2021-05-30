<template>
    <div id="prompt">
        <div>
            <div>
                <div>
                    <div class="animate__animated animate__bounceIn">
                        <div>
                            <div :key="i" v-for="(sentence, i) in title.split('\n')">{{ sentence }}</div>
                        </div>
                        <div><input type="text" v-model="text" @keyup="e => { if (e.key === 'Enter') onOk(); }" /></div>
                        <div>
                            <input type="button" :value="okButtonText" @click="onOk" />
                            <input type="button" :value="cancelButtonText" @click="onCancel" />
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
        name: "Prompt",
        props: {
            title: String,
            defaultValue: String,
            okButtonText: String,
            cancelButtonText: String,
        },
        data: () => ({
            text: "",
        }),
        methods: {
            ...mapActions({
                setInvisible: "SET_PROMPT_INVISIBLE"
            }),

            async onOk() {
                await this.$emit("ok", this.text);
                await this.setInvisible();
                this.text = "";
            },

            async onCancel() {
                await this.$emit("cancel");
                await this.setInvisible();
                this.text = "";
            }
        },
        mounted() {
            this.text = this.defaultValue;
        }
    }
</script>

<style>
    @import "./Prompt.css";
</style>
