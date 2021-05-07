<template>
    <div id="desktop-management">
        <div>
            <div class="animate__animated animate__fadeInDown">
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
    import { mapState, mapActions } from "vuex";
    import { alert, confirm } from "../../../common";

    export default {
        name: "DesktopManagement",
        computed: {
            ...mapState({
                selectedCategory: state => state.management.selectedCategory,
                inputtedCategory: state => state.management.inputtedCategory,
                items: state => state.management.items,
                srcItems: state => state.management.srcItems
            })
        },
        methods: {
            ...mapActions({
                initItems: "INIT_MANAGEMENT_ITEMS",
                setSelectedCategory: "SET_MANAGEMENT_SELECTED_CATEGORY",
                setInputtedCategory: "SET_MANAGEMENT_INPUTTED_CATEGORY",
                addItem: "ADD_MANAGEMENT_ITEM",
                removeItem: "REMOVE_MANAGEMENT_ITEM",
                commitItems: "COMMIT_MANAGEMENT_ITEMS"
            }),

            onEnter(e) {
                if (e.key === "Enter") this.onAdd();
            },

            onAdd() {
                if (this.inputtedCategory === "")
                    alert("추가할 항목을 입력하세요.");
                else this.addItem(this.selectedCategory + ':' + this.inputtedCategory);
            },

            submit() {
                confirm("적용하시겠습니까?", () => {
                    console.log("aaa");
                    this.commitItems(this.items);
                    alert("적용되었습니다.");
                });
            },

            equalsArray(a, b) {
                if (a && b && a.length !== b.length) return false;
                for (const i in a)
                    if (b.indexOf(a[i]) === -1) return false;
                return true;
            }
        },
        mounted() {
            this.initItems();
        }
    }
</script>

<style>
    @import "./Desktop.css";
</style>
