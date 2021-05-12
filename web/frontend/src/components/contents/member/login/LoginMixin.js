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
            isAuthenticated: state => state.member.isAuthenticated
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
                await this.setAuthenticated();
                if (this.isAuthenticated) {
                    await alert(`${this.username}님 환영합니다.`)
                    sessionStorage.setItem("username", this.username);
                    await this.$router.push("/");
                } else await alert("아이디 또는 비밀번호가 맞지 않습니다.\n다시 입력해주세요.");
            }
        }
    }
}
