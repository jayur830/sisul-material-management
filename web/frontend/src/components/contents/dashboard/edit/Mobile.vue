<template>
    <div id="mobile-dashboard-edit">
        <div>
            <div>
                <table v-if="properties">
                    <colgroup>
                        <col style="width: 115px;" />
                        <col style="width: calc(100% - 115px);" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td class="animate__animated animate__fadeInLeft">시간</td>
                            <td class="animate__animated animate__fadeInRight" style="font: 13pt 'NanumSquare_acB';">
                                <date-picker v-model="date" :value="date" valueType="format" format="YYYY.MM.DD" />
                                <time-picker v-model="time" format="HH:mm:ss" />
                            </td>
                        </tr>
                        <tr>
                            <td class="animate__animated animate__fadeInLeft">근무반</td>
                            <td class="animate__animated animate__fadeInRight">
                                <label>
                                    <select v-model="workClass">
                                        <option :key="i" v-for="(workClass, i) in properties.workClasses" :value="workClass">{{ workClass }}</option>
                                        <option value="*">기타(수기입력)</option>
                                    </select>
                                </label>
                                <label v-show="workClass === '*'"><input type="text" v-model="manualWorkClass" /></label>
                            </td>
                        </tr>
                        <tr>
                            <td class="animate__animated animate__fadeInLeft">성명</td>
                            <td class="animate__animated animate__fadeInRight">
                                <label>
                                    <input type="text" v-model="workerName" />
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td class="animate__animated animate__fadeInLeft">자재 종류</td>
                            <td class="animate__animated animate__fadeInRight">{{ category }}</td>
                        </tr>
                        <tr>
                            <td class="animate__animated animate__fadeInLeft">자재 제품명</td>
                            <td class="animate__animated animate__fadeInRight">{{ item }}</td>
                        </tr>
                        <tr>
                            <td class="animate__animated animate__fadeInLeft">입/출고</td>
                            <td class="animate__animated animate__fadeInRight">
                                <label><input type="button" :class="['btn', 'in', inOut === 0 ? 'on' : '']" value="입고" @click="inOut = 0" /></label>
                                <label><input type="button" :class="['btn', 'out', inOut === 1 ? 'on' : '']" value="출고" @click="inOut = 1" /></label>
                            </td>
                        </tr>
                        <tr>
                            <td class="animate__animated animate__fadeInLeft">수량</td>
                            <td class="animate__animated animate__fadeInRight">
                                <label>
                                    <input type="number" v-model="count" />
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td class="animate__animated animate__fadeInLeft">단위</td>
                            <td class="animate__animated animate__fadeInRight">
                                <label>
                                    <select v-model="unit">
                                        <option :key="i" v-for="(unit, i) in properties.units">{{ unit }}</option>
                                        <option value="*">기타(수기입력)</option>
                                    </select>
                                </label>
                                <label v-show="unit === '*'"><input type="text" v-model="manualUnit" /></label>
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
                                <input type="button" class="btn" value="뒤로가기" @click="$router.back()" />
                                <input type="button" class="btn" value="저장" @click="modify" />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment";

    import DashboardEditMixin from "./DashboardEditMixin";

    export default {
        name: "MobileDashboardEdit",
        mixins: [DashboardEditMixin],
        async mounted() {
            await this.initProperties();
            this.date = moment(this.$route.params.logTime, "YYYYMMDDHHmmss").format("YYYY.MM.DD");
            this.time = moment(this.$route.params.logTime, "YYYYMMDDHHmmss").format("HH:mm:ss");
            this.workClass = this.$route.params.workClass;
            this.workerName = this.$route.params.workerName;
            this.category = this.$route.params.category;
            this.item = this.$route.params.item;
            this.inOut = this.$route.params.inOut;
            this.count = this.$route.params.count;
            if (this.properties.units.indexOf(this.$route.params.unit) === -1)
                [this.unit, this.manualUnit] = ["*", this.$route.params.unit];
            else this.unit = this.$route.params.unit;
        }
    }
</script>

<style>
    @import "./Mobile.css";
</style>
