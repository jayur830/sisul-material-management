import { mapActions, mapState } from "vuex";
import { alert, confirm } from "../../../common";
import moment from "moment";
import axios from "axios";

export default {
    name: "SubmitMixin",
    data:  () => ({
        imgFiles: ["", "", ""]
    }),
    computed: {
        ...mapState({
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
            manualUnit: state => state.submit.data.manualUnit
        })
    },
    methods: {
        ...mapActions({
            initProperties: "INIT_SUBMIT_PROPERTIES",
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
            clearFormData: "CLEAR_SUBMIT_FORM_DATA"
        }),

        async onLoadFile(e, index) {
            console.log(e.target.files);
            await this.setImgFile({
                index,
                file: e.target.files[0]
            });
        },

        submit() {
            if (this.workClass === "*" && this.manualWorkClass === "")
                alert("근무반(수기입력)을 입력하세요.");
            else if (this.workerName === "")
                alert("작업자 성명을 입력하세요.");
            else if (this.category === "*" && this.manualCategory === "")
                alert("자재 종류(수기입력)를 입력하세요.");
            else if (this.item === "*" && this.manualItem === "")
                alert("자재 제품명(수기입력)을 입력하세요.");
            else if (this.inOut == null)
                alert("입/출고를 선택하세요.");
            else if (this.count == null)
                alert("자재 수량을 입력하세요.");
            else if (this.count === 0)
                alert("1개 이상의 자재 수량을 입력하세요.");
            else if (this.unit === "*" && this.manualUnit === "")
                alert("단위(수기입력)를 입력하세요.");
            else if (!this.files[0] && !this.files[1] && !this.files[2])
                alert("한 장 이상의 현장 사진을 첨부하세요.");
            else confirm("저장하시겠습니까?", async () => {
                    const formData = new FormData();
                    formData.append('logTime', moment().format('YYYYMMDDhhmmss'));
                    formData.append('workClass', this.workClass === "*" ? this.manualWorkClass : this.workClass);
                    formData.append('workerName', this.workerName);
                    formData.append('category', this.category === "*" ? this.manualCategory : this.category);
                    formData.append('item', this.item === "*" ? this.manualItem : this.item);
                    formData.append('inOut', this.inOut);
                    formData.append('count', parseInt(this.count));
                    formData.append('unit', this.unit === "*" ? this.manualUnit : this.unit);

                    this.files.forEach((file, i) => {
                        if (file) formData.append(`img${i + 1}`, file, file.name);
                    });

                    await axios.post("/api/submit/submit", formData, { headers: { "Content-Type": "multipart/form-data" } });
                    await alert("저장되었습니다.");
                });
        }
    }
}
