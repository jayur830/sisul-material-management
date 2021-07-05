<template>
    <div id="desktop-dashboard-edit" class="animate__animated animate__fadeInRight">
        <div>
            <div>
                <table v-if="properties">
                    <colgroup>
                        <col style="width: 30%;" />
                        <col style="width: 70%;" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td>시간</td>
                            <td style="font: 13pt 'NanumSquare_acB';">
                                <date-picker v-model="date" :value="date" valueType="format" format="YYYY.MM.DD" />
                                <time-picker v-model="time" format="HH:mm:ss" />
                            </td>
                        </tr>
                        <tr>
                            <td>근무반</td>
                            <td>
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
                            <td>성명</td>
                            <td>
                                <label>
                                    <input type="text" v-model="workerName" />
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>자재 종류</td>
                            <td>{{ category }}</td>
                        </tr>
                        <tr>
                            <td>자재 제품명</td>
                            <td>{{ item }}</td>
                        </tr>
                        <tr>
                            <td>입/출고</td>
                            <td>
                                <label><input type="button" :class="['btn', 'in', inOut === 0 ? 'on' : '']" value="입고" @click="inOut = 0" /></label>
                                <label><input type="button" :class="['btn', 'out', inOut === 1 ? 'on' : '']" value="출고" @click="inOut = 1" /></label>
                            </td>
                        </tr>
                        <tr>
                            <td>수량</td>
                            <td>
                                <label>
                                    <input type="number" v-model="count" />
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>단위</td>
                            <td>
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
                            <td>사진 첨부</td>
                            <td>
                                <div class="file-field">
                                    <label for="file-1" v-text="files[0] ? (files[0].name.length > 25 ? files[0].name.substring(0, 22) + '...' : files[0].name) : '사진 업로드'"></label>
                                    <input type="file" id="file-1" @change="e => onLoadFile(e, 0)" />
                                </div>
                                <div class="file-field">
                                    <label for="file-2" v-text="files[1] ? (files[1].name.length > 25 ? files[1].name.substring(0, 22) + '...' : files[1].name) : '사진 업로드'"></label>
                                    <input type="file" id="file-2" @change="e => onLoadFile(e, 1)" />
                                </div>
                                <div class="file-field">
                                    <label for="file-3" v-text="files[2] ? (files[2].name.length > 25 ? files[2].name.substring(0, 22) + '...' : files[2].name) : '사진 업로드'"></label>
                                    <input type="file" id="file-3" @change="e => onLoadFile(e, 2)" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2">
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
        name: "DesktopDashboardEdit",
        mixins: [DashboardEditMixin],
        async mounted() {
            await this.initProperties();
            this.src.logTime = this.$route.params.logTime;
            this.date = moment(this.$route.params.logTime, "YYYYMMDDHHmmss").format("YYYY.MM.DD");
            this.time = moment(this.$route.params.logTime, "YYYYMMDDHHmmss").format("HH:mm:ss");
            [this.workClass, this.src.workClass] = [this.$route.params.workClass, this.$route.params.workClass];
            [this.workerName, this.src.workerName] = [this.$route.params.workerName, this.$route.params.workerName];
            [this.category, this.src.category] = [this.$route.params.category, this.$route.params.category];
            [this.item, this.src.item] = [this.$route.params.item, this.$route.params.item];
            [this.inOut, this.src.inOut] = [this.$route.params.inOut, this.$route.params.inOut];
            [this.count, this.src.count] = [this.$route.params.count, this.$route.params.count];
            if (this.properties.units.indexOf(this.$route.params.unit) === -1)
                [this.unit, this.manualUnit] = ["*", this.$route.params.unit];
            else this.unit = this.$route.params.unit;
            this.src.unit = this.$route.params.unit;

            console.log(moment("2021.04.dd").isValid());
        }
    }
</script>

<style>
    @import "./Desktop.css";
</style>
