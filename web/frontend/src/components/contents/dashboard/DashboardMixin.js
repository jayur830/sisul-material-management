import { mapActions, mapState } from "vuex";

import moment from "moment";
import { alert, confirm, prompt, downloadExcel } from "../../../common";
import xlsx from "xlsx";
import axios from "axios";

export default {
    name: "DashboardMixin",
    computed: {
        ...mapState({
            isAdmin: state => state.member.isAdmin,
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
            _removeLog: "REMOVE_DASHBOARD_LOG",
            initStock: "INIT_DASHBOARD_STOCK_LIST",
            orderStock: "ORDER_DASHBOARD_STOCK_LIST",
            setStockView: "SET_DASHBOARD_STOCK_VIEW",
            orderStockView: "ORDER_DASHBOARD_STOCK_VIEW"
        }),

        toLogTime(d, f) {
            return moment(d, f).format("YYYY.MM.DD hh:mm:ss");
        },

        async downloadLogToExcel() {
            if (this.log.length == 0)
                await new Promise(resolve => alert("데이터가 없습니다.", resolve));
            else {
                const book = xlsx.utils.book_new();
                xlsx.utils.book_append_sheet(
                    book,
                    xlsx.utils.json_to_sheet(this.log.map(obj => ({
                        "입/출고 시간": moment(obj.logTime, "YYYYMMDDhhmmss").format("YYYY.MM.DD hh:mm:ss"),
                        "입/출고": obj.inOut === 0 ? "입고" : "출고",
                        "근무반": obj.workClass,
                        "작업자명": obj.workerName,
                        "자재 종류": obj.category,
                        "자제 제품명": obj.item,
                        "수량": obj.count,
                        "재고량": obj.lastCount,
                        "단위": obj.unit
                    }))),
                    "전체 입출고 내역");
                xlsx.writeFile(book, `서울시설공단_응급보수자재관리_전체입출고내역_${moment().format("YYYYMMDDhhmmss")}.xlsx`);
            }
        },

        async downloadStockToExcel() {
            if (this.stock.length == 0)
                await new Promise(resolve => alert("데이터가 없습니다.", resolve));
            else
                downloadExcel(
                    this.stock.map(obj => ({
                        "종류": obj.category,
                        "제품명": obj.item,
                        "수량": obj.count
                    })),
                    "재고",
                    `서울시설공단_응급보수자재관리_재고_${moment().format("YYYYMMDDhhmmss")}.xlsx`);
        },

        async downloadStockViewToExcel() {
            if (this.selectedStock.length == 0)
                await new Promise(resolve => alert("데이터가 없습니다.", resolve));
            else
                downloadExcel(
                    this.selectedStock.map(obj => ({
                        "입/출고 시간": moment(obj.logTime, "YYYYMMDDhhmmss").format("YYYY.MM.DD hh:mm:ss"),
                        "입/출고": obj.inOut === 0 ? "입고" : "출고",
                        "근무반": obj.workClass,
                        "작업자명": obj.workerName,
                        "자재 종류": obj.category,
                        "자제 제품명": obj.item,
                        "수량": obj.count,
                        "단위": obj.unit
                    })),
                    "재고",
                    `서울시설공단_응급보수자재관리_자재별입출고내역_${moment().format("YYYYMMDDhhmmss")}.xlsx`);
        },

        async removeLog(logTime) {
            await new Promise(resolve => confirm("해당 로그를 삭제하시겠습니까?", resolve));
            await this._removeLog(logTime);
            await this.initLog();
            await this.initStock();
            if (this.selectedStockId) await this.setStockView(this.selectedStockId);
            await alert("삭제되었습니다.");
        },

        /**
         * @deprecated
         * */
        async modifyStockCount(stockId, defaultCount) {
            // eslint-disable-next-line no-constant-condition
            while (true) {
                try {
                    const count = await new Promise((resolve, reject) => prompt("수량을 입력하세요.", defaultCount.toString(), resolve, reject));
                    if (!/^[0-9]/g.test(count))
                        await new Promise(resolve => alert("숫자만 입력해주세요.", resolve));
                    else {
                        try {
                            await new Promise((resolve, reject) => confirm("입력하신 수량으로 수정하시겠습니까?", resolve, reject));
                            await axios.put("/api/dashboard/stock/modify", { stockId, count });
                            await alert("재고 수정이 완료되었습니다.");
                            await this.initLog();
                            await this.initStock();
                            if (this.selectedStockId) await this.setStockView(this.selectedStockId);
                            break;
                        } catch (e) {
                            break;
                        }
                    }
                } catch (e) {
                    break;
                }
            }
        }
    }
}
