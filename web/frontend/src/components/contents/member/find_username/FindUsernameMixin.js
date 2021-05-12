import { mapState, mapActions } from "vuex";
import { alert, confirm } from "../../../../common";
import axios from "axios";

export default {
    name: "FindUsernameMixin",
    data: () => ({
        workClass: "*",
        workerName: "",
    }),
    computed: {
        ...mapState({
            workClasses: state => state.member.findUsername.workClasses
        })
    },
    methods: {
        ...mapActions({
            setWorkClasses: "SET_MEMBER_FIND_USERNAME_WORK_CLASSES"
        }),

        async findUsername() {
            if (this.workClass === "*")
                await new Promise(resolve => alert("근무반을 선택해주세요.", resolve));
            else if  (this.workerName === "")
                await new Promise(resolve => alert("이름을 입력해주세요.", resolve));
            else {
                const username = await axios.post("/api/member/findUsername", {
                    workClass: this.workClass,
                    workerName: this.workerName
                }).then(response => response.data);
                if (username) {
                    try {
                        await new Promise((resolve, reject) => confirm(`아이디는 ${username}입니다.\n계속해서 비밀번호를 찾으시겠습니까?`, resolve, reject));
                        await this.$router.push("/member/findPassword");
                    } catch (e) {
                        await this.$router.push("/member/login");
                    }
                } else {
                    await new Promise(resolve => alert("입력하신 정보에 대한 아이디가\n존재하지 않습니다. 다시 입력해주세요.", resolve));
                    this.workClass = "*";
                    this.workerName = "";
                }
            }
        }
    }
}
