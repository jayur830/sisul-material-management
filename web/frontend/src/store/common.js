export default {
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
                onOk: () => null
            },
            prompt: {
                show: false,
                title: "",
                defaultValue: "",
                okButtonText: "",
                cancelButtonText: "",
                onOk: () => null
            }
        }
    },
    getters: {

    },
    mutations: {
        SET_WINDOW_SIZE: (state, { width, height }) => [state.common.windowWidth, state.common.windowHeight] = [width, height],
        SET_ALERT_INVISIBLE: state => state.common.alert = { show: false, title: "", okButtonText: "", onOk: () => null },
        SET_ALERT_VISIBLE: (state, alert) => state.common.alert = alert,
        SET_CONFIRM_INVISIBLE: state => state.common.confirm = { show: false, title: "", okButtonText: "", cancelButtonText: "", onOk: () => null },
        SET_CONFIRM_VISIBLE: (state, confirm) => state.common.confirm = confirm,
        SET_PROMPT_INVISIBLE: state => state.common.prompt = { show: false, title: "", defaultValue: "", okButtonText: "", cancelButtonText: "", onOk: () => null },
        SET_PROMPT_VISIBLE: (state, prompt) => state.common.prompt = prompt
    },
    actions: {
        SET_WINDOW_SIZE: (context, { width, height }) => context.commit("SET_WINDOW_SIZE", { width, height }),
        SET_ALERT_INVISIBLE: context => context.commit("SET_ALERT_INVISIBLE"),
        SET_ALERT_VISIBLE: (context, alert) => context.commit("SET_ALERT_VISIBLE", alert),
        SET_CONFIRM_INVISIBLE: context => context.commit("SET_CONFIRM_INVISIBLE"),
        SET_CONFIRM_VISIBLE: (context, confirm) => context.commit("SET_CONFIRM_VISIBLE", confirm),
        SET_PROMPT_INVISIBLE: context => context.commit("SET_PROMPT_INVISIBLE"),
        SET_PROMPT_VISIBLE: (context, prompt) => context.commit("SET_PROMPT_VISIBLE", prompt)
    }
}
