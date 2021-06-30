import axios from "axios";

export default {
    state: {
        material: {
            inputtedCategory: "",
            inputtedItem: "",
            inputtedCount: 0,
            items: [],
            srcItems: []
        }
    },
    getters: {

    },
    mutations: {
        INIT_MATERIAL_ITEMS: (state, _items) => {
            const items = _items.map(obj => `${obj.category}:${obj.item}:${obj.count}`);
            [state.material.items, state.material.srcItems] = [Object.freeze(items), Object.freeze(items)];
        },
        SET_MATERIAL_INPUTTED_CATEGORY: (state, category) => state.material.inputtedCategory = category,
        SET_MATERIAL_INPUTTED_ITEM: (state, item) => state.material.inputtedItem = item,
        SET_MATERIAL_INPUTTED_COUNT: (state, count) => state.material.inputtedCount = count,
        ADD_MATERIAL_ITEM: (state, item) => {
            if (state.material.items.findIndex(_item => _item === item) === -1)
                state.material.items = Object.freeze(state.material.items.concat(item));
        },
        REMOVE_MATERIAL_ITEM: (state, item) => {
            const items = state.material.items.concat();
            items.splice(items.findIndex(_item => _item === item), 1);
            state.material.items = Object.freeze(items);
        },
        COMMIT_MATERIAL_ITEMS: (state, items) => {
            items = items.map(obj => `${obj.category}:${obj.item}:${obj.initCount}`);
            [state.material.items, state.material.srcItems] = [Object.freeze(items), Object.freeze(items)];
        }
    },
    actions: {
        INIT_MATERIAL_ITEMS: async context => context.commit("INIT_MATERIAL_ITEMS", await axios.get("/api/material/get").then(response => response.data)),
        SET_MATERIAL_INPUTTED_CATEGORY: (context, category) => context.commit("SET_MATERIAL_INPUTTED_CATEGORY", category),
        SET_MATERIAL_INPUTTED_ITEM: (context, item) => context.commit("SET_MATERIAL_INPUTTED_ITEM", item),
        SET_MATERIAL_INPUTTED_COUNT: (context, count) => context.commit("SET_MATERIAL_INPUTTED_COUNT", count),
        ADD_MATERIAL_ITEM: (context, item) => context.commit("ADD_MATERIAL_ITEM", item),
        REMOVE_AND_COMMIT_MATERIAL_ITEM: async (context, { category, item, count }) => {
            await axios.delete("/api/material/delete", { params: { category, item } });
            await context.commit("REMOVE_MATERIAL_ITEM", `${category}:${item}:${count}`);
        },
        REMOVE_MATERIAL_ITEM: (context, item) => context.commit("REMOVE_MATERIAL_ITEM", item),
        COMMIT_MATERIAL_ITEMS: async (context, items) => {
            await axios.post("/api/material/commit", items);
            await context.commit("COMMIT_MATERIAL_ITEMS", items);
        }
    }
}
