import axios from "axios";

export default {
    state: {
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
            },
            isExist: null
        }
    },
    getters: {

    },
    mutations: {
        INIT_SUBMIT_PROPERTIES: (state, properties) => {
            properties["categories"] = Object.keys(properties.materials);
            properties["categories"].sort();
            state.submit.properties = Object.freeze(properties);
            state.submit.data.workClass = properties.workClasses[0];
            state.submit.data.category = Object.keys(properties.materials)[0];
            state.submit.data.item = properties.materials[Object.keys(properties.materials)[0]][0];
            state.submit.data.unit = properties.units[0];
        },
        SET_SUBMIT_USER_INFO: (state, { workClass, workerName }) => [state.submit.data.workClass, state.submit.data.workerName] = [workClass, workerName],

        SET_SUBMIT_WORK_CLASS: (state, workClass) => [state.submit.data.workClass, state.submit.data.manualWorkClass] = [workClass, ""],
        SET_SUBMIT_WORKER_NAME: (state, workerName) => state.submit.data.workerName = workerName,
        SET_SUBMIT_CATEGORY: (state, category) => [state.submit.data.category, state.submit.data.item, state.submit.data.manualCategory] = [category, category !== "*" ? state.submit.properties.materials[category][0] : category, ""],
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
        SET_SUBMIT_EXIST_MATERIAL: (state, isExist) => state.submit.isExist = isExist === 1,
        CLEAR_SUBMIT_EXIST_MATERIAL: state => state.submit.isExist = null
    },
    actions: {
        INIT_SUBMIT_PROPERTIES: async context => await context.commit("INIT_SUBMIT_PROPERTIES", await axios.get("/api/submit/items").then(response => response.data)),
        SET_SUBMIT_USER_INFO: async context => await context.commit("SET_SUBMIT_USER_INFO", await axios.get("/api/submit/getUserInfo").then(response => response.data)),
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
        CLEAR_SUBMIT_FORM_DATA: context => context.commit("CLEAR_SUBMIT_FORM_DATA"),
        SET_SUBMIT_EXIST_MATERIAL: async (context, { category, item }) => context.commit("SET_SUBMIT_EXIST_MATERIAL", await axios.get("/api/submit/isExistMaterial", { params: { category, item } }).then(response => response.data)),
        CLEAR_SUBMIT_EXIST_MATERIAL: context => context.commit("CLEAR_SUBMIT_EXIST_MATERIAL")
    }
}
