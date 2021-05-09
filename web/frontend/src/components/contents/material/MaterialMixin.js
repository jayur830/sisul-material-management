import { mapState, mapActions } from "vuex";
import { alert, confirm } from "../../../common";

export default {
    name: "MaterialMixin",
    computed: {
        ...mapState({
            inputtedCategory: state => state.material.inputtedCategory,
            inputtedItem: state => state.material.inputtedItem,
            inputtedCount: state => state.material.inputtedCount,
            items: state => state.material.items,
            srcItems: state => state.material.srcItems
        })
    },
    methods: {
        ...mapActions({
            initItems: "INIT_MATERIAL_ITEMS",
            setInputtedCategory: "SET_MATERIAL_INPUTTED_CATEGORY",
            setInputtedItem: "SET_MATERIAL_INPUTTED_ITEM",
            setInputtedCount: "SET_MATERIAL_INPUTTED_COUNT",
            addItem: "ADD_MATERIAL_ITEM",
            removeItemAndCommit: "REMOVE_AND_COMMIT_MATERIAL_ITEM",
            removeItem: "REMOVE_MATERIAL_ITEM",
            commitItem: "COMMIT_MATERIAL_ITEMS"
        }),

        onAdd() {
            if (this.inputtedCategory === "")
                alert("추가할 자재 종류를 입력하세요.");
            else if (this.inputtedItem === "")
                alert("추가할 자재 제품명을 입력하세요.");
            else if (this.inputtedCount === "")
                alert("초기 재고량을 입력하세요.");
            else this.addItem(`${this.inputtedCategory}:${this.inputtedItem}:${this.inputtedCount}`);
        },

        remove(_item) {
            if (this.srcItems.indexOf(_item) !== -1)
                confirm("자재 항목을 삭제하면 기존 로그까지\n모두 소멸됩니다. 삭제하시겠습니까?", () => {
                    const [category, item, count] = _item.split(":");
                    this.removeItemAndCommit({ category, item, count });
                    alert("삭제되었습니다.");
                });
            else this.removeItem(_item);
        },

        submit() {
            confirm("적용하시겠습니까?", () => {
                this.commitItem(this.items.map(_item => {
                    const [category, item, initCount] = _item.split(":");
                    return { category, item, initCount };
                }));
                alert("적용되었습니다.");
            });
        },

        equalsArray(a, b) {
            if (a && b && a.length !== b.length) return false;
            for (const i in a)
                if (b.indexOf(a[i]) === -1) return false;
            return true;
        }
    }
}
