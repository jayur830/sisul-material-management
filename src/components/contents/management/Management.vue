<template>
    <div id="management">
        <div>
            <div>
                <span>추가 항목</span>
                <label>
                    <select :value="selectedCategory" @change="setSelectedCategory($event.target.value)">
                        <option>근무반</option>
                        <option>자재 종류</option>
                        <option>자재 제품명</option>
                        <option>단위</option>
                    </select>
                </label>
                <label><input type="text" :value="inputtedCategory" @change="setInputtedCategory($event.target.value)" @keyup="onEnter" /></label>
                <label><input type="button" class="btn" value="추가" @click="addItem(selectedCategory + ':' + inputtedCategory)" /></label>
            </div>
            <div>
                <div :key="i" v-for="(item, i) in items" @click="removeItem(item)">{{ item }}<span>&times;</span></div>
            </div>
            <div>
                <label>
                    <input type="button" class="btn" value="적용" />
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";

    export default {
        name: "Management",
        computed: {
            ...mapState({
                selectedCategory: state => state.management.selectedCategory,
                inputtedCategory: state => state.management.inputtedCategory,
                items: state => state.management.items
            })
        },
        methods: {
            ...mapActions({
                setSelectedCategory: "SET_MANAGEMENT_SELECTED_CATEGORY",
                setInputtedCategory: "SET_MANAGEMENT_INPUTTED_CATEGORY",
                addItem: "ADD_MANAGEMENT_ITEM",
                removeItem: "REMOVE_MANAGEMENT_ITEM"
            }),

            onEnter(e) {
                if (e.key === "Enter") this.addItem(this.selectedCategory + ':' + this.inputtedCategory);
            }
        }
    }
</script>

<style>
    @import "./Management.css";
</style>
