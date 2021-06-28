import { mapState, mapActions } from "vuex";
import { alert } from "../../../../common";

export default {
    name: "LoginMixin",
    data: () => ({
        username: "",
        password: ""
    }),
    computed: {
        ...mapState({
            isAuthenticated: state => state.member.isAuthenticated,
            isConfirmed: state => state.member.isConfirmed,
            errorMsg: state => state.member.errorMsg,
            errorCode: state => state.member.errorCode
        })
    },
    methods: {
        ...mapActions({
            _login: "LOGIN",
            setAuthenticated: "SET_AUTHENTICATED"
        }),

        async login() {
            if (this.username === "")
                await alert("아이디를 입력해주세요.");
            else if (this.password === "")
                await alert("비밀번호를 입력해주세요.");
            else {
                await this._login({
                    username: this.username,
                    password: this.password
                });
                if (this.errorCode != null)
                    await alert(this.errorMsg[this.errorCode]);
                else {
                    await this.setAuthenticated();
                    if (this.isAuthenticated && this.isConfirmed) {
                        await alert(`${this.username}님 환영합니다.`)
                        sessionStorage.setItem("username", this.username);
                        await this.$router.push("/");
                    }
                }
            }
        }
    }
}
