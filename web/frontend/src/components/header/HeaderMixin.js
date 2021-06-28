import { mapState, mapActions } from "vuex";
import { alert, confirm } from "../../common";

import axios from "axios";

export default {
    name: "HeaderMixin",
    computed: {
        ...mapState({
            isAuthenticated: state => state.member.isAuthenticated,
            isConfirmed: state => state.member.isConfirmed
        })
    },
    methods: {
        ...mapActions({
            setAuthenticated: "SET_AUTHENTICATED"
        }),

        async logout() {
            await new Promise(resolve => confirm("로그아웃 하시겠습니까?", resolve));
            await axios.post("/api/member/logout");
            await this.setAuthenticated();
            sessionStorage.removeItem("username");
            await new Promise(resolve => alert("로그아웃 되었습니다.", resolve));
            if (this.$route.path !== "/member/login")
                await this.$router.push("/member/login");
        }
    }
}
