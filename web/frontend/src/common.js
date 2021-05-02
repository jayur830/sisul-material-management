import store from "./store";

export const alert = (title, onOk = () => null) => store.dispatch("SET_ALERT_VISIBLE", { show: true, title, okButtonText: "확인", onOk });
export const confirm = (title, onOk = () => null) => store.dispatch("SET_CONFIRM_VISIBLE", { show: true, title, okButtonText: "확인", cancelButtonText: "취소", onOk });
