import { mapState, mapActions } from "vuex";
import { alert, confirm } from "../../../common";

export default {
    name: "ManagementMixin",
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
    }
}
