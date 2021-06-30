<template>
    <div id="mobile">
        <div>
            <div>
                <div>
                    <table v-if="properties">
                        <colgroup>
                            <col style="width: 130px;" />
                            <col style="width: calc(100% - 130px);" />
                        </colgroup>
                        <tbody>
                        <tr>
                            <td class="animate__animated animate__fadeInLeft">근무반</td>
                            <td class="animate__animated animate__fadeInRight">
                                <label>
                                    <select :value="workClass" @change="setWorkClass($event.target.value)">
                                        <option :key="i" v-for="(workClass, i) in properties.workClasses" :value="workClass">{{ workClass }}</option>
                                        <option value="*">기타(수기입력)</option>
                                    </select>
                                </label>
                                <label v-show="workClass == '*'"><input type="text" @change="setManualWorkClass($event.target.value)" /></label>
                            </td>
                        </tr>
                        <tr>
                            <td class="animate__animated animate__fadeInLeft">성명</td>
                            <td class="animate__animated animate__fadeInRight">
                                <label>
                                    <input type="text" :value="workerName" @keyup="setWorkerName($event.target.value)" />
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td class="animate__animated animate__fadeInLeft">자재 종류</td>
                            <td class="animate__animated animate__fadeInRight">
                                <label>
                                    <select :value="category" @change="setCategory($event.target.value)">
                                        <option :key="i" v-for="(category, i) in properties.categories">{{ category }}</option>
                                        <option value="*">기타(수기입력)</option>
                                    </select>
                                </label>
                                <label v-show="category == '*'"><input type="text" @change="setManualCategory($event.target.value)" /></label>
                            </td>
                        </tr>
                        <tr>
                            <td class="animate__animated animate__fadeInLeft">자재 제품명</td>
                            <td class="animate__animated animate__fadeInRight" v-if="category != '*'">
                                <label>
                                    <select :value="item" @change="setItem($event.target.value)">
                                        <option :key="i" v-for="(item, i) in properties.materials[category]">{{ item }}</option>
                                        <option value="*">기타(수기입력)</option>
                                    </select>
                                </label>
                                <label v-show="item == '*'"><input type="text" @change="setManualItem($event.target.value)" /></label>
                            </td>
                            <td v-else>
                                <input type="text" @change="setManualItem($event.target.value)" />
                            </td>
                        </tr>
                        <tr>
                            <td class="animate__animated animate__fadeInLeft">입/출고</td>
                            <td class="animate__animated animate__fadeInRight">
                                <label><input type="button" :class="['btn', 'in', inOut == 0 ? 'on' : '']" value="입고" @click="setInOut(0)" /></label>
                                <label><input type="button" :class="['btn', 'out', inOut == 1 ? 'on' : '']" value="출고" @click="setInOut(1)" /></label>
                            </td>
                        </tr>
                        <tr>
                            <td class="animate__animated animate__fadeInLeft">수량</td>
                            <td class="animate__animated animate__fadeInRight">
                                <label>
                                    <input type="number" :value="count" @keyup="setCount($event.target.value)" />
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td class="animate__animated animate__fadeInLeft">단위</td>
                            <td class="animate__animated animate__fadeInRight">
                                <label>
                                    <select :value="unit" @change="setUnit($event.target.value)">
                                        <option :key="i" v-for="(unit, i) in properties.units">{{ unit }}</option>
                                        <option value="*">기타(수기입력)</option>
                                    </select>
                                </label>
                                <label v-show="unit == '*'"><input type="text" @change="setManualUnit($event.target.value)" /></label>
                            </td>
                        </tr>
                        <tr>
                            <td class="animate__animated animate__fadeInLeft">사진 첨부</td>
                            <td>
                                <div class="file-field animate__animated animate__fadeInRight">
                                    <label for="file-1" v-text="files[0] && files[0] !== '' ? (files[0].name.length > 20 ? files[0].name.substring(0, 17) + '...' : files[0].name) : '사진 업로드'"></label>
                                    <input type="file" id="file-1" accept="image/jpeg" @change="e => onLoadFile(e, 0)" />
                                </div>
                                <div class="file-field animate__animated animate__fadeInRight" style="animation-delay: 0.1s;">
                                    <label for="file-2" v-text="files[1] && files[1] !== '' ? (files[1].name.length > 20 ? files[1].name.substring(0, 17) + '...' : files[1].name) : '사진 업로드'"></label>
                                    <input type="file" id="file-2" accept="image/jpeg" @change="e => onLoadFile(e, 1)" />
                                </div>
                                <div class="file-field animate__animated animate__fadeInRight" style="animation-delay: 0.2s;">
                                    <label for="file-3" v-text="files[2] && files[2] !== '' ? (files[2].name.length > 20 ? files[2].name.substring(0, 17) + '...' : files[2].name) : '사진 업로드'"></label>
                                    <input type="file" id="file-3" accept="image/jpeg" @change="e => onLoadFile(e, 2)" />
                                </div>
                            </td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="2" class="animate__animated animate__fadeInUp">
                                <input type="button" class="btn" value="담당자 전송" @click="submit" />
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
        <alert v-show="alert.show"
               :title="alert.title"
               :ok-button-text="alert.okButtonText"
               @ok="alert.onOk" />
        <confirm v-show="confirm.show"
                 :title="confirm.title"
                 :ok-button-text="confirm.okButtonText"
                 :cancel-button-text="confirm.cancelButtonText"
                 @ok="confirm.onOk"
                 @cancel="confirm.onCancel" />
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    import { alert, confirm } from "./common";
    import axios from "axios";
    import moment from "moment";

    import Alert from "./components/common/Alert";
    import Confirm from "./components/common/Confirm";

    export default {
        name: "Mobile",
        components: {
            Alert,
            Confirm
        },
        data:  () => ({
            imgFiles: ["", "", ""]
        }),
        computed: {
            ...mapState({
                alert: state => state.common.alert,
                confirm: state => state.common.confirm,
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
                if (this.workClass == "*" && this.manualWorkClass == "") {
                    console.log("workClass");
                    await alert("근무반(수기입력)을 입력하세요.");
                } else if (this.workerName == "") {
                    console.log("workerName");
                    await alert("작업자 성명을 입력하세요.");
                } else if (this.category == "*" && this.manualCategory == "") {
                    console.log("category");
                    await alert("자재 종류(수기입력)를 입력하세요.");
                } else if (this.item == "*" && this.manualItem == "") {
                    console.log("item");
                    await alert("자재 제품명(수기입력)을 입력하세요.");
                } else if (this.inOut == null) {
                    console.log("inOut");
                    await alert("입/출고를 선택하세요.");
                } else if (this.count == null) {
                    console.log("count");
                    await alert("자재 수량을 입력하세요.");
                } else if (this.count == 0) {
                    console.log("count == 0");
                    await alert("1개 이상의 자재 수량을 입력하세요.");
                } else if (this.unit == "*" && this.manualUnit == "") {
                    console.log("unit");
                    await alert("단위(수기입력)를 입력하세요.");
                } else if (!this.files[0] && !this.files[1] && !this.files[2]) {
                    console.log("files");
                    await alert("한 장 이상의 현장 사진을 첨부하세요.");
                } else {
                    console.log("result");
                    await new Promise(resolve => confirm("담당자에게 전송하시겠습니까?", resolve));
                    const formData = this.createFormData();

                    this.files.forEach((file, i) => {
                        if (file) formData.append(`img${i + 1}`, file, file.name);
                    });

                    await axios.post("/api/submit/submit", formData, { headers: { "Content-Type": "multipart/form-data" } });
                    await alert("담당자에게 성공적으로 전송되었습니다.");
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
        },
        mounted() {
            this.initProperties();
            if (this.isAuthenticated && this.isConfirmed) this.setUserInfo();
        },
        destroyed() {
            this.clearFormData();
        }
    }
</script>

<style>
    #mobile {
        width: 100%;
        height: 100%;
        background-color: #f2f2f2;
        overflow-x: hidden;
    }

    #mobile * {
        touch-action: none;
    }

    #mobile > div {
        width: 100%;
        height: 100%;
        display: table;
    }

    #mobile > div > div {
        display: table-cell;
        vertical-align: middle;
    }

    #mobile > div > div > div {
        width: 100%;
        margin: 0 auto;
    }

    #mobile select {
        width: 100%;
        height: 30px;
        padding: 0 20px;
        font: 12pt 'NanumSquare_acB', serif;
        outline: none;
    }

    #mobile input[type=text],
    #mobile input[type=number] {
        width: calc(100% - 44px);
        height: 25px;
        padding: 0 20px;
        font: 12pt 'NanumSquare_acB', serif;
        outline: none;
    }

    #mobile input[type=button].btn {
        width: calc(50% - 5px);
        font: 12pt 'NanumSquare_acB';
        padding: 5px 0;
        border-radius: 5px;
        transition: background-color 0.2s;
    }

    #mobile table tbody input[type=button].btn.in {
        margin-right: 5px;
    }

    #mobile table tbody input[type=button].btn.out {
        margin-left: 5px;
    }

    #mobile table tbody input[type=button].btn.on {
        background-color: #0070c0;
    }

    #mobile table {
        width: 100%;
    }

    #mobile table tbody td {
        padding: 8px 10px;
    }

    #mobile table tbody td:first-child {
        vertical-align: top;
        text-align: right;
        font: 13pt 'NanumSquareB';
    }

    #mobile table tbody td div.file-field {
        position: relative;
        margin-bottom: 10px;
    }

    #mobile table tbody td div.file-field > label {
        position: absolute;
        width: calc(100% - 2px);
        padding: 5px 0;
        border-radius: 5px;
        text-align: center;
        font: 13pt 'NanumSquare_acB';
        color: #e7e6e6;
        background-color: #262626;
        z-index: 9;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    #mobile table tbody td div.file-field > label:hover {
        background-color: #3b3b3b;
    }

    #mobile table tbody td div.file-field > label:active {
        background-color: #1d1d1d;
    }

    #mobile table tbody td div.file-field input[type=file] {
        position: relative;
        top: 2px;
        left: 40px;
        outline: none;
    }

    #mobile table tfoot td {
        text-align: center;
        padding: 15px 0;
    }

    #mobile table tfoot input[type=button].btn {
        width: calc(100% - 30px);
        padding: 10px 0;
        border-radius: 10px;
        background-color: #0070c0;
        color: white;
        font: 14pt 'NanumSquare_acB';
        transition: background-color 0.2s;
    }

    #mobile table tfoot input[type=button]:hover {
        background-color: #3e9bd0;
    }

    #mobile table tfoot input[type=button]:active {
        background-color: #0064aa;
    }
</style>
