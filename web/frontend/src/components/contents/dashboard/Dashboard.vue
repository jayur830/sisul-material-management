<template>
    <div id="dashboard">
        <div class="content">
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
                                        <tr :key="i" v-for="(obj, i) in log">
                                            <td>{{ toLogTime(obj.logTime, 'YYYYMMDDhhmmss') }}</td>
                                            <td :style="{
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
            <div class="content">
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
                                            <tr :key="i" v-for="(obj, i) in stock">
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
            <div class="content">

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
                stock: state => state.dashboard.stock
            })
        },
        methods: {
            ...mapActions({
                initLog: "INIT_DASHBOARD_LOG_LIST",
                initStock: "INIT_DASHBOARD_STOCK_LIST"
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
    #dashboard {
        height: calc(100% - 60px);
        padding: 30px;
    }

    #dashboard .content > div:first-child {
        display: flex;
    }

    #dashboard .content > div:first-child h2 {
        margin: 0;
        font-family: 'NanumSquareEB', serif;
    }

    #dashboard .content > div:first-child > div {
        width: 100%;
        text-align: right;
    }

    #dashboard .content > div:first-child svg {
        position: relative;
        top: 2px;
        cursor: pointer;
        transition: color 0.2s;
    }

    #dashboard .content > div:first-child svg:hover {
        color: #0070c0;
    }

    #dashboard .content > div:first-child svg:active {
        color: #003050;
    }

    #dashboard .content > table {
        width: 100%;
        margin-top: 10px;
        border-collapse: collapse;
        font-size: 10pt;
    }

    #dashboard .content > table th,
    #dashboard .content > table td {
        border: none;
        text-align: center;
        border-bottom: 1px solid #828282;
    }

    #dashboard .content > table th {
        background-color: #262626;
        color: #e7e6e6;
        font-weight: normal;
        padding: 8px;
    }

    #dashboard .content > table tbody div {
        width: calc(100% + 13px);
        height: 269px;
        overflow-x: hidden;
    }

    #dashboard .content > table tbody div table {
        width: 100%;
        border-collapse: collapse;
    }

    #dashboard .content > table tbody div table td {
        padding: 8px;
        transition: background-color 0.1s;
    }

    #dashboard .content > table tbody div table tbody tr:nth-child(odd) td {
        background-color: #e7e6e6;
    }

    #dashboard .content > table tbody div table tbody tr:nth-child(even) td {
        background-color: #d0d0d0;
    }

    #dashboard .content > table tbody div table tbody tr {
        cursor: pointer;
    }

    #dashboard .content > table tbody div table tbody tr:hover td {
        background-color: #bdbdbd;
    }

    #dashboard > div {
        height: 50%;
    }

    #dashboard > div:first-child {
        height: calc(50% - 15px);
    }

    #dashboard > div:first-child > div:first-child div {
        width: calc(100% - 180px);
    }

    #dashboard > div:last-child {
        display: flex;
        padding-top: 15px;
    }

    #dashboard > div:last-child .content {
        width: 50%;
    }

    #dashboard > div:last-child .content > div:first-child div {
        width: calc(100% - 45px);
    }
</style>
