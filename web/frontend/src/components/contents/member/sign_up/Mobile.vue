<template>
    <div id="mobile-sign-up">
        <div>
            <div>
                <div class="animate__animated animate__fadeInDown">
                    <table>
                        <colgroup>
                            <col />
                            <col />
                        </colgroup>
                        <tbody>
                            <tr>
                                <td class="animate__animated animate__fadeInLeft">아이디</td>
                                <td class="animate__animated animate__fadeInRight">
                                    <input type="text" v-model="username" @keyup="e => { if (e.key === 'Enter') signUp(); }" />
                                </td>
                                <td><input type="button" :class="['btn', isCheckedDuplicatedUser ? 'disabled' : '']" :disabled="isCheckedDuplicatedUser" value="중복확인" @click="checkDuplicatedUser" /></td>
                            </tr>
                            <tr>
                                <td class="animate__animated animate__fadeInLeft">비밀번호</td>
                                <td class="animate__animated animate__fadeInRight">
                                    <input type="password" v-model="password" @keyup="e => { if (e.key === 'Enter') signUp(); }" />
                                </td>
                            </tr>
                            <tr>
                                <td class="animate__animated animate__fadeInLeft">비밀번호 확인</td>
                                <td class="animate__animated animate__fadeInRight">
                                    <input type="password" v-model="passwordConfirm" @keyup="e => { if (e.key === 'Enter') signUp(); }" />
                                </td>
                            </tr>
                            <tr>
                                <td class="animate__animated animate__fadeInLeft">근무반</td>
                                <td class="animate__animated animate__fadeInRight">
                                    <label>
                                        <select v-model="workClass">
                                            <option value="*">--- 근무반 선택 ---</option>
                                            <option :key="i" v-for="(workClass, i) in workClasses">{{ workClass }}</option>
                                        </select>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td class="animate__animated animate__fadeInLeft">이름</td>
                                <td class="animate__animated animate__fadeInRight">
                                    <input type="text" v-model="workerName" @keyup="e => { if (e.key === 'Enter') signUp(); }" />
                                </td>
                            </tr>
                            <tr>
                                <td class="animate__animated animate__fadeInLeft">이메일</td>
                                <td class="animate__animated animate__fadeInRight">
                                    <input type="email" v-model="email" @keyup="e => { if (e.key === 'Enter') signUp(); }" />
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3" class="animate__animated animate__fadeInUp">
                                    <input type="button" class="btn" value="뒤로가기" @click="$router.back()" />
                                    <input type="button" class="btn" value="가입하기" @click="signUp" />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SignUpMixin from "./SignUpMixin";

    export default {
        name: "MobileSignUp",
        mixins: [SignUpMixin],
        async mounted() {
            if (!this.workClasses) await this.setWorkClasses();
        }
    }
</script>

<style>
    @import "./Mobile.css";
</style>
