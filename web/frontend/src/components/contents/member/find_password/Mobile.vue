<template>
    <div id="mobile-find-password">
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
                                    <input type="text" v-model="username" @keyup="e => { if (e.key === 'Enter') findPassword(); }" />
                                </td>
                            </tr>
                            <tr>
                                <td class="animate__animated animate__fadeInLeft">이메일</td>
                                <td class="animate__animated animate__fadeInRight">
                                    <input type="email" v-model="email" @keyup="e => { if (e.key === 'Enter') findPassword(); }" />
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" class="animate__animated animate__fadeInUp">
                                    <input type="button" class="btn" value="로그인" @click="$router.push('/member/login')" />
                                    <input type="button" class="btn" value="비밀번호 찾기" @click="findPassword" />
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
    import FindPasswordMixin from "./FindPasswordMixin";

    export default {
        name: "MobileFindPassword",
        mixins: [FindPasswordMixin],
        mounted() {

        }
    }
</script>

<style>
    @import "./Mobile.css";
</style>
