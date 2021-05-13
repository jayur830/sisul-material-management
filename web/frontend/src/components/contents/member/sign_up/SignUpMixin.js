import { mapState, mapActions } from "vuex";

import { alert, confirm } from "../../../../common";
import axios from "axios";

export default {
    name: "SignUpMixin",
    data: () => ({
        isCheckedDuplicatedUser: false,
        username: "",
        password: "",
        passwordConfirm: "",
        workClass: "*",
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

        async checkDuplicatedUser() {
            if (this.username === "")
                await new Promise(resolve => alert("아이디를 입력해주세요.", resolve));
            else {
                const isExist = await axios.get("/api/member/findByUsername", { params: { username: this.username } }).then(response => response.data);
                if (isExist) {
                    new Promise(resolve => alert("사용 가능한 아이디입니다.", resolve));
                    this.isCheckedDuplicatedUser = true;
                } else new Promise(resolve => alert("이미 존재하는 아이디입니다.\n다시 입력해주세요.", resolve));
            }
        },

        async signUp() {
            if (this.username === "")
                await new Promise(resolve => alert("아이디를 입력해주세요.", resolve));
            else if (this.username.length < 5)
                await new Promise(resolve => alert("아이디는 5자 이상 입력해주세요.", resolve));
            else if (!this.isCheckedDuplicatedUser)
                await new Promise(resolve => alert("아이디를 중복확인하세요.", resolve));
            else if (this.password === "")
                await new Promise(resolve => alert("비밀번호를 입력해주세요.", resolve));
            else if (this.password.indexOf(" ") !== -1)
                await new Promise(resolve => alert("비밀번호는 공백 없이 입력해주세요.", resolve));
            else if (this.password.length < 8 || this.password.length > 20 || !/[a-zA-Z0-9~!@#$%^&*()_+\-|<>?:;/]/.test(this.password))
                await new Promise(resolve => alert("비밀번호는 8자 이상 20자 이하의\n영문자+숫자+특수문자\n(~,!,@,#,$,%,^,&,*,(,),_,+,-,|,<,>,?,:,;,/)\n조합으로 입력해주세요.", resolve));
            else if (this.passwordConfirm === "")
                await new Promise(resolve => alert("비밀번호 확인을 입력해주세요.", resolve));
            else if (this.passwordConfirm.indexOf(" ") !== -1)
                await new Promise(resolve => alert("비밀번호는 공백 없이 입력해주세요.", resolve));
            else if (this.password !== this.passwordConfirm)
                await new Promise(resolve => alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.\n다시 입력해주세요.", resolve));
            else if (this.workClass === "*")
                await new Promise(resolve => alert("근무반을 선택해주세요.", resolve));
            else if (this.workerName === "")
                await new Promise(resolve => alert("이름을 입력해주세요.", resolve));
            else if (this.email === "")
                await new Promise(resolve => alert("이메일을 입력해주세요.", resolve));
            else if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(this.email))
                await new Promise(resolve => alert("이메일 형식이 맞지 않습니다.\n다시 입력해주세요.", resolve));
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
                await this.$router.push("/member/login");
            }
        }
    }
}
