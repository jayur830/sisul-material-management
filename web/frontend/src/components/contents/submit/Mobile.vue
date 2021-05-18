<template>
    <div id="mobile-submit">
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
                                    <label for="file-1" v-text="files[0] ? (files[0].name.length > 20 ? files[0].name.substring(0, 17) + '...' : files[0].name) : '사진 업로드'"></label>
                                    <input type="file" id="file-1" accept="image/jpeg" @change="e => onLoadFile(e, 0)" />
                                </div>
                                <div class="file-field animate__animated animate__fadeInRight" style="animation-delay: 0.1s;">
                                    <label for="file-2" v-text="files[1] ? (files[1].name.length > 20 ? files[1].name.substring(0, 17) + '...' : files[1].name) : '사진 업로드'"></label>
                                    <input type="file" id="file-2" accept="image/jpeg" @change="e => onLoadFile(e, 1)" />
                                </div>
                                <div class="file-field animate__animated animate__fadeInRight" style="animation-delay: 0.2s;">
                                    <label for="file-3" v-text="files[2] ? (files[2].name.length > 20 ? files[2].name.substring(0, 17) + '...' : files[2].name) : '사진 업로드'"></label>
                                    <input type="file" id="file-3" accept="image/jpeg" @change="e => onLoadFile(e, 2)" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2" class="animate__animated animate__fadeInUp">
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
        name: "MobileSubmit",
        mixins: [SubmitMixin],
        mounted() {
            this.initProperties();
            if (this.isAuthenticated) this.setUserInfo();
        },
        destroyed() {
            this.clearFormData();
        }
    }
</script>

<style>
    @import "./Mobile.css";
</style>
