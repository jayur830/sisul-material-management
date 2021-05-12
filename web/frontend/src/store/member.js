import axios from "axios";

export default {
    state: {
        member: {
            isAuthenticated: false,
            isAdmin: false,
            signUp: {
                workClasses: null,
            },
            findUsername: {
                workClasses: null,
            }
        }
    },
    getters: {

    },
    mutations: {
        SET_AUTHENTICATED: (state, { isAuthenticated, isAdmin }) => [state.member.isAuthenticated, state.member.isAdmin] = [isAuthenticated, isAdmin],

        LOGIN: (state, loginResult) => {
            console.log(loginResult);
            if (loginResult.username) state.member.isAuthenticated = true;
        },

        SET_MEMBER_SIGN_UP_WORK_CLASSES: (state, workClasses) => state.member.signUp.workClasses = Object.freeze(workClasses),

        SET_MEMBER_FIND_USERNAME_WORK_CLASSES: (state, workClasses) => state.member.findUsername.workClasses = Object.freeze(workClasses)
    },
    actions: {
        SET_AUTHENTICATED: async context => context.commit("SET_AUTHENTICATED", await axios.get("/api/member/isAuthenticated").then(response => response.data)),

        LOGIN: async (context, { username, password }) => {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            const response = await axios.post("/api/member/login", formData).then(response => response.data);
            context.commit("LOGIN", response);
        },

        SET_MEMBER_SIGN_UP_WORK_CLASSES: async context => context.commit("SET_MEMBER_SIGN_UP_WORK_CLASSES", await axios.get("/api/member/getWorkClasses").then(response => response.data)),

        SET_MEMBER_FIND_USERNAME_WORK_CLASSES: async context => context.commit("SET_MEMBER_FIND_USERNAME_WORK_CLASSES", await axios.get("/api/member/getWorkClasses").then(response => response.data)),
    }
}
