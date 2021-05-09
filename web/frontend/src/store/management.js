import axios from "axios";

export default {
    state: {
        management: {
            selectedCategory: "근무반",
            inputtedCategory: "",
            items: [],
            srcItems: []
        }
    },
    getters: {

    },
    mutations: {
        INIT_MANAGEMENT_ITEMS: (state, _items) => {
            const items = Object.freeze(_items.map(item => item.itemCategory + ":" + item.itemName));
            [state.management.items, state.management.srcItems] = [items, items];
        },
        SET_MANAGEMENT_SELECTED_CATEGORY: (state, category) => state.management.selectedCategory = category,
        SET_MANAGEMENT_INPUTTED_CATEGORY: (state, category) => state.management.inputtedCategory = category,
        ADD_MANAGEMENT_ITEM: (state, item) => {
            if (state.management.items.findIndex(_item => _item === item) === -1)
                state.management.items = Object.freeze(state.management.items.concat(item));
        },
        REMOVE_MANAGEMENT_ITEM: (state, item) => {
            const items = state.management.items.concat();
            items.splice(items.findIndex(_item => _item === item), 1);
            state.management.items = Object.freeze(items);
        },
        COMMIT_MANAGEMENT_ITEMS: (state, items) => [state.management.items, state.management.srcItems] = [Object.freeze(items), Object.freeze(items)]
    },
    actions: {
        INIT_MANAGEMENT_ITEMS: async context => context.commit("INIT_MANAGEMENT_ITEMS", await axios.get("/api/management/getItems").then(response => response.data)),
        SET_MANAGEMENT_SELECTED_CATEGORY: (context, category) => context.commit("SET_MANAGEMENT_SELECTED_CATEGORY", category),
        SET_MANAGEMENT_INPUTTED_CATEGORY: (context, category) => context.commit("SET_MANAGEMENT_INPUTTED_CATEGORY", category),
        ADD_MANAGEMENT_ITEM: (context, item) => context.commit("ADD_MANAGEMENT_ITEM", item),
        REMOVE_MANAGEMENT_ITEM: (context, item) => context.commit("REMOVE_MANAGEMENT_ITEM", item),
        COMMIT_MANAGEMENT_ITEMS: async (context, items) => {
            await axios.post("/api/management/commit", items);
            context.commit("COMMIT_MANAGEMENT_ITEMS", items);
        }
    }
}
