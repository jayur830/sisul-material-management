<template>
    <div id="submit">
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
                                    <input type="text" :value="workerName" @change="setWorkerName($event.target.value)" />
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
                                    <input type="text" :value="count" @change="setCount($event.target.value)" />
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
                                    <label for="file-1" v-text="files[0] !== '' ? files[0].name : '사진 업로드'"></label>
                                    <input type="file" id="file-1" capture="camera" @click="e => onLoadFile(e, 0)" />
                                </div>
                                <div class="file-field">
                                    <label for="file-2" v-text="files[1] !== '' ? files[1].name : '사진 업로드'"></label>
                                    <input type="file" id="file-2" capture="camera" @change="e => onLoadFile(e, 1)" />
                                </div>
                                <div class="file-field">
                                    <label for="file-3" v-text="files[2] !== '' ? files[2].name : '사진 업로드'"></label>
                                    <input type="file" id="file-3" capture="camera" @change="e => onLoadFile(e, 2)" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2">
                                <input type="button" class="btn" value="담당자 전송" />
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

    export default {
        name: "Submit",
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
                files: state => state.submit.data.files
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
                setManualUnit: "SET_SUBMIT_MANUAL_UNIT"
            }),

            onLoadFile(e, index) {
                console.log(e.target.files);
                this.setImgFile({
                    index,
                    file: e.target.files[0]
                });
            }
        },
        mounted() {
            this.initProperties();
        }
    }
</script>

<style>
    @import "./Submit.css";
</style>
