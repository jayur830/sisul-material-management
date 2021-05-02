<template>
    <div id="dashboard">
        <div class="content animate__animated animate__fadeInDown">
            <div>
                <h2>전체 입/출고 내역</h2>
                <div><font-awesome-icon size="lg" :icon="['fa', 'redo-alt']" @click="initLog" /></div>
            </div>
            <table>
                <colgroup>
                    <col style="width: 20%;" />
                    <col style="width: 10%;" />
                    <col style="width: 15%;" />
                    <col style="width: 25%;" />
                    <col style="width: 10%;" />
                    <col style="width: 10%;" />
                    <col style="width: 10%;" />
                </colgroup>
                <thead>
                    <tr>
                        <th>시간</th>
                        <th>입/출고</th>
                        <th>종류</th>
                        <th>제품명</th>
                        <th>입/출고 수량</th>
                        <th>근무반</th>
                        <th>작업자명</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="7">
                            <div class="scroll" v-if="log">
                                <table>
                                    <colgroup>
                                        <col style="width: 20%;" />
                                        <col style="width: 10%;" />
                                        <col style="width: 15%;" />
                                        <col style="width: 25%;" />
                                        <col style="width: 10%;" />
                                        <col style="width: 10%;" />
                                        <col style="width: 10%;" />
                                    </colgroup>
                                    <tbody>
                                        <tr :key="i" v-for="(obj, i) in log" @click="$router.push(`/dashboard/view?t=${obj.logTime}&c=${obj.workClass}&n=${obj.workerName}`)">
                                            <td>{{ toLogTime(obj.logTime, 'YYYYMMDDhhmmss') }}</td>
                                            <td :style="{
                                                fontWeight: 'bold',
                                                backgroundColor: obj.inOut === 0 ? '#009a46' : '#c55a11',
                                                color: obj.inOut === 0 ? '#bdffdb' : '#f8cbad'
                                            }">{{ obj.inOut === 0 ? '입고' : '출고' }}</td>
                                            <td>{{ obj.stock.category }}</td>
                                            <td>{{ obj.stock.item }}</td>
                                            <td :style="{
                                                fontWeight: 'bold',
                                                color: obj.inOut === 0 ? '#009a46' : '#c55a11'
                                            }">{{ obj.inOut === 0 ? '+' : '-' }}{{ obj.count }}</td>
                                            <td>{{ obj.workClass }}</td>
                                            <td>{{ obj.workerName }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-else>No data</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <div class="content animate__animated animate__fadeInDown" style="animation-delay: 0.3s;">
                <div>
                    <h2>재고</h2>
                    <div><font-awesome-icon size="lg" :icon="['fa', 'redo-alt']" @click="initStock" /></div>
                </div>
                <table>
                    <colgroup>
                        <col style="width: 33%;" />
                        <col style="width: 50%;" />
                        <col style="width: 17%;" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>종류</th>
                            <th>제품명</th>
                            <th>수량</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="3">
                                <div class="scroll" v-if="stock">
                                    <table>
                                        <colgroup>
                                            <col style="width: 33%;" />
                                            <col style="width: 50%;" />
                                            <col style="width: 17%;" />
                                        </colgroup>
                                        <tbody>
                                            <tr :key="i" v-for="(obj, i) in stock" @click="setStockView(obj.stockId)">
                                                <td>{{ obj.category }}</td>
                                                <td>{{ obj.item }}</td>
                                                <td>{{ obj.count }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-else>No data</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="content animate__animated animate__fadeInDown" v-show="selectedStock">
                <div>
                    <h2>자재별 입/출고 내역</h2>
                    <div><font-awesome-icon size="lg" :icon="['fa', 'redo-alt']" @click="setStockView(selectedStockId)" /></div>
                </div>
                <table>
                    <colgroup>
                        <col style="width: 30%;" />
                        <col style="width: 15%;" />
                        <col style="width: 15%;" />
                        <col style="width: 20%;" />
                        <col style="width: 20%;" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>시간</th>
                            <th>입/출고</th>
                            <th>수량</th>
                            <th>근무반</th>
                            <th>작업자명</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="5">
                                <div class="scroll">
                                    <table>
                                        <colgroup>
                                            <col style="width: 30%;" />
                                            <col style="width: 15%;" />
                                            <col style="width: 15%;" />
                                            <col style="width: 20%;" />
                                            <col style="width: 20%;" />
                                        </colgroup>
                                        <tbody>
                                            <tr :key="i" v-for="(obj, i) in selectedStock">
                                                <td>{{ toLogTime(obj.logTime, 'YYYYMMDDhhmmss') }}</td>
                                                <td :style="{
                                                    fontWeight: 'bold',
                                                    backgroundColor: obj.inOut === 0 ? '#009a46' : '#c55a11',
                                                    color: obj.inOut === 0 ? '#bdffdb' : '#f8cbad'
                                                }">{{ obj.inOut === 0 ? '입고' : '출고' }}</td>
                                                <td :style="{
                                                    fontWeight: 'bold',
                                                    color: obj.inOut === 0 ? '#009a46' : '#c55a11'
                                                }">{{ obj.inOut === 0 ? '+' : '-' }}{{ obj.count }}</td>
                                                <td>{{ obj.workClass }}</td>
                                                <td>{{ obj.workerName }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    import moment from "moment";

    export default {
        name: "Dashboard",
        computed: {
            ...mapState({
                log: state => state.dashboard.log,
                stock: state => state.dashboard.stock,
                selectedStockId: state => state.dashboard.selectedStockId,
                selectedStock: state => state.dashboard.selectedStock
            })
        },
        methods: {
            ...mapActions({
                initLog: "INIT_DASHBOARD_LOG_LIST",
                initStock: "INIT_DASHBOARD_STOCK_LIST",
                setStockView: "SET_DASHBOARD_STOCK_VIEW"
            }),

            toLogTime(d, f) {
                return moment(d, f).format("YYYY.MM.DD hh:mm:ss");
            }
        },
        mounted() {
            this.initLog();
            this.initStock();
        }
    }
</script>

<style>
    @import "./Dashboard.css";
</style>
