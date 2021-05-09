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
                            <td v-if="category != '*'">
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
                                    <label for="file-1" v-text="files[0] !== '' ? (files[0].name.length > 25 ? files[0].name.substring(0, 22) + '...' : files[0].name) : '사진 업로드'"></label>
                                    <input type="file" id="file-1" @change="e => onLoadFile(e, 0)" />
                                </div>
                                <div class="file-field">
                                    <label for="file-2" v-text="files[1] !== '' ? (files[1].name.length > 25 ? files[1].name.substring(0, 22) + '...' : files[1].name) : '사진 업로드'"></label>
                                    <input type="file" id="file-2" @change="e => onLoadFile(e, 1)" />
                                </div>
                                <div class="file-field">
                                    <label for="file-3" v-text="files[2] !== '' ? (files[2].name.length > 25 ? files[2].name.substring(0, 22) + '...' : files[2].name) : '사진 업로드'"></label>
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
    import SubmitMixin from "./SubmitMixin";

    export default {
        name: "DesktopSubmit",
        mixins: [SubmitMixin],
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
