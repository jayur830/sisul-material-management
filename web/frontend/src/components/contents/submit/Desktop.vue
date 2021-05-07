<template>
    <div id="desktop-submit" class="animate__animated animate__fadeInRight">
        <div>
            <div>
                <table v-if="properties">
                    <colgroup>
                        <col style="width: 35%;" />
                        <col style="width: 65%;" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td>근무반</td>
                            <td>
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
                            <td>성명</td>
                            <td>
                                <label>
                                    <input type="text" :value="workerName" @keyup="setWorkerName($event.target.value)" />
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>자재 종류</td>
                            <td>
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
                            <td>자재 제품명</td>
                            <td>
                                <label>
                                    <select :value="item" @change="setItem($event.target.value)">
                                        <option :key="i" v-for="(item, i) in properties.items">{{ item }}</option>
                                        <option value="*">기타(수기입력)</option>
                                    </select>
                                </label>
                                <label v-show="item == '*'"><input type="text" @change="setManualItem($event.target.value)" /></label>
                            </td>
                        </tr>
                        <tr>
                            <td>입/출고</td>
                            <td>
                                <label><input type="button" :class="['btn', 'in', inOut == 0 ? 'on' : '']" value="입고" @click="setInOut(0)" /></label>
                                <label><input type="button" :class="['btn', 'out', inOut == 1 ? 'on' : '']" value="출고" @click="setInOut(1)" /></label>
                            </td>
                        </tr>
                        <tr>
                            <td>수량</td>
                            <td>
                                <label>
                                    <input type="number" :value="count" @keyup="setCount($event.target.value)" />
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>단위</td>
                            <td>
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
                            <td>사진 첨부</td>
                            <td>
                                <div class="file-field">
                                    <label for="file-1" v-text="files[0] !== '' ? (files[0].name.length > 30 ? files[0].name.substring(0, 27) + '...' : files[0].name) : '사진 업로드'"></label>
                                    <input type="file" id="file-1" @change="e => onLoadFile(e, 0)" />
                                </div>
                                <div class="file-field">
                                    <label for="file-2" v-text="files[1] !== '' ? (files[1].name.length > 30 ? files[1].name.substring(0, 27) + '...' : files[1].name) : '사진 업로드'"></label>
                                    <input type="file" id="file-2" @change="e => onLoadFile(e, 1)" />
                                </div>
                                <div class="file-field">
                                    <label for="file-3" v-text="files[2] !== '' ? (files[2].name.length > 30 ? files[2].name.substring(0, 27) + '...' : files[2].name) : '사진 업로드'"></label>
                                    <input type="file" id="file-3" @change="e => onLoadFile(e, 2)" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2">
                                <input type="button" class="btn" value="저장" @click="submit" />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    import moment from "moment";
    import axios from "axios";

    import { confirm, alert } from "../../../common";

    export default {
        name: "DesktopSubmit",
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
        },
        mounted() {
            this.initProperties();
        },
        destroyed() {
            this.clearFormData();
        }
    }
</script>

<style>
    @import "./Desktop.css";
</style>
