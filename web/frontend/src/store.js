import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        common: {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            alert: {
                show: false,
                title: "",
                okButtonText: "",
                onOk: () => null
            },
            confirm: {
                show: false,
                title: "",
                okButtonText: "",
                cancelButtonText: "",
                onOk: () => null,
            }
        },
        dashboard: {
            log: null,
            logOrder: {
                logTime: false,
                inOut: true,
                category: true,
                item: true,
                count: true,
                workClass: true,
                workerName: true
            },
            logView: {
                data: null,
                selectedImgIndex: 0
            },
            stock: null,
            stockOrder: {
                category: true,
                item: true,
                count: true
            },
            selectedStockId: null,
            selectedStock: null,
            selectedStockOrder: {
                logTime: false,
                inOut: true,
                count: true,
                workClass: true,
                workerName: true
            }
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
                manualUnit: ""
            }
        },
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
        /**
         * Common
         * */
        SET_WINDOW_SIZE: (state, { width, height }) => [state.common.windowWidth, state.common.windowHeight] = [width, height],
        SET_ALERT_INVISIBLE: state => state.common.alert = { show: false, title: "", okButtonText: "", onOk: () => null },
        SET_ALERT_VISIBLE: (state, alert) => state.common.alert = alert,
        SET_CONFIRM_INVISIBLE: state => state.common.confirm = { show: false, title: "", okButtonText: "", cancelButtonText: "", onOk: () => null },
        SET_CONFIRM_VISIBLE: (state, confirm) => state.common.confirm = confirm,

        /**
         * Dashboard
         * */
        INIT_DASHBOARD_LOG_LIST: (state, data) => state.dashboard.log = Object.freeze(data),
        ORDER_DASHBOARD_LOG_LIST: (state, { property, order }) => {
            const log = state.dashboard.log.concat();
            log.sort((a, b) => (order ? a[property] < b[property] : a[property] > b[property]) ? 1 : -1);
            state.dashboard.log = Object.freeze(log);
            state.dashboard.logOrder = Object.freeze({ ...state.dashboard.logOrder, [property]: order });
        },
        SET_DASHBOARD_LOG_VIEW: (state, data) => {
            data["imgs"] = [];
            if (data.img1) data.imgs.push(data.img1);
            if (data.img2) data.imgs.push(data.img2);
            if (data.img3) data.imgs.push(data.img3);
            delete data.img1;
            delete data.img2;
            delete data.img3;
            state.dashboard.logView.data = Object.freeze(data);
        },
        SET_DASHBOARD_LOG_VIEW_IMG_INDEX: (state, value) => {
            if (value === -1 && state.dashboard.logView.selectedImgIndex - 1 >= 0)
                --state.dashboard.logView.selectedImgIndex;
            else if (value === 1 && state.dashboard.logView.selectedImgIndex + 1 < state.dashboard.logView.data.imgs.length)
                ++state.dashboard.logView.selectedImgIndex;
        },
        CLEAR_DASHBOARD_LOG_VIEW: state => [state.dashboard.logView.data, state.dashboard.logView.selectedImgIndex] = [null, 0],
        INIT_DASHBOARD_STOCK_LIST: (state, data) => state.dashboard.stock = Object.freeze(data),
        ORDER_DASHBOARD_STOCK_LIST: (state, { property, order }) => {
            const stock = state.dashboard.stock.concat();
            stock.sort((a, b) => (order ? a[property] < b[property] : a[property] > b[property]) ? 1 : -1);
            state.dashboard.stock = Object.freeze(stock);
            state.dashboard.stockOrder = Object.freeze({ ...state.dashboard.stockOrder, [property]: order });
        },
        SET_DASHBOARD_STOCK_VIEW: (state, { data, stockId }) => {
            state.dashboard.selectedStock = Object.freeze(data);
            state.dashboard.selectedStockId = stockId;
        },
        ORDER_DASHBOARD_STOCK_VIEW: (state, { property, order }) => {
            const selectedStock = state.dashboard.selectedStock.concat();
            selectedStock.sort((a, b) => (order ? a[property] < b[property] : a[property] > b[property]) ? 1 : -1);
            state.dashboard.selectedStock = Object.freeze(selectedStock);
            state.dashboard.selectedStockOrder = Object.freeze({ ...state.dashboard.selectedStockOrder, [property]: order });
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
        SET_SUBMIT_IMG_FILE: (state, { index, file }) => state.submit.data.files = state.submit.data.files.map((_file, i) => i === index ? file : _file),
        SET_SUBMIT_MANUAL_WORK_CLASS: (state, workClass) => state.submit.data.manualWorkClass = workClass,
        SET_SUBMIT_MANUAL_CATEGORY: (state, category) => state.submit.data.manualCategory = category,
        SET_SUBMIT_MANUAL_ITEM: (state, item) => state.submit.data.manualItem = item,
        SET_SUBMIT_MANUAL_UNIT: (state, unit) => state.submit.data.manualUnit = unit,

        CLEAR_SUBMIT_FORM_DATA: state => state.submit.data = { workClass: "", workerName: "", category: "", item: "", inOut: null, count: null, unit: "", files: ["", "", ""], manualWorkClass: "", manualCategory: "", manualItem: "", manualUnit: "" },

        /**
         * Management
         * */
        INIT_MANAGEMENT_ITEMS: (state, _items) => {
            const items = Object.freeze(_items.map(item => item.itemCategory + ":" + item.itemName));
            [state.management.items, state.management.srcItems] = [items, items];
        },
        SET_MANAGEMENT_SELECTED_CATEGORY: (state, category) => state.management.selectedCategory = category,
        SET_MANAGEMENT_INPUTTED_CATEGORY: (state, category) => {
            console.log(category);
            state.management.inputtedCategory = category;
        },
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
        /**
         * Common
         * */
        SET_WINDOW_SIZE: (context, { width, height }) => context.commit("SET_WINDOW_SIZE", { width, height }),
        SET_ALERT_INVISIBLE: context => context.commit("SET_ALERT_INVISIBLE"),
        SET_ALERT_VISIBLE: (context, alert) => context.commit("SET_ALERT_VISIBLE", alert),
        SET_CONFIRM_INVISIBLE: context => context.commit("SET_CONFIRM_INVISIBLE"),
        SET_CONFIRM_VISIBLE: (context, confirm) => context.commit("SET_CONFIRM_VISIBLE", confirm),

        /**
         * Dashboard
         * */
        INIT_DASHBOARD_LOG_LIST: async context => context.commit("INIT_DASHBOARD_LOG_LIST", await axios.get("/api/dashboard/log/list").then(response => response.data)),
        ORDER_DASHBOARD_LOG_LIST: (context, { property, order }) => context.commit("ORDER_DASHBOARD_LOG_LIST", { property, order }),
        SET_DASHBOARD_LOG_VIEW: async (context, { logTime, workClass, workerName }) => context.commit("SET_DASHBOARD_LOG_VIEW", await axios.get("/api/dashboard/log/view", { params: { logTime, workClass, workerName } }).then(response => response.data)),
        SET_DASHBOARD_LOG_VIEW_IMG_INDEX: (context, value) => context.commit("SET_DASHBOARD_LOG_VIEW_IMG_INDEX",  value),
        CLEAR_DASHBOARD_LOG_VIEW: context => context.commit("CLEAR_DASHBOARD_LOG_VIEW"),
        INIT_DASHBOARD_STOCK_LIST: async context => context.commit("INIT_DASHBOARD_STOCK_LIST", await axios.get("/api/dashboard/stock/list").then(response => response.data)),
        ORDER_DASHBOARD_STOCK_LIST: (context, { property, order }) => context.commit("ORDER_DASHBOARD_STOCK_LIST", { property, order }),
        SET_DASHBOARD_STOCK_VIEW: async (context, stockId) => context.commit("SET_DASHBOARD_STOCK_VIEW", { data: await axios.get("/api/dashboard/stock/view", { params: { stockId } }).then(response => response.data), stockId }),
        ORDER_DASHBOARD_STOCK_VIEW: (context, { property, order }) => context.commit("ORDER_DASHBOARD_STOCK_VIEW", { property, order }),

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
});
