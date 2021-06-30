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
            else this.addItem(`${this.inputtedCategory}:${this.inputtedItem}:${this.inputtedCount}`);
        },

        async remove(_item) {
            if (this.srcItems.indexOf(_item) !== -1) {
                await new Promise(resolve => confirm("삭제하시겠습니까?", resolve));
                const [category, item, count] = _item.split(":");
                await this.removeItemAndCommit({ category, item, count });
                await alert("삭제되었습니다.");
            } else this.removeItem(_item);
        },

        async submit() {
            await new Promise(resolve => confirm("적용하시겠습니까?", resolve));
            await this.commitItem(this.items.map(_item => {
                const [category, item, initCount] = _item.split(":");
                return { category, item, initCount };
            }));
            await alert("적용되었습니다.");
        },

        equalsArray(a, b) {
            if (a && b && a.length !== b.length) return false;
            for (const i in a)
                if (b.indexOf(a[i]) === -1) return false;
            return true;
        }
    }
}
