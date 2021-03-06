import axios from "axios";

export default {
    state: {
        dashboard: {
            log: null,
            logOrder: {
                logTime: false,
                inOut: true,
                category: true,
                item: true,
                count: true,
                lastCount: true,
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
            },
            edit: {
                properties: null,
                isExist: null
            }
        }
    },
    getters: {

    },
    mutations: {
        INIT_DASHBOARD_LOG_LIST: (state, data) => state.dashboard.log = Object.freeze(data),
        ORDER_DASHBOARD_LOG_LIST: (state, { property, order }) => {
            const log = state.dashboard.log.concat();
            log.sort((a, b) => (order ? a[property] < b[property] : a[property] > b[property]) ? 1 : -1);
            state.dashboard.log = Object.freeze(log);
            state.dashboard.logOrder = Object.freeze({ ...state.dashboard.logOrder, [property]: order });
        },
        REMOVE_DASHBOARD_LOG: (state, { logTime, category, item }) => {
            const logList = state.dashboard.log.concat();
            logList.splice(logList.findIndex(obj => obj.logTime === logTime && obj.category === category && obj.item === item), 1);
            state.dashboard.log = Object.freeze(logList);
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

        INIT_DASHBOARD_EDIT_PROPERTIES: (state, properties) => {
            properties["categories"] = Object.keys(properties.materials);
            properties["categories"].sort();
            state.dashboard.edit.properties = Object.freeze(properties);
        },
        SET_DASHBOARD_EDIT_EXIST_MATERIAL: (state, isExist) => state.dashboard.edit.isExist = isExist === 1,
        CLEAR_DASHBOARD_EDIT_EXIST_MATERIAL: state => state.dashboard.edit.isExist = null
    },
    actions: {
        INIT_DASHBOARD_LOG_LIST: async context => context.commit("INIT_DASHBOARD_LOG_LIST", await axios.get("/api/dashboard/log/list").then(response => response.data)),
        ORDER_DASHBOARD_LOG_LIST: (context, { property, order }) => context.commit("ORDER_DASHBOARD_LOG_LIST", { property, order }),
        REMOVE_DASHBOARD_LOG: async (context, { logTime, category, item }) => {
            await axios.delete("/api/dashboard/log/remove", { params: { logTime, category, item } });
            await context.commit("REMOVE_DASHBOARD_LOG", logTime);
        },
        SET_DASHBOARD_LOG_VIEW: async (context, { logTime, workClass, workerName }) => context.commit("SET_DASHBOARD_LOG_VIEW", await axios.get("/api/dashboard/log/view", { params: { logTime, workClass, workerName } }).then(response => response.data)),
        SET_DASHBOARD_LOG_VIEW_IMG_INDEX: (context, value) => context.commit("SET_DASHBOARD_LOG_VIEW_IMG_INDEX",  value),
        CLEAR_DASHBOARD_LOG_VIEW: context => context.commit("CLEAR_DASHBOARD_LOG_VIEW"),
        INIT_DASHBOARD_STOCK_LIST: async context => context.commit("INIT_DASHBOARD_STOCK_LIST", await axios.get("/api/dashboard/stock/list").then(response => response.data)),
        ORDER_DASHBOARD_STOCK_LIST: (context, { property, order }) => context.commit("ORDER_DASHBOARD_STOCK_LIST", { property, order }),
        SET_DASHBOARD_STOCK_VIEW: async (context, stockId) => context.commit("SET_DASHBOARD_STOCK_VIEW", { data: await axios.get("/api/dashboard/stock/view", { params: { stockId } }).then(response => response.data), stockId }),
        ORDER_DASHBOARD_STOCK_VIEW: (context, { property, order }) => context.commit("ORDER_DASHBOARD_STOCK_VIEW", { property, order }),
        INIT_DASHBOARD_EDIT_PROPERTIES: async context => await context.commit("INIT_DASHBOARD_EDIT_PROPERTIES", await axios.get("/api/submit/items").then(response => response.data)),
        SET_DASHBOARD_EDIT_EXIST_MATERIAL: async (context, { category, item }) => context.commit("SET_DASHBOARD_EDIT_EXIST_MATERIAL", await axios.get("/api/submit/isExistMaterial", { params: { category, item } }).then(response => response.data)),
        CLEAR_DASHBOARD_EDIT_EXIST_MATERIAL: context => context.commit("CLEAR_DASHBOARD_EDIT_EXIST_MATERIAL")
    }
}
