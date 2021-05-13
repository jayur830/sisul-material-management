import { mapState, mapActions } from "vuex";
import { alert, confirm } from "../../../../common";
import axios from "axios";

export default {
    name: "MyPageMixin",

    computed: {
        ...mapState({
            src: state => state.member.myPage.src,
            username: state => state.member.myPage.dst.username,
            password: state => state.member.myPage.dst.password,
            workClass: state => state.member.myPage.dst.workClass,
            workerName: state => state.member.myPage.dst.workerName,
            email: state => state.member.myPage.dst.email,
            workClasses: state => state.member.myPage.workClasses
        })
    },
    methods: {
        ...mapActions({
            setWorkClasses: "SET_MEMBER_MY_PAGE_WORK_CLASSES",
            setData: "SET_MEMBER_MY_PAGE_DATA",
            setWorkClass: "SET_MEMBER_MY_PAGE_WORK_CLASS",
            setWorkerName: "SET_MEMBER_MY_PAGE_WORKER_NAME",
            setEmail: "SET_MEMBER_MY_PAGE_EMAIL"
        }),

        isChanged() {
            return this.src.password != this.password ||
                this.src.workClass != this.workClass ||
                this.src.workerName != this.workerName ||
                this.src.email != this.email;
        },

        async modify() {
            if (this.workClass == "*")
                await new Promise(resolve => alert("근무반을 선택해주세요.", resolve));
            else if (this.workerName == "")
                await new Promise(resolve => alert("이름을 선택해주세요.", resolve));
            else if (this.email == "")
                await new Promise(resolve => alert("이메일을 선택해주세요.", resolve));
            else if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(this.email))
                await new Promise(resolve => alert("이메일 형식이 맞지 않습니다.\n다시 입력해주세요.", resolve));
            else {
                await new Promise(resolve => confirm("입력하신 내용으로 수정하시겠습니까?", resolve));
                await axios.put("/api/member/updateInfo", {
                    username: this.username,
                    workClass: this.workClass,
                    setWorkerName: this.workerName,
                    email: this.email
                });
                await alert("정보가 수정되었습니다.");
                await this.$router.push("/dashboard");
            }
        }
    }
}
