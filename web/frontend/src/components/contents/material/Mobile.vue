<template>
    <div id="mobile-material">
        <div>
            <div class="animate__animated animate__fadeInDown">
                <div>
                    <span>자재 종류</span>
                    <label><input type="text" /></label>
                </div>
                <div>
                    <span>자재 제품명</span>
                    <label><input type="text" /></label>
                </div>
                <div>
                    <span>초기 재고량</span>
                    <label><input type="number" /></label>
                </div>
                <label><input type="button" class="btn" value="추가" /></label>
            </div>
            <div class="scroll animate__animated animate__fadeInDown">
<!--                <div>-->
<!--                    <div :key="i" v-for="(item, i) in items" @click="removeItem(item)">{{ item }}<span>&times;</span></div>-->
<!--                </div>-->
            </div>
            <div>
                <label>
                    <input type="button" :class="['btn'/*, equalsArray(items, srcItems) ? 'disabled' : ''*/]" value="적용" />
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    import MaterialMixin from "./MaterialMixin";

    export default {
        name: "MobileMeterial",
        mixins: [MaterialMixin],
        mounted() {

        }
    }
</script>

<style>
    @import "./Mobile.css";
</style>
