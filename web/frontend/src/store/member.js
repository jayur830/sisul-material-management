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
            },
            myPage: {
                workClasses: null,
                src: {
                    username: "",
                    password: "",
                    workClass: "",
                    workerName: "",
                    email: ""
                },
                dst: {
                    username: "",
                    password: "",
                    workClass: "",
                    workerName: "",
                    email: ""
                }
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

        SET_MEMBER_FIND_USERNAME_WORK_CLASSES: (state, workClasses) => state.member.findUsername.workClasses = Object.freeze(workClasses),

        SET_MEMBER_MY_PAGE_WORK_CLASSES: (state, workClasses) => state.member.myPage.workClasses = Object.freeze(workClasses),
        SET_MEMBER_MY_PAGE_DATA: (state, data) => {
            console.log(data);
            [state.member.myPage.src.username, state.member.myPage.dst.username] = [data.username, data.username];
            [state.member.myPage.src.password, state.member.myPage.dst.password] = [data.password, data.password];
            [state.member.myPage.src.workClass, state.member.myPage.dst.workClass] = [data.workClass, data.workClass];
            [state.member.myPage.src.workerName, state.member.myPage.dst.workerName] = [data.workerName, data.workerName];
            [state.member.myPage.src.email, state.member.myPage.dst.email] = [data.email, data.email];
        },
        SET_MEMBER_MY_PAGE_WORK_CLASS: (state, workClass) => state.member.myPage.dst.workClass = workClass,
        SET_MEMBER_MY_PAGE_WORKER_NAME: (state, workerName) => state.member.myPage.dst.workerName = workerName,
        SET_MEMBER_MY_PAGE_EMAIL: (state, email) => state.member.myPage.dst.email = email
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

        SET_MEMBER_MY_PAGE_WORK_CLASSES: async context => context.commit("SET_MEMBER_MY_PAGE_WORK_CLASSES", await axios.get("/api/member/getWorkClasses").then(response => response.data)),
        SET_MEMBER_MY_PAGE_DATA: async context => context.commit("SET_MEMBER_MY_PAGE_DATA", await axios.get("/api/member/getLoggedInMember").then(response => response.data)),
        SET_MEMBER_MY_PAGE_WORK_CLASS: (context, workClass)  => context.commit("SET_MEMBER_MY_PAGE_WORK_CLASS", workClass),
        SET_MEMBER_MY_PAGE_WORKER_NAME: (context, workerName)  => context.commit("SET_MEMBER_MY_PAGE_WORKER_NAME", workerName),
        SET_MEMBER_MY_PAGE_EMAIL: (context, email)  => context.commit("SET_MEMBER_MY_PAGE_EMAIL", email)
    }
}
