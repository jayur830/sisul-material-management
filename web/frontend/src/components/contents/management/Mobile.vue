<template>
    <div id="mobile-management">
        <div>
            <div class="animate__animated animate__fadeInDown">
                <span>추가 항목</span>
                <label>
                    <select :value="selectedCategory" @change="setSelectedCategory($event.target.value)">
                        <option>근무반</option>
                        <option>단위</option>
                    </select>
                </label>
                <label><input type="text" :value="inputtedCategory" @keyup="setInputtedCategory($event.target.value)" /></label>
                <label><input type="button" class="btn" value="추가" @click="onAdd" /></label>
            </div>
            <div class="scroll animate__animated animate__fadeInDown">
                <div>
                    <div :key="i" v-for="(item, i) in items" @click="removeItem(item)">{{ item }}<span>&times;</span></div>
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
    import ManagementMixin from "./ManagementMixin";

    export default {
        name: "DesktopManagement",
        mixins: [ManagementMixin],
        mounted() {
            this.initItems();
        }
    }
</script>

<style>
    @import "./Mobile.css";
</style>
