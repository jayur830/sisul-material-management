<template>
    <div id="alert">
        <div>
            <div>
                <div>
                    <div>
                        <div>{{ title }}</div>
                        <div>
                            <input type="button" :value="okButtonText" @click="setInvisible" />
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
            okButtonText: String
        },
        methods: {
            ...mapActions({
                setInvisible: "SET_ALERT_INVISIBLE"
            })
        }
    }
</script>

<style>
    @import "./Alert.css";
</style>
