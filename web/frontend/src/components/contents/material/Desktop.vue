<template>
    <div id="desktop-material">
        <div>
            <div class="animate__animated animate__fadeInDown">
                <div>
                    <span>자재 종류</span>
                    <label><input type="text" :value="inputtedCategory" @change="setInputtedCategory($event.target.value)" /></label>
                    <span>자재 제품명</span>
                    <label><input type="text" :value="inputtedItem" @change="setInputtedItem($event.target.value)" /></label>
                </div>
                <div>
                    <span>초기 재고량</span>
                    <label><input type="number" :value="inputtedCount" @change="setInputtedCount($event.target.value)" /></label>
                    <label><input type="button" class="btn" value="추가" @click="onAdd" /></label>
                </div>
            </div>
            <div class="scroll animate__animated animate__fadeInDown">
                <div>
                    <div :key="i" v-for="(item, i) in items" @click="remove(item)">{{ item }}<span>&times;</span></div>
                </div>
            </div>
            <div>
                <label>
                    <input type="button" :class="['btn', equalsArray(items, srcItems) ? 'disabled' : '']" value="적용" :disabled="equalsArray(items, srcItems)" @click="submit" />
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    import MaterialMixin from "./MaterialMixin";

    export default {
        name: "DesktopMeterial",
        mixins: [MaterialMixin],
        mounted() {
            this.initItems();
        }
    }
</script>

<style>
    @import "./Desktop.css";
</style>
