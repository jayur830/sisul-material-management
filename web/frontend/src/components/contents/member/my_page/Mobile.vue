<template>
    <div id="mobile-my-page">
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
                                    <input type="text" :value="username" disabled />
                                </td>
                            </tr>
                            <tr>
                                <td class="animate__animated animate__fadeInLeft">비밀번호</td>
                                <td class="animate__animated animate__fadeInRight">
                                    <input type="password" :value="password" disabled />
                                </td>
                                <td class="animate__animated animate__fadeInRight">
                                    <router-link to="/member/changePassword" class="btn">비밀번호 변경</router-link>
                                </td>
                            </tr>
                            <tr>
                                <td class="animate__animated animate__fadeInLeft">근무반</td>
                                <td class="animate__animated animate__fadeInRight">
                                    <label>
                                        <select :value="workClass" @change="setWorkClass($event.target.value)">
                                            <option value="*">--- 근무반 선택 ---</option>
                                            <option :key="i" v-for="(workClass, i) in workClasses">{{ workClass }}</option>
                                        </select>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td class="animate__animated animate__fadeInLeft">이름</td>
                                <td class="animate__animated animate__fadeInRight">
                                    <input type="text" :value="workerName" @keyup="e => { if (e.key === 'Enter' && isChanged()) modify(); else setWorkerName(e.target.value); }" />
                                </td>
                            </tr>
                            <tr>
                                <td class="animate__animated animate__fadeInLeft">이메일</td>
                                <td class="animate__animated animate__fadeInRight">
                                    <input type="email" :value="email" @keyup="e => { if (e.key === 'Enter' && isChanged()) modify(); else setEmail(e.target.value); }" />
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3" class="animate__animated animate__fadeInUp">
                                    <input type="button" class="btn" value="뒤로가기" @click="$router.back()" />
                                    <input type="button" :class="['btn', isChanged() ? '' : 'disabled']" value="수정" @click="modify" />
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
    import MyPageMixin from "./MyPageMixin";

    export default {
        name: "MobileMyPage",
        mixins: [MyPageMixin],
        mounted() {

        }
    }
</script>

<style>
    @import "./Mobile.css";
</style>
