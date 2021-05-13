import { alert, confirm } from "../../../../common";
import axios from "axios";

export default {
    name: "ChangePasswordMixin",
    data: () => ({
        currentPassword: "",
        newPassword: "",
        newPasswordConfirm: ""
    }),
    methods: {
        async changePassword() {
            if (this.currentPassword === "")
                await new Promise(resolve => alert("현재 비밀번호를 입력해주세요.", resolve));
            else if (this.newPassword === "")
                await new Promise(resolve => alert("새 비밀번호를 입력해주세요.", resolve));
            else if (this.newPassword.indexOf(" ") !== -1)
                await new Promise(resolve => alert("새 비밀번호는 공백 없이 입력해주세요.", resolve));
            else if (this.newPassword.length < 8 || this.newPassword.length > 20 || !/[a-zA-Z0-9~!@#$%^&*()_+\-|<>?:;/]/.test(this.newPassword))
                await new Promise(resolve => alert("비밀번호는 8자 이상 20자 이하의\n영문자+숫자+특수문자\n(~,!,@,#,$,%,^,&,*,(,),_,+,-,|,<,>,?,:,;,/)\n조합으로 입력해주세요.", resolve));
            else if (this.newPasswordConfirm === "")
                await new Promise(resolve => alert("새 비밀번호 확인을 입력해주세요.", resolve));
            else if (this.newPasswordConfirm.indexOf(" ") !== -1)
                await new Promise(resolve => alert("새 비밀번호는 공백 없이 입력해주세요.", resolve));
            else if (this.newPassword !== this.newPasswordConfirm)
                await new Promise(resolve => alert("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.\n다시 입력해주세요.", resolve));
            else {
                const isMatched = (await axios.post("/api/member/compareCurrentPassword", this.currentPassword).then(response => response.data)).isMatched;
                console.log(isMatched);
                if (isMatched) {
                    await new Promise(resolve => confirm("입력하신 새 비밀번호로 변경하시겠습니까?", resolve));
                    await axios.post("/api/member/changePassword", this.newPassword);
                    await alert("비밀번호가 변경되었습니다.");
                    await this.$router.push("/dashboard");
                } else {
                    await alert("현재 비밀번호가 맞지 않습니다.\n다시 입력하세요.");
                    this.currentPassword = "";
                    this.newPassword = "";
                    this.newPasswordConfirm = "";
                }
            }
        }
    }
}
