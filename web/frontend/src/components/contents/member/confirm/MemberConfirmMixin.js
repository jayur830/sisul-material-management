import { mapState, mapActions } from "vuex";
import { alert, confirm } from "../../../../common";
import axios from "axios";

export default {
    name: "MemberConfirmMixin",
    computed: {
        ...mapState({
            unconfirmedMembers: state => state.member.unconfirmedMembers
        })
    },
    methods: {
        ...mapActions({
            setUnconfirmedMembers: "SET_UNCONFIRMED_MEMBERS"
        }),

        async confirm(username) {
            await new Promise(resolve => confirm("승인하시겠습니까?", resolve, () => null, "예", "아니오"));
            await axios.put("/api/member/confirm", { username });
            await alert("승인되었습니다.");
            this.setUnconfirmedMembers();
        }
    },
    mounted() {
        this.setUnconfirmedMembers();
    }
}
