import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

import common from "./common";
import dashboard from "./dashboard";
import submit from "./submit";
import management from "./management";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ...common.state,
        ...dashboard.state,
        ...submit.state,
        ...management.state
    },
    getters: {
        ...common.getters,
        ...dashboard.getters,
        ...submit.getters,
        ...management.getters
    },
    mutations: {
        ...common.mutations,
        ...dashboard.mutations,
        ...submit.mutations,
        ...management.mutations
    },
    actions: {
        ...common.actions,
        ...dashboard.actions,
        ...submit.actions,
        ...management.actions
    }
});
