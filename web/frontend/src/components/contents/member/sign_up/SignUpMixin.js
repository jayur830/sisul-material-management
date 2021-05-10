import { mapState, mapActions } from "vuex";

import { alert, confirm } from "../../../../common";
import axios from "axios";

export default {
    name: "SignUpMixin",
    data: () => ({
        username: "",
        password: "",
        passwordConfirm: "",
        workClass: "",
        manualWorkClass: "",
        workerName: "",
        email: ""
    }),
    computed: {
        ...mapState({
            workClasses: state => state.member.signUp.workClasses,
        })
    },
    methods: {
        ...mapActions({
            setWorkClasses: "SET_MEMBER_SIGN_UP_WORK_CLASSES",
        }),

        async signUp() {
            if (this.username === "")
                await alert("아이디를 입력해주세요.");
            else if (this.username.length < 5)
                await alert("아이디는 5자 이상 입력해주세요.");
            else if (this.password === "")
                await alert("비밀번호를 입력해주세요.");
            else if (this.password.indexOf(" ") !== -1)
                await alert("비밀번호는 공백 없이 입력해주세요.");
            else if (this.passwordConfirm === "")
                await alert("비밀번호 확인을 입력해주세요.");
            else if (this.passwordConfirm.indexOf(" ") !== -1)
                await alert("비밀번호는 공백 없이 입력해주세요.");
            else if (this.password !== this.passwordConfirm)
                await alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.\n다시 입력해주세요.");
            else if (this.workClass === "*" && this.manualWorkClass === "")
                await alert("근무반을 입력해주세요.");
            else if (this.workerName === "")
                await alert("이름을 입력해주세요.");
            else if (this.email === "")
                await alert("이메일을 입력해주세요.");
            else {
                await new Promise(resolve => confirm("입력하신 내용으로 가입하시겠습니까?", resolve));
                await axios.post("/api/member/signUp", {
                    username: this.username,
                    password: this.password,
                    workClass: this.workClass === "*" ? this.manualWorkClass : this.workClass,
                    workerName: this.workerName,
                    email: this.email
                });
                await alert("정상적으로 가입되었습니다.");
            }
        }
    }
}
