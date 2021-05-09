import axios from "axios";

export default {
    state: {
        member: {
            isAuthenticated: false
        }
    },
    getters: {

    },
    mutations: {
        SIGN_IN: (state, signInResult) => {
            console.log(signInResult);
        }
    },
    actions: {
        SIGN_IN: async (context, { username, password }) => {
            const response = await axios.post("/api/member/signIn", { username, password }).then(response => response.data);
            context.commit("SIGN_IN", response);
        }
    }
}
