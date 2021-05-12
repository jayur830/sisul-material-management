import xlsx from "xlsx";

import store from "./store/store";

export const alert = (title, onOk = () => null) => store.dispatch("SET_ALERT_VISIBLE", { show: true, title, okButtonText: "확인", onOk });
export const confirm = (title, onOk = () => null, onCancel = () => null, okButtonText = "확인", cancelButtonText = "취소") => store.dispatch("SET_CONFIRM_VISIBLE", { show: true, title, okButtonText, cancelButtonText, onOk, onCancel });
export const prompt = (title, defaultValue, onOk = () => null) => store.dispatch("SET_PROMPT_VISIBLE", { show: true, title, defaultValue, okButtonText: "확인", cancelButtonText: "취소", onOk });

export const downloadExcel = (data, sheetName, fileName) => {
    const book = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(
        book,
        xlsx.utils.json_to_sheet(data),
        sheetName);
    xlsx.writeFile(book, fileName);
};
