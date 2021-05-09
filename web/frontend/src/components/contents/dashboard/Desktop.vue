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
                    <col style="width: 14%;" />
                    <col style="width: 7%;" />
                    <col style="width: 17%;" />
                    <col style="width: 17%;" />
                    <col style="width: 10%;" />
                    <col style="width: 10%;" />
                    <col style="width: 12%;" />
                    <col style="width: 13%;" />
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
                            최종 재고량
                            <font-awesome-icon size="1x" :icon="['fa', 'sort']" @click="orderLog({ property: 'lastCount', order: !logOrder.lastCount })" />
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
                        <td colspan="8">
                            <div class="scroll" v-if="log && log.length != 0">
                                <table>
                                    <colgroup>
                                        <col style="width: 14%;" />
                                        <col style="width: 7%;" />
                                        <col style="width: 17%;" />
                                        <col style="width: 17%;" />
                                        <col style="width: 10%;" />
                                        <col style="width: 10%;" />
                                        <col style="width: 12%;" />
                                        <col style="width: 13%;" />
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
                                            <td>{{ obj.lastCount }}</td>
                                            <td>{{ obj.workClass }}</td>
                                            <td>{{ obj.workerName }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="scroll" v-else><table><tbody><tr><td>No data</td></tr></tbody></table></div>
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
                                <div class="scroll" v-if="stock && stock.length != 0">
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
                                <div class="scroll" v-else><table><tbody><tr><td>No data</td></tr></tbody></table></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="content animate__animated animate__fadeInDown" v-show="selectedStock" style="animation-delay: 0.6s;">
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
                                <div class="scroll" v-if="selectedStock && selectedStock.length != 0">
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
                                <div class="scroll" v-else><table><tbody><tr><td>No data</td></tr></tbody></table></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import DashboardMixin from "./DashboardMixin";

    export default {
        name: "DesktopDashboard",
        mixins: [DashboardMixin],
        mounted() {
            this.initLog();
            this.initStock();
        }
    }
</script>

<style>
    @import "./Desktop.css";
</style>
