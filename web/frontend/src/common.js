import xlsx from "xlsx";

import store from "./store/store";

export const alert = (title, onOk = () => null) => store.dispatch("SET_ALERT_VISIBLE", { show: true, title, okButtonText: "확인", onOk });
export const confirm = (title, onOk = () => null, onCancel = () => null, okButtonText = "확인", cancelButtonText = "취소") => store.dispatch("SET_CONFIRM_VISIBLE", { show: true, title, okButtonText, cancelButtonText, onOk, onCancel });
export const prompt = (title, defaultValue, onOk = () => null, onCancel = () => null, okButtonText = "확인", cancelButtonText = "취소") => store.dispatch("SET_PROMPT_VISIBLE", { show: true, title, defaultValue, okButtonText, cancelButtonText, onOk, onCancel });

export const downloadExcel = (data, sheetName, fileName) => {
    const book = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(
        book,
        xlsx.utils.json_to_sheet(data),
        sheetName);
    xlsx.writeFile(book, fileName);
};

export const sleep = async milliseconds => await new Promise(resolve => setTimeout(resolve, milliseconds));

export const execAsync = async (...api) => {
    let count = 0;
    for (let i = 0; i < api.length; ++i)
        (async () => {
            try {
                await api[i]();
            } catch (e) {e;} finally {
                ++count;
            }
        })();
    while (count !== api.length)
        await sleep(10);
};
