<template>
    <div id="desktop-change-password">
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
                                <td class="animate__animated animate__fadeInLeft">현재 비밀번호</td>
                                <td class="animate__animated animate__fadeInRight">
                                    <input type="password" v-model="currentPassword" @keyup="e => { if (e.key === 'Enter') changePassword(); }" />
                                </td>
                            </tr>
                            <tr>
                                <td class="animate__animated animate__fadeInLeft">새 비밀번호</td>
                                <td class="animate__animated animate__fadeInRight">
                                    <input type="password" v-model="newPassword" @keyup="e => { if (e.key === 'Enter') changePassword(); }" />
                                </td>
                            </tr>
                            <tr>
                                <td class="animate__animated animate__fadeInLeft">새 비밀번호 확인</td>
                                <td class="animate__animated animate__fadeInRight">
                                    <input type="password" v-model="newPasswordConfirm" @keyup="e => { if (e.key === 'Enter') changePassword(); }" />
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2">
                                    <input type="button" class="btn" value="뒤로가기" @click="$router.back()" />
                                    <input type="button" class="btn" value="비밀번호 변경" @click="changePassword" />
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
    import ChangePasswordMixin from "./ChangePasswordMixin";

    export default {
        name: "DesktopChangePassword",
        mixins: [ChangePasswordMixin]
    }
</script>

<style>
    @import "./Desktop.css";
</style>
