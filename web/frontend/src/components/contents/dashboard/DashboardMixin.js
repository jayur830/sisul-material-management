import { mapActions, mapState } from "vuex";

import moment from "moment";
import { downloadExcel } from "../../../common";

export default {
    name: "DashboardMixin",
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
    }
}
