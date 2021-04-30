import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        dashboard: {
            log: null,
            stock: null
        },
        submit: {
            properties: null,
            data: {
                workClass: "",
                workerName: "",
                category: "",
                item: "",
                inOut: null,
                count: null,
                unit: "",
                files: ["", "", ""],
                manualWorkClass: "",
                manualCategory: "",
                manualItem: "",
                manualUnit: "",
            }
        },
        management: {
            selectedCategory: "근무반",
            inputtedCategory: "",
            items: []
        }
    },
    getters: {

    },
    mutations: {
        /**
         * Dashboard
         * */
        INIT_DASHBOARD_LOG_LIST: (state, data) => {
            console.log(data);
            state.dashboard.log = Object.freeze(data);
        },
        INIT_DASHBOARD_STOCK_LIST: (state, data) => {
            console.log(data);
            state.dashboard.stock = Object.freeze(data);
        },

        /**
         * Submit
         * */
        INIT_SUBMIT_PROPERTIES: (state, properties) => {
            state.submit.properties = Object.freeze(properties);
            state.submit.data.workClass = properties.workClasses[0];
            state.submit.data.category = properties.categories[0];
            state.submit.data.item = properties.items[0];
            state.submit.data.unit = properties.units[0];
        },

        SET_SUBMIT_WORK_CLASS: (state, workClass) => [state.submit.data.workClass, state.submit.data.manualWorkClass] = [workClass, ""],
        SET_SUBMIT_WORKER_NAME: (state, workerName) => state.submit.data.workerName = workerName,
        SET_SUBMIT_CATEGORY: (state, category) => [state.submit.data.category, state.submit.data.manualCategory] = [category, ""],
        SET_SUBMIT_ITEM: (state, item) => [state.submit.data.item, state.submit.data.manualItem] = [item, ""],
        SET_SUBMIT_SELECTED_IN_OUT: (state, inOut) => state.submit.data.inOut = inOut,
        SET_SUBMIT_COUNT: (state, count) => state.submit.data.count = count,
        SET_SUBMIT_UNIT: (state, unit) => [state.submit.data.unit, state.submit.data.manualUnit] = [unit, ""],
        SET_SUBMIT_IMG_FILE: (state, { index, file }) => state.submit.data.files[index] = file,
        SET_SUBMIT_MANUAL_WORK_CLASS: (state, workClass) => state.submit.data.manualWorkClass = workClass,
        SET_SUBMIT_MANUAL_CATEGORY: (state, category) => state.submit.data.manualCategory = category,
        SET_SUBMIT_MANUAL_ITEM: (state, item) => state.submit.data.manualItem = item,
        SET_SUBMIT_MANUAL_UNIT: (state, unit) => state.submit.data.manualUnit = unit,

        /**
         * Management
         * */
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
        }
    },
    actions: {
        /**
         * Dashboard
         * */
        INIT_DASHBOARD_LOG_LIST: async context => context.commit("INIT_DASHBOARD_LOG_LIST", await axios.get("/api/dashboard/log/list").then(response => response.data)),
        INIT_DASHBOARD_STOCK_LIST: async context => context.commit("INIT_DASHBOARD_STOCK_LIST", await axios.get("/api/dashboard/stock/list").then(response => response.data)),

        /**
         * Submit
         * */
        INIT_SUBMIT_PROPERTIES: async context => await context.commit("INIT_SUBMIT_PROPERTIES", await axios.get("/api/submit/items").then(response => response.data)),

        SET_SUBMIT_WORK_CLASS: (context, workClass) => context.commit("SET_SUBMIT_WORK_CLASS", workClass),
        SET_SUBMIT_WORKER_NAME: (context, workerName) => context.commit("SET_SUBMIT_WORKER_NAME", workerName),
        SET_SUBMIT_CATEGORY: (context, category) => context.commit("SET_SUBMIT_CATEGORY", category),
        SET_SUBMIT_ITEM: (context, item) => context.commit("SET_SUBMIT_ITEM", item),
        SET_SUBMIT_SELECTED_IN_OUT: (context, inOut) => context.commit("SET_SUBMIT_SELECTED_IN_OUT", inOut),
        SET_SUBMIT_COUNT: (context, count) => context.commit("SET_SUBMIT_COUNT", count),
        SET_SUBMIT_UNIT: (context, unit) => context.commit("SET_SUBMIT_UNIT", unit),
        SET_SUBMIT_IMG_FILE: (context, { index, file }) => context.commit("SET_SUBMIT_IMG_FILE", { index, file }),
        SET_SUBMIT_MANUAL_WORK_CLASS: (context, workClass) => context.commit("SET_SUBMIT_MANUAL_WORK_CLASS", workClass),
        SET_SUBMIT_MANUAL_CATEGORY: (context, category) => context.commit("SET_SUBMIT_MANUAL_CATEGORY", category),
        SET_SUBMIT_MANUAL_ITEM: (context, item) => context.commit("SET_SUBMIT_MANUAL_ITEM", item),
        SET_SUBMIT_MANUAL_UNIT: (context, unit) => context.commit("SET_SUBMIT_MANUAL_UNIT", unit),

        /**
         * Management
         * */
        SET_MANAGEMENT_SELECTED_CATEGORY: (context, category) => context.commit("SET_MANAGEMENT_SELECTED_CATEGORY", category),
        SET_MANAGEMENT_INPUTTED_CATEGORY: (context, category) => context.commit("SET_MANAGEMENT_INPUTTED_CATEGORY", category),
        ADD_MANAGEMENT_ITEM: (context, item) => context.commit("ADD_MANAGEMENT_ITEM", item),
        REMOVE_MANAGEMENT_ITEM: (context, item) => context.commit("REMOVE_MANAGEMENT_ITEM", item)
    }
});
