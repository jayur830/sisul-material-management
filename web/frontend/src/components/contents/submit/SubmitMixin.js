import { mapActions, mapState } from "vuex";
import { alert, confirm, prompt } from "../../../common";
import moment from "moment";
import axios from "axios";

export default {
    name: "SubmitMixin",
    data:  () => ({
        imgFiles: ["", "", ""]
    }),
    computed: {
        ...mapState({
            isAuthenticated: state => state.member.isAuthenticated,
            isConfirmed: state => state.member.isConfirmed,
            properties: state => state.submit.properties,
            workClass: state => state.submit.data.workClass,
            workerName: state => state.submit.data.workerName,
            category: state => state.submit.data.category,
            item: state => state.submit.data.item,
            inOut: state => state.submit.data.inOut,
            count: state => state.submit.data.count,
            unit: state => state.submit.data.unit,
            files: state => state.submit.data.files,
            manualWorkClass: state => state.submit.data.manualWorkClass,
            manualCategory: state => state.submit.data.manualCategory,
            manualItem: state => state.submit.data.manualItem,
            manualUnit: state => state.submit.data.manualUnit,
            isExist: state => state.submit.isExist
        })
    },
    methods: {
        ...mapActions({
            initProperties: "INIT_SUBMIT_PROPERTIES",
            setUserInfo: "SET_SUBMIT_USER_INFO",
            setWorkClass: "SET_SUBMIT_WORK_CLASS",
            setWorkerName: "SET_SUBMIT_WORKER_NAME",
            setCategory: "SET_SUBMIT_CATEGORY",
            setItem: "SET_SUBMIT_ITEM",
            setInOut: "SET_SUBMIT_SELECTED_IN_OUT",
            setCount: "SET_SUBMIT_COUNT",
            setUnit: "SET_SUBMIT_UNIT",
            setImgFile: "SET_SUBMIT_IMG_FILE",
            setManualWorkClass: "SET_SUBMIT_MANUAL_WORK_CLASS",
            setManualCategory: "SET_SUBMIT_MANUAL_CATEGORY",
            setManualItem: "SET_SUBMIT_MANUAL_ITEM",
            setManualUnit: "SET_SUBMIT_MANUAL_UNIT",
            clearFormData: "CLEAR_SUBMIT_FORM_DATA",
            setIsExist: "SET_SUBMIT_EXIST_MATERIAL",
            clearIsExistVariable: "CLEAR_SUBMIT_EXIST_MATERIAL"
        }),

        async onLoadFile(e, index) {
            await this.setImgFile({
                index,
                file: e.target.files[0]
            });
        },

        async submit() {
            if (this.workClass == "*" && this.manualWorkClass == "")
                await alert("?????????(????????????)??? ???????????????.");
            else if (this.workerName == "")
                await alert("????????? ????????? ???????????????.");
            else if (this.category == "*" && this.manualCategory == "")
                await alert("?????? ??????(????????????)??? ???????????????.");
            else if (this.item == "*" && this.manualItem == "")
                await alert("?????? ?????????(????????????)??? ???????????????.");
            else if (this.inOut == null)
                await alert("???/????????? ???????????????.");
            else if (this.count == null)
                await alert("?????? ????????? ???????????????.");
            else if (this.count == 0)
                await alert("1??? ????????? ?????? ????????? ???????????????.");
            else if (this.unit == "*" && this.manualUnit == "")
                await alert("??????(????????????)??? ???????????????.");
            else if (!this.files[0] && !this.files[1] && !this.files[2])
                await alert("??? ??? ????????? ?????? ????????? ???????????????.");
            else {
                if (this.category == "*")
                    await this.setIsExist({
                        category: this.manualCategory,
                        item: this.manualItem
                    });
                else if (this.category != "*" && this.item == "*")
                    await this.setIsExist({
                        category: this.category,
                        item: this.manualItem
                    });

                if (this.isExist == false) {
                    await this.clearIsExistVariable();
                    await new Promise(resolve => confirm("???????????? ?????? ???????????????.\n?????????????????????????", resolve));
                    // eslint-disable-next-line no-unused-vars
                    let initCount = 0;
                    // eslint-disable-next-line no-constant-condition
                    while (true) {
                        const promptText = await new Promise(resolve => prompt("?????? ???????????? ??????????????????.", "0", resolve));
                        if (!/^[0-9]/g.test(promptText))
                            await new Promise(resolve => alert("????????? ??????????????????.", resolve));
                        else {
                            initCount = parseInt(promptText);
                            break;
                        }
                    }

                    await confirm("???????????? ????????????\n?????????????????????????", async () => {
                        const formData = this.createFormData();

                        this.files.forEach((file, i) => {
                            if (file) formData.append(`img${i + 1}`, file, file.name);
                        });

                        await axios.post("/api/submit/addMaterial", {
                            category: this.category == "*" ? this.manualCategory : this.category,
                            item: this.item == "*" ? this.manualItem : this.item,
                            initCount: initCount
                        });
                        await axios.post("/api/submit/submit", formData, { headers: { "Content-Type": "multipart/form-data" } });
                        await alert("?????????????????????.");
                    });
                } else await confirm("?????????????????????????", async () => {
                    const formData = this.createFormData();

                    this.files.forEach((file, i) => {
                        if (file) formData.append(`img${i + 1}`, file, file.name);
                    });

                    await axios.post("/api/submit/submit", formData, { headers: { "Content-Type": "multipart/form-data" } });
                    await alert("?????????????????????.");
                });
            }
        },

        createFormData() {
            const formData = new FormData();
            formData.append("logTime", moment().format("YYYYMMDDhhmmss"));
            formData.append("workClass", this.workClass == "*" ? this.manualWorkClass : this.workClass);
            formData.append("workerName", this.workerName);
            formData.append("category", this.category == "*" ? this.manualCategory : this.category);
            formData.append("item", this.item == "*" ? this.manualItem : this.item);
            formData.append("inOut", this.inOut);
            formData.append("count", parseInt(this.count));
            formData.append("unit", this.unit == "*" ? this.manualUnit : this.unit);

            return formData;
        }
    }
}
