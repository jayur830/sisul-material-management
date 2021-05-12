<template>
    <div id="mobile-login">
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
                                    <input type="text" v-model="username" @keyup="e => { if (e.key === 'Enter') login(); }" />
                                </td>
                            </tr>
                            <tr>
                                <td class="animate__animated animate__fadeInLeft">비밀번호</td>
                                <td class="animate__animated animate__fadeInRight">
                                    <input type="password" v-model="password" @keyup="e => { if (e.key === 'Enter') login(); }" />
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2">
                                    <div class="animate__animated animate__fadeInUp">
                                        <router-link to="/member/findUsername">아이디 찾기</router-link>
                                        <router-link to="/member/findPassword">비밀번호 찾기</router-link>
                                    </div>
                                    <div class="animate__animated animate__fadeInUp">
                                        <router-link to="/member/signUp" class="btn">회원가입</router-link>
                                        <input type="button" class="btn" value="로그인" @click="login" />
                                    </div>
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
    import LoginMixin from "./LoginMixin";

    export default {
        name: "MobileLogin",
        mixins: [LoginMixin],
        mounted() {

        }
    }
</script>

<style>
    @import "./Mobile.css";
</style>
