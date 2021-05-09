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
                                <td class="animate__animated animate__fadeInLeft">USERNAME</td>
                                <td class="animate__animated animate__fadeInRight"><input type="text" /></td>
                            </tr>
                            <tr>
                                <td class="animate__animated animate__fadeInLeft">PASSWORD</td>
                                <td class="animate__animated animate__fadeInRight"><input type="password" /></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2">
                                    <div class="animate__animated animate__fadeInUp">
                                        <router-link to="/member/findUsername">Forgot username?</router-link>
                                        <router-link to="/member/findPassword">Forgot password?</router-link>
                                    </div>
                                    <div class="animate__animated animate__fadeInUp">
                                        <router-link to="/member/signUp" class="btn">Sign up</router-link>
                                        <input type="button" class="btn" value="Sign in" />
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

<style>
    @import "./Mobile.css";
</style>
