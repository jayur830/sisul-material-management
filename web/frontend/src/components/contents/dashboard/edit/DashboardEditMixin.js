import { mapState, mapActions } from "vuex";
import moment from "moment";
import { alert, confirm, prompt } from "../../../../common";
import axios from "axios";

export default {
    name: "DashboardEditMixin",
    data: () => ({
        logTime: "",
        workClass: "",
        workerName: "",
        category: "",
        item: "",
        inOut: null,
        count: null,
        unit: "",
        files: [null, null, null],
        manualWorkClass: "",
        manualCategory: "",
        manualItem: "",
        manualUnit: ""
    }),
    computed: {
        ...mapState({
            properties: state => state.dashboard.edit.properties,
            isExist: state => state.dashboard.edit.isExist
        })
    },
    methods: {
        ...mapActions({
            initProperties: "INIT_DASHBOARD_EDIT_PROPERTIES",
            setIsExist: "SET_DASHBOARD_EDIT_EXIST_MATERIAL",
            clearIsExistVariable: "CLEAR_DASHBOARD_EDIT_EXIST_MATERIAL"
        }),

        toLogTime(datetime, srcFormat, dstFormat) {
            return moment(datetime, srcFormat).format(dstFormat);
        },

        async onLoadFile(e, index) {
            let files = this.files.concat();
            files[index] = e.target.files[0];
            this.files = Object.freeze(files);
        },

        async modify() {
            if (this.workClass === "*" && this.manualWorkClass === "")
                await alert("근무반(수기입력)을 입력하세요.");
            else if (this.workerName === "")
                await alert("작업자 성명을 입력하세요.");
            else if (this.category === "*" && this.manualCategory === "")
                await alert("자재 종류(수기입력)를 입력하세요.");
            else if (this.item === "*" && this.manualItem === "")
                await alert("자재 제품명(수기입력)을 입력하세요.");
            else if (this.inOut == null)
                await alert("입/출고를 선택하세요.");
            else if (this.count == null)
                await alert("자재 수량을 입력하세요.");
            else if (this.count === 0)
                await alert("1개 이상의 자재 수량을 입력하세요.");
            else if (this.unit === "*" && this.manualUnit === "")
                await alert("단위(수기입력)를 입력하세요.");
            else if (!this.files[0] && !this.files[1] && !this.files[2])
                await alert("한 장 이상의 현장 사진을 첨부하세요.");
            else {
                if (this.category === "*" || this.item === "*")
                    await this.setIsExist({
                        category: this.manualCategory,
                        item: this.manualItem
                    });

                if (this.isExist == false) {
                    await this.clearIsExistVariable();
                    await new Promise(resolve => confirm("등록되지 않은 자재입니다.\n추가하시겠습니까?", resolve));
                    // eslint-disable-next-line no-unused-vars
                    let initCount = 0;
                    // eslint-disable-next-line no-constant-condition
                    while (true) {
                        const promptText = await new Promise(resolve => prompt("초기 재고량을 입력해주세요.", "0", resolve));
                        if (!/^[0-9]/g.test(promptText))
                            await new Promise(resolve => alert("숫자만 입력해주세요.", resolve));
                        else {
                            initCount = parseInt(promptText);
                            break;
                        }
                    }

                    await confirm("입력하신 내용으로\n저장하시겠습니까?", async () => {
                        const formData = this.createFormData();

                        this.files.forEach((file, i) => {
                            if (file) formData.append(`img${i + 1}`, file, file.name);
                        });

                        await axios.put("/api/submit/addMaterial", {
                            category: this.category === "*" ? this.manualCategory : this.category,
                            item: this.item === "*" ? this.manualItem : this.item,
                            initCount: initCount
                        });
                        await axios.put("/api/dashboard/log/modify", formData, { headers: { "Content-Type": "multipart/form-data" } });
                        await alert("저장되었습니다.");
                        await this.$router.push("/dashboard");
                    });
                } else await confirm("저장하시겠습니까?", async () => {
                    const formData = this.createFormData();

                    this.files.forEach((file, i) => {
                        if (file) formData.append(`img${i + 1}`, file, file.name);
                    });

                    await axios.put("/api/dashboard/log/modify", formData, { headers: { "Content-Type": "multipart/form-data" } });
                    await alert("저장되었습니다.");
                    await this.$router.push("/dashboard");
                });
            }
        },

        createFormData() {
            const formData = new FormData();
            formData.append("logTime", this.logTime);
            formData.append("workClass", this.workClass === "*" ? this.manualWorkClass : this.workClass);
            formData.append("workerName", this.workerName);
            formData.append("category", this.category === "*" ? this.manualCategory : this.category);
            formData.append("item", this.item === "*" ? this.manualItem : this.item);
            formData.append("inOut", this.inOut);
            formData.append("count", this.count);
            formData.append("unit", this.unit === "*" ? this.manualUnit : this.unit);

            return formData;
        }
    }
}
