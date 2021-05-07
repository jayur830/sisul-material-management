<template>
    <div id="desktop-dashboard">
        <div class="content animate__animated animate__fadeInDown">
            <div>
                <h2>전체 입/출고 내역</h2>
                <div>
                    <font-awesome-icon size="lg" :icon="['fa', 'file-download']" title="파일 다운로드" @click="downloadLogToExcel" />
                    <font-awesome-icon size="lg" :icon="['fa', 'redo-alt']" title="새로고침" @click="initLog" />
                </div>
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
                        <th>
                            시간
                            <font-awesome-icon size="1x" :icon="['fa', 'sort']" @click="orderLog({ property: 'logTime', order: !logOrder.logTime })" />
                        </th>
                        <th>
                            입/출고
                            <font-awesome-icon size="1x" :icon="['fa', 'sort']" @click="orderLog({ property: 'inOut', order: !logOrder.inOut })" />
                        </th>
                        <th>
                            종류
                            <font-awesome-icon size="1x" :icon="['fa', 'sort']" @click="orderLog({ property: 'category', order: !logOrder.category })" />
                        </th>
                        <th>
                            제품명
                            <font-awesome-icon size="1x" :icon="['fa', 'sort']" @click="orderLog({ property: 'item', order: !logOrder.item })" />
                        </th>
                        <th>
                            입/출고 수량
                            <font-awesome-icon size="1x" :icon="['fa', 'sort']" @click="orderLog({ property: 'count', order: !logOrder.count })" />
                        </th>
                        <th>
                            근무반
                            <font-awesome-icon size="1x" :icon="['fa', 'sort']" @click="orderLog({ property: 'workClass', order: !logOrder.workClass })" />
                        </th>
                        <th>
                            작업자명
                            <font-awesome-icon size="1x" :icon="['fa', 'sort']" @click="orderLog({ property: 'workerName', order: !logOrder.workerName })" />
                        </th>
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
                    <div>
                        <font-awesome-icon size="lg" :icon="['fa', 'file-download']" title="파일 다운로드" @click="downloadStockToExcel" />
                        <font-awesome-icon size="lg" :icon="['fa', 'redo-alt']" title="새로고침" @click="initStock" />
                    </div>
                </div>
                <table>
                    <colgroup>
                        <col style="width: 33%;" />
                        <col style="width: 50%;" />
                        <col style="width: 17%;" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>
                                종류
                                <font-awesome-icon size="1x" :icon="['fa', 'sort']" @click="orderStock({ property: 'category', order: !stockOrder.category })" />
                            </th>
                            <th>
                                제품명
                                <font-awesome-icon size="1x" :icon="['fa', 'sort']" @click="orderStock({ property: 'item', order: !stockOrder.item })" />
                            </th>
                            <th>
                                수량
                                <font-awesome-icon size="1x" :icon="['fa', 'sort']" @click="orderStock({ property: 'count', order: !stockOrder.count })" />
                            </th>
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
                    <div>
                        <font-awesome-icon size="lg" :icon="['fa', 'file-download']" title="파일 다운로드" @click="downloadStockViewToExcel" />
                        <font-awesome-icon size="lg" :icon="['fa', 'redo-alt']" title="새로고침" @click="setStockView(selectedStockId)" />
                    </div>
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
                            <th>
                                시간
                                <font-awesome-icon size="1x" :icon="['fa', 'sort']" @click="orderStockView({ property: 'logTime', order: !selectedStockOrder.logTime })" />
                            </th>
                            <th>
                                입/출고
                                <font-awesome-icon size="1x" :icon="['fa', 'sort']" @click="orderStockView({ property: 'inOut', order: !selectedStockOrder.inOut })" />
                            </th>
                            <th>
                                수량
                                <font-awesome-icon size="1x" :icon="['fa', 'sort']" @click="orderStockView({ property: 'count', order: !selectedStockOrder.count })" />
                            </th>
                            <th>
                                근무반
                                <font-awesome-icon size="1x" :icon="['fa', 'sort']" @click="orderStockView({ property: 'workClass', order: !selectedStockOrder.workClass })" />
                            </th>
                            <th>
                                작업자명
                                <font-awesome-icon size="1x" :icon="['fa', 'sort']" @click="orderStockView({ property: 'workerName', order: !selectedStockOrder.workerName })" />
                            </th>
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
    import { downloadExcel } from "../../../common";

    export default {
        name: "DesktopDashboard",
        computed: {
            ...mapState({
                log: state => state.dashboard.log,
                logOrder: state => state.dashboard.logOrder,
                stock: state => state.dashboard.stock,
                stockOrder: state => state.dashboard.stockOrder,
                selectedStockId: state => state.dashboard.selectedStockId,
                selectedStock: state => state.dashboard.selectedStock,
                selectedStockOrder: state => state.dashboard.selectedStockOrder
            })
        },
        methods: {
            ...mapActions({
                initLog: "INIT_DASHBOARD_LOG_LIST",
                orderLog: "ORDER_DASHBOARD_LOG_LIST",
                initStock: "INIT_DASHBOARD_STOCK_LIST",
                orderStock: "ORDER_DASHBOARD_STOCK_LIST",
                setStockView: "SET_DASHBOARD_STOCK_VIEW",
                orderStockView: "ORDER_DASHBOARD_STOCK_VIEW"
            }),

            toLogTime(d, f) {
                return moment(d, f).format("YYYY.MM.DD hh:mm:ss");
            },

            downloadLogToExcel() {
                downloadExcel(
                    this.log.map(obj => ({
                        "입/출고 시간": moment(obj.logTime, "YYYYMMDDhhmmss").format("YYYY.MM.DD hh:mm:ss"),
                        "입/출고": obj.inOut === 0 ? "입고" : "출고",
                        "근무반": obj.workClass,
                        "작업자명": obj.workerName,
                        "자재 종류": obj.stock.category,
                        "자제 제품명": obj.stock.item,
                        "수량": obj.count,
                        "단위": obj.unit
                    })),
                    "전체 입출고 내역",
                    `서울시설공단_응급보수자재관리_전체입출고내역_${moment().format("YYYYMMDDhhmmss")}.xlsx`);
            },

            downloadStockToExcel() {
                downloadExcel(
                    this.stock.map(obj => ({
                        "종류": obj.category,
                        "제품명": obj.item,
                        "수량": obj.count
                    })),
                    "재고",
                    `서울시설공단_응급보수자재관리_재고_${moment().format("YYYYMMDDhhmmss")}.xlsx`);
            },

            downloadStockViewToExcel() {
                downloadExcel(
                    this.selectedStock.map(obj => ({
                        "입/출고 시간": moment(obj.logTime, "YYYYMMDDhhmmss").format("YYYY.MM.DD hh:mm:ss"),
                        "입/출고": obj.inOut === 0 ? "입고" : "출고",
                        "근무반": obj.workClass,
                        "작업자명": obj.workerName,
                        "자재 종류": obj.stock.category,
                        "자제 제품명": obj.stock.item,
                        "수량": obj.count,
                        "단위": obj.unit
                    })),
                    "재고",
                    `서울시설공단_응급보수자재관리_자재별입출고내역_${moment().format("YYYYMMDDhhmmss")}.xlsx`);
            }
        },
        mounted() {
            this.initLog();
            this.initStock();
        }
    }
</script>

<style>
    @import "./Desktop.css";
</style>
