<template>
    <div id="dashboard-view" v-if="logData">
        <h3 @click="$router.back()">
            <font-awesome-icon size="1x" :icon="['fa', 'arrow-left']" />
            <span>이전으로 돌아가기</span>
        </h3>
        <div>
            <div class="animate__animated animate__fadeInDown">
                <div :style="{
                    backgroundColor: logData.inOut === 0 ? '#009a46' : '#c55a11',
                    color: logData.inOut === 0 ? '#bdffdb' : '#f8cbad'
                }">{{ logData.inOut === 0 ? '입' : '출' }}고</div>
            </div>
        </div>
        <table>
            <colgroup>
                <col style="width: 15%" />
                <col style="width: 35%" />
                <col style="width: 50%" />
            </colgroup>
            <tbody>
                <tr>
                    <td class="animate__animated animate__fadeInLeft">{{ logData.inOut === 0 ? '입' : '출' }}고 시간</td>
                    <td class="animate__animated animate__fadeInLeft">{{ toLogTime(logData.logTime, 'YYYYMMDDhhmmss') }}</td>
                    <td class="animate__animated animate__fadeInDown" style="animation-delay: 0.6s;">첨부 이미지</td>
                </tr>
                <tr>
                    <td class="animate__animated animate__fadeInLeft" style="animation-delay: 0.1s;">근무반</td>
                    <td class="animate__animated animate__fadeInLeft" style="animation-delay: 0.1s;">{{ logData.workClass }}</td>
                    <td rowspan="5" class="animate__animated animate__fadeInRight" style="animation-delay: 0.7s;">
                        <div class="log-img">
                            <div>
                                <div>
                                    <font-awesome-icon size="1x" :icon="['fa', 'chevron-left']" @click="setImgIndex(-1)" />
                                </div>
                            </div>
                            <div><img :src="'/api/dashboard/img?fileName=' + logData.imgs[selectedImgIndex]" alt="" style="width: 320px;" /></div>
                            <div>
                                <div>
                                    <font-awesome-icon size="1x" :icon="['fa', 'chevron-right']" @click="setImgIndex(1)" />
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="animate__animated animate__fadeInLeft" style="animation-delay: 0.2s;">작업자명</td>
                    <td class="animate__animated animate__fadeInLeft" style="animation-delay: 0.2s;">{{ logData.workerName }}</td>
                </tr>
                <tr>
                    <td class="animate__animated animate__fadeInLeft" style="animation-delay: 0.3s;">자재 종류</td>
                    <td class="animate__animated animate__fadeInLeft" style="animation-delay: 0.3s;">{{ logData.stock.category }}</td>
                </tr>
                <tr>
                    <td class="animate__animated animate__fadeInLeft" style="animation-delay: 0.4s;">자재 제품명</td>
                    <td class="animate__animated animate__fadeInLeft" style="animation-delay: 0.4s;">{{ logData.stock.item }}</td>
                </tr>
                <tr>
                    <td class="animate__animated animate__fadeInLeft" style="animation-delay: 0.5s;">{{ logData.inOut === 0 ? '입' : '출' }}고수량</td>
                    <td class="animate__animated animate__fadeInLeft" style="animation-delay: 0.5s;">{{ logData.count }}{{ logData.unit }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    import moment from "moment";

    export default {
        name: "DashBoardView",
        computed: {
            ...mapState({
                logData: state => state.dashboard.logView.data,
                selectedImgIndex: state => state.dashboard.logView.selectedImgIndex
            })
        },
        methods: {
            ...mapActions({
                setData: "SET_DASHBOARD_LOG_VIEW",
                setImgIndex: "SET_DASHBOARD_LOG_VIEW_IMG_INDEX",
                clearData: "CLEAR_DASHBOARD_LOG_VIEW"
            }),

            toLogTime(d, f) {
                return moment(d, f).format("YYYY.MM.DD hh:mm:ss");
            }
        },
        mounted() {
            console.log(this.$route.query);
            this.setData({
                logTime: this.$route.query.t,
                workClass: this.$route.query.c,
                workerName: this.$route.query.n
            });
        },
        destroyed() {
            this.clearData();
        }
    }
</script>

<style>
    @import "./DashboardView.css";
</style>
