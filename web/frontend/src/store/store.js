import Vue from "vue";
import Vuex from "vuex";

import common from "./common";
import dashboard from "./dashboard";
import submit from "./submit";
import material from "./material";
import management from "./management";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ...common.state,
        ...dashboard.state,
        ...submit.state,
        ...material.state,
        ...management.state
    },
    getters: {
        ...common.getters,
        ...dashboard.getters,
        ...submit.getters,
        ...material.getters,
        ...management.getters
    },
    mutations: {
        ...common.mutations,
        ...dashboard.mutations,
        ...submit.mutations,
        ...material.mutations,
        ...management.mutations
    },
    actions: {
        ...common.actions,
        ...dashboard.actions,
        ...submit.actions,
        ...material.actions,
        ...management.actions
    }
});
