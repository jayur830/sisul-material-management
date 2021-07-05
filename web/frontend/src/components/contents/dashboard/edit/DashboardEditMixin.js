import { mapState, mapActions } from "vuex";
import moment from "moment";
import { alert, confirm } from "../../../../common";
import axios from "axios";

export default {
    name: "DashboardEditMixin",
    data: () => ({
        src: {
            logTime: "",
            workClass: "",
            workerName: "",
            category: "",
            item: "",
            inOut: null,
            count: null,
            unit: "",
            files: [null, null, null]
        },
        date: "",
        time: "",
        workClass: "",
        workerName: "",
        category: "",
        item: "",
        inOut: null,
        count: null,
        unit: "",
        files: [null, null, null],
        manualWorkClass: "",
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
            if (!moment(this.date, "YYYY.MM.DD").isValid())
                await alert("잘못된 형식의 날짜입니다.");
            else if (!moment(this.time, "HH:mm:ss").isValid())
                await alert("잘못된 형식의 시간입니다.");
            else if (this.workClass === "*" && this.manualWorkClass === "")
                await alert("근무반(수기입력)을 입력하세요.");
            else if (this.workerName === "")
                await alert("작업자 성명을 입력하세요.");
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
                await new Promise((resolve, reject) => confirm("저장하시겠습니까?", resolve, reject));
                const formData = this.createFormData();

                this.files.forEach((file, i) => {
                    if (file) formData.append(`img${i + 1}`, file, file.name);
                });

                await axios.put("/api/dashboard/log/modify", formData, { headers: { "Content-Type": "multipart/form-data" } });
                await alert("저장되었습니다.");
                await this.$router.push("/dashboard");
            }
        },

        createFormData() {
            const formData = new FormData();
            formData.append("src", {
                logTime: this.src.logTime,
                workClass: this.src.workClass,
                workerName: this.src.workerName,
                category: this.src.category,
                item: this.src.item,
                inOut: this.src.inOut,
                count: this.src.count,
                unit: this.src.unit
            });
            formData.append("dst", {
                logTime: moment(`${this.date} ${this.time}`, "YYYY.MM.DD HH:mm:ss").format("YYYYMMDDHHmmss"),
                workClass: this.workClass === "*" ? this.manualWorkClass : this.workClass,
                workerName: this.workerName,
                category: this.category,
                item: this.item,
                inOut: this.inOut,
                count: this.count,
                unit: this.unit === "*" ? this.manualUnit : this.unit
            });

            return formData;
        }
    }
}
