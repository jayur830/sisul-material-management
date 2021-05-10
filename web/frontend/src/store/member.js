import axios from "axios";

export default {
    state: {
        member: {
            isAuthenticated: false,
            signUp: {
                workClasses: null,
            }
        }
    },
    getters: {

    },
    mutations: {
        SIGN_IN: (state, signInResult) => {
            console.log(signInResult);
        },

        SET_MEMBER_SIGN_UP_WORK_CLASSES: (state, workClasses) => state.member.signUp.workClasses = Object.freeze(workClasses),
    },
    actions: {
        SIGN_IN: async (context, { username, password }) => {
            const response = await axios.post("/api/member/signIn", { username, password }).then(response => response.data);
            context.commit("SIGN_IN", response);
        },

        SET_MEMBER_SIGN_UP_WORK_CLASSES: async context => context.commit("SET_MEMBER_SIGN_UP_WORK_CLASSES", await axios.get("/api/member/getWorkClasses").then(response => response.data)),
    }
}
