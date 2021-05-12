import { mapActions, mapState } from "vuex";
import { alert } from "../../../../common";

import axios from "axios";

export default {
    name: "FindPasswordMixin",
    data: () => ({
        username: "",
        email: ""
    }),
    computed: {
        ...mapState({

        })
    },
    methods: {
        ...mapActions({

        }),

        async findPassword() {
            if (this.username === "")
                await new Promise(resolve => alert("아이디를 입력해주세요.", resolve));
            else if (this.email === "")
                await new Promise(resolve => alert("이메일을 입력해주세요.", resolve));
            else if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(this.email))
                await new Promise(resolve => alert("이메일 형식이 맞지 않습니다.\n다시 입력해주세요.", resolve));
            else {
                const isExistUser = (await axios.post("/api/member/findPassword", {
                    username: this.username,
                    email: this.email
                }).then(response => response.data)).isExistUser;
                console.log(isExistUser);
                if (isExistUser) {
                    await alert("임시 비밀번호를 해당 이메일로 전송하였습니다.\n로그인 후 비밀번호를 즉시 변경하세요.");
                    await this.$router.push("/member/login");
                } else {
                    await alert("입력하신 아이디와 이메일에 대한 정보가\n존재하지 않습니다. 다시 입력해주세요.");
                    this.username = "";
                    this.email = "";
                }
            }
        }
    }
}
