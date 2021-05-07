import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
    name: "DashboardViewMixin",
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
    }
}
